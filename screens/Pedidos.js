import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import {
    StyleSheet,
    TabBarIOS,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,

} from "react-native";
import { UserContext } from "../UserContext";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NewUserContext } from "../NewUserContext";
import { createStackNavigator } from "@react-navigation/stack";
import PedidosAnteriores from "./PedidosAnteriores";

const Stack = createStackNavigator();

const Pedidos = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Pedidos"
                component={PedidosScreen}
                options={{
                    title: "Pedidos Pendientes",
                    headerStyle: {
                        backgroundColor: "#C0D5E1",
                        shadowOffset: {
                            height: 0,
                        },
                    },
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name="PedidosAnteriores"
                component={PedidosAnteriores}
                options={{
                    title: "Pedidos Anteriores",
                    headerLeft: null,
                    headerStyle: {
                        backgroundColor: "#C0D5E1",
                        shadowOffset: {
                            height: 0,
                        },
                    },
                    headerTintColor: "black",
                }}
            />
        </Stack.Navigator>
    );
};

const PedidosScreen = () => {
    const { user, setUser } = useContext(UserContext);

    const navigation = useNavigation();

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchitems();
    }, []);

    const fetchitems = async (id) => {
        const data = await fetch(
            `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/usuarios/pedidosPendientes/${user.id}`
        );
        const it = await data.json();
        // console.log(it.result);
        setItems(it.result);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                <TouchableOpacity style={styles.btn} onPress={() =>
                    navigation.navigate("PedidosAnteriores")
                }>
                    <Text style={styles.txtbtn}>Pedidos Anteriores</Text>
                </TouchableOpacity>

            </Text>
            <Text style={styles.titulo}>
                {items.length > 0 ? "" : "No hay pedidos pendientes"}
            </Text>

            <FlatList
                style={styles.listaContainer}
                data={items}
                renderItem={({ item }) => <Producto item={item} />}
            />
        </View>
    );
};

const Producto = ({ item }) => {
    const navigation = useNavigation();

    console.log(item)
    return (
        <>
            <View style={styles.productoContainer}>

                <View style={styles.imageProducto}>
                    <Image
                        style={styles.imageProducto}
                        source={{
                            uri: item.url_imagen
                                ? item.url_imagen
                                : "../assets/food.png",
                        }}
                        defaultSource={require("../assets/food.png")}
                    />
                </View>


                <View style={styles.textoProductoContainer}>
                    <Text style={styles.titulo}>{item.nombre}</Text>
                    <Text style={styles.titulo}>
                        ${Number.parseFloat(item.precio).toFixed(2)}
                    </Text>
                    <Text>Cantidad: {item.cantidad}</Text>
                    <Text>Tienda: {item.nombre_tienda}</Text>
                </View>
            </View>
            <View
                style={{
                    marginTop: 10,
                    marginBottom: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#C0D5E1",
        flex: 1,
        alignItems: "center",
    },
    agregarNuevoBtn: {
        marginTop: 20,
        backgroundColor: "#E99125",
        padding: 15,
        borderRadius: 25,
        width: "60%",
    },
    textAgregarNuevoBtn: {
        color: "#FFF",
        fontWeight: "bold",
        textAlign: "center",
    },
    titulo: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15,
    },
    imageProducto: {
        width: 85,
        height: 85,
        borderRadius: 25,
    },
    productoContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        padding: 15,
        marginLeft: 15,
        marginRight: 15,
        alignItems: "center",
    },
    listaContainer: {
        width: 350,
    },
    textoProductoContainer: {
        marginLeft: 15,
    },
    guardarBtn: {
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5db385",
        marginTop: 20,
        width: "20%",
    },
    guardarText: {
        fontWeight: "bold",
        color: "#fff",
    },
    eliminarBtn: {
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#bf4d4d",
        marginTop: 20,
        width: "20%",
        marginLeft: 15,
    },
    eliminarText: {
        fontWeight: "bold",
        color: "#fff",
    },
    btn: {
        borderRadius: 80,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFAF4C",
        marginTop: 20,

        //fontWeight: "bold",
    },
    txtbtn: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#FFF",
        padding: 15
    },
});

export default Pedidos;
