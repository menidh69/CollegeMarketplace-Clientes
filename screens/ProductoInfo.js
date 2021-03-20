import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    FlatList,
    Alert
} from "react-native";
import { UserContext } from '../UserContext';
import { useNavigation } from "@react-navigation/native";

const ProductoInfo = ({ route }) => {

    const {user, setUser} = useContext(UserContext);
    const [cantidad, setCantidad] = useState(1);
    const navigation = useNavigation();

    const agregarCarrito = async () => {
        try {
            const body = {
                id_user: user.id,
                id_producto: route.params.producto.id,
                cantidad: cantidad
            }
            console.log(body)
            const response = await fetch('http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/carrito/agregar',
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })
                .then(async resp => {
                    const result = await resp.json()
                    if (result.error) {
                        console.log(result.error)
                    } else {
                        console.log(result)
                        navigation.reset({
                            routes: [{ name: 'Inicio' }]
                        });
                        Alert("Agregado exitosamente")
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>

            <Image
                style={styles.imageProducto}
                source={{uri: route.params.producto.url_imagen ? route.params.producto.url_imagen : '../assets/food.png'}}
                defaultSource={require('../assets/food.png')}
            />
            <View style={styles.productoContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.titulo}>{route.params.producto.nombre}</Text>
                    <View
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            width: "100%"
                        }}
                    />
                    <Text style={styles.precio}>${Number.parseFloat(route.params.producto.precio).toFixed(2)}</Text>
                    <Text style={styles.descripcionText}>{route.params.producto.descripcion}</Text>


                    <View style={styles.quantityContainer}>
                        <Text style={{width: "100%", textAlign: 'center', fontSize: 15, marginTop: 10}}>Cantidad</Text>
                        <TouchableOpacity style={styles.quantityBtn} onPress={() => setCantidad(cantidad == 1 ? cantidad : cantidad - 1)}>
                            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }} >-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.quantityText}>
                            <Text style={{ textAlign: 'center' }} >{cantidad}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.quantityBtn} onPress={() => setCantidad(cantidad == 10 ? cantidad : cantidad + 1)}>
                            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>+</Text>
                        </TouchableOpacity>

                    </View>



                </View>
                <TouchableOpacity style={styles.agregarBtn} onPress={() => agregarCarrito()}>
                    <Text style={styles.agregarText}>Agregar al carrito</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C0D5E1",
        alignItems: "center",
        justifyContent: "center",
    },
    imageProducto: {
        width: 150,
        height: 150,
        borderRadius: 25,
        marginBottom: 15
    },
    productoContainer: {
        backgroundColor: '#FFF',
        padding: 10,
        width: "80%",
        alignItems: 'center',
        height: "50%",
        borderRadius: 20,
        justifyContent: 'space-between'
    },
    agregarBtn: {
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E99125",
        marginTop: 20,
        width: "70%",
        marginLeft: 15,
    },
    titulo: {
        fontSize: 24
    },
    descripcionText: {
        marginTop: 10,
        fontSize: 17
    },
    precio: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textContainer: {
        width: "100%",
        alignItems: 'center'
    },
    agregarText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    quantityBtn: {
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E99125",
        marginLeft: 15,
        padding: 15,
        width: 46,
        height: 46
    },
    quantityContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 25
    },
    quantityText: {
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        marginLeft: 15,
        padding: 15,
        width: 46
    }
});

export default ProductoInfo;