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
} from "react-native";
import { UserContext } from "../UserContext";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NewUserContext } from "../NewUserContext";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Pedidos = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Pedidos"
                component={PedidosScreen}
                options={{
                    title: "Pedidos",
                    headerStyle: {
                        backgroundColor: "#C0D5E1",
                        shadowOffset: {
                            height: 0,
                        },
                    },
                    headerLeft: null,
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
            `http://college-marketplace.eba-kd3ehnpr.us-east-2.elasticbeanstalk.com/api/v1/usuarios/pedidosPendientes/${user.id}`
        );
        const it = await data.json();
        // console.log(it.result);
        setItems(it.result);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                {items.length > 0 ? "Pendientes" : "No hay pedidos pendientes"}
            </Text>

            <FlatList
                style={styles.listaContainer}
                data={items}
                renderItem={({ item }) => <Producto item={item}/>}
            />
        </View>
    );
};

const Producto = ({ item}) => {
    const navigation = useNavigation();

   console.log(item)
    return (
        <>
            <View style={styles.productoContainer}>
                <View style={styles.imageProducto}></View>
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
        marginBottom: 5,
    },
    imageProducto: {
        width: 75,
        height: 75,
        borderRadius: 25,
        backgroundColor: "white",
    },
    productoContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        padding: 15,
        alignItems: "center",
    },
    listaContainer: {
        width: "100%",
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
});

export default Pedidos;
