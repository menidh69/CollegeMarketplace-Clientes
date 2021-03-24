import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import {
    StyleSheet,
    Image,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { UserContext } from "../UserContext";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NewUserContext } from "../NewUserContext";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const FiltroTienda = (categoria) => {
    return (
        <TiendasScreen categoria={categoria.route.params} />
    );
};

const TiendasScreen = ({ categoria }) => {
    const { user, setUser } = useContext(UserContext);

    var cat = categoria;
    console.log("CATEGORIA ", cat)
    const navigation = useNavigation();

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchitems();
    }, []);

    const fetchitems = async (id) => {
        const data = await fetch(
            `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/tiendas`
        );
        const it = await data.json();
        //console.log(it);
        setItems(it);
    };

    return (
        < ScrollView style={styles.scrollview} >
            <View style={styles.container}>
                <Text style={styles.titulo}>
                    hola
                </Text>

                <FlatList
                    style={styles.listaContainer}
                    data={items}
                    renderItem={({ item }) => <Tienda tienda={item} />}
                />
            </View>

        </ScrollView >

    );
};

const Tiendas = ({ tienda, cat }) => {
    return (
        console.log("KESESTO ", tienda),
        <>
            <Text>kk</Text>
        </>
    );
};

const Tienda = ({ tienda }) => {
    const navigation = useNavigation();
    console.log("KESESTOOOOOOO ", tienda);
    var tipoTienda = "";

    switch (tienda.id_tipo_tienda) {
        case 1:
            tipoTienda = "Cooperativa"
            break;

        case 2:
            tipoTienda = "Puesto"
            break;
        case 3:
            tipoTienda = "Cafetería"
            break;
    }

    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate("FiltroProducto", { tienda: tienda })}>
                <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                    <View style={styles.productoContainer}>
                        <Image
                            style={styles.imageProducto}
                            source={{ uri: tienda.url_imagen ? tienda.url_imagen : '../assets/restaurant.png' }}
                            defaultSource={require('../assets/restaurant.png')}
                        />
                        <View style={styles.textoProductoContainer}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>{tienda.nombre}</Text>
                        </View>
                        <View
                            style={{
                                width: "100%",
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >
                        </View>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                            marginLeft: 30,
                            marginRight: 30,
                            borderBottomColor: "black",
                            borderBottomWidth: 1,
                        }}
                    />

                </View>

            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    scrollview: {
        backgroundColor: "#C0D5E1",
    },
    container: {
        backgroundColor: "#C0D5E1",
        flex: 1,
        alignItems: "center",
    },
    titulo: {
        fontSize: 30,
        fontWeight: "bold",
        position: "absolute",
        top: 90,
        left: 30,
    },
    listaContainer: {
        width: "100%",

        backgroundColor: "#C0D5E1",
    },
    productoContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#FFF',
        width: '95%',
        borderRadius: 10,
        paddingBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
    },
    textoProductoContainer: {
        marginLeft: 15,
    },

    imageProducto: {
        width: '100%',
        height: 125,
        borderRadius: 10
    },

});

export default FiltroTienda;
