
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from "react-native";
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TabBarIOS, Text, View, Image } from 'react-native';
import { UserContext } from '../UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Micuenta from './Micuenta';
import Micarrito from './Micarrito';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Carrito from './Carrito';
import { createStackNavigator } from '@react-navigation/stack';
import MenuTienda from './MenuTienda';
import { useNavigation } from "@react-navigation/native";
import ProductoInfo from './ProductoInfo';




const Tienda = ({ tienda }) => {

    const navigation = useNavigation();

 

    return (
        <>
            <View style={styles.productoContainer}>
                <Image
                    style={styles.imageProducto}
                    source={{uri: tienda.url_imagen ? tienda.url_imagen : '../assets/restaurant.png'}}
                />
                <View style={styles.textoProductoContainer}>
                    <Text>{tienda.nombre}</Text>
                    <Text>{tienda.horario}</Text>
                    <Text>{tienda.id_tipo_tienda}</Text>
                </View>
                <View
                    style={{
                        width: "100%",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity style={styles.guardarBtn} onPress={() => navigation.navigate("MenuTienda", { tienda: tienda })}>
                        <Text style={styles.guardarText}>Ver menu</Text>
                    </TouchableOpacity>
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


const Home = ({ route }) => {



    const Tab = createBottomTabNavigator();

    return (
        <>
            <Tab.Navigator>
                <Tab.Screen
                    name='Inicio'
                    children={() => <HomeScreen user={items} />}
                    options={{
                      tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                      ),
                    }}
                />
                <Tab.Screen
                    name='Buscar'
                    children={() => <HomeScreen user={items} />}
                    options={{
                      tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="magnify" color={color} size={size} />
                      ),
                    }}
                />
                <Tab.Screen
                    name='Pedidos'
                    children={() => <HomeScreen user={items} />}
                    options={{
                      tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="ticket" color={color} size={size} />
                      ),
                    }}
                />
                <Tab.Screen
                    name='Carrito'
                    children={() => <Micarrito user={items} />}
                    options={{
                      tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="cart-outline" color={color} size={size} />
                      ),
                      
                    }}
                />


                <Tab.Screen
                    name='Cuenta'
                    children={() => <Micuenta user={items} />}
                    options={{
                      tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                      ),
                    }}

                <Tab.Screen
                    name='Buscar'
                    children={() => <HomeScreen />}
                />
                <Tab.Screen
                    name='Pedidos'
                    children={() => <HomeScreen />}
                />
                <Tab.Screen
                    name='Carrito'
                    children={() => <HomeScreen />}
                />
                <Tab.Screen
                    name='Cuenta'
                    children={() => <Micuenta />}

                />

            </Tab.Navigator>
        </>

    );
}

const Stack = createStackNavigator();

const Explorar = ({ user }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Inicio"
                component={HomeScreen}
                options={{
                    title: 'Inicio',
                    headerLeft: null,
                    headerStyle: {
                        backgroundColor: '#C0D5E1',
                        shadowOffset: {
                            height: 0
                        }

                    }

                }}
            />
            <Stack.Screen
                name="MenuTienda"
                component={MenuTienda}
                options={{
                    title: 'Menu',
                    headerStyle: {
                        backgroundColor: '#C0D5E1',
                        shadowOffset: {
                            height: 0
                        }
                    }
                }}
            />
            <Stack.Screen
                name="ProductoInfo"
                component={ProductoInfo}
                options={{
                    title: 'Menu',
                    headerStyle: {
                        backgroundColor: '#C0D5E1',
                        shadowOffset: {
                            height: 0
                        }
                    }
                }}
            />
        </Stack.Navigator>
    );
}

const HomeScreen = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchitems();
    }, []);


    const fetchitems = async (id) => {
        const data = await fetch(
            `http://college-marketplace.eba-kd3ehnpr.us-east-2.elasticbeanstalk.com/api/v1/tiendas`
        );
        const it = await data.json();
        console.log(it);
        setItems(it);
    };

    return (
        <ScrollView style={styles.containerS}>
            <View style={styles.container}>
                <StatusBar style="auto" />

                <Text style={styles.titulo}> Explorar </Text>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="¿Qué estás buscando?"
                        placeholderTextColor="#909090"
                    />
                </View>

                <Text style={styles.titulo2}> Búsqueda rápida </Text>

                <TouchableOpacity style={styles.desayuno}>
                    <Image
                        style={styles.image}
                        source={require("../assets/desayuno.png")}
                    />
                    <Text style={styles.textobr}>Desayuno </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.comidas}>
                    <Image
                        style={styles.image}
                        source={require("../assets/comidas.png")}
                    />
                    <Text style={styles.textobr}> Comidas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saludable}>
                    <Image
                        style={styles.image}
                        source={require("../assets/saludable.png")}
                    />
                    <Text style={styles.textobr}>Saludable</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bebidas}>
                    <Image
                        style={styles.image}
                        source={require("../assets/bebidas.png")}
                    />
                    <Text style={styles.textobr}>Bebidas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.postres}>
                    <Image
                        style={styles.image}
                        source={require("../assets/postres.png")}
                    />
                    <Text style={styles.textobr}>Postres</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.snacks}>
                    <Image style={styles.image} source={require("../assets/snacks.png")} />
                    <Text style={styles.textobr}> Snacks</Text>
                </TouchableOpacity>

                <Text style={styles.titulo3}> Tiendas Populares </Text>
            </View>
            <FlatList
                style={styles.listaContainer}
                data={items}
                renderItem={({ item }) => <Tienda tienda={item} />}
            />
        </ScrollView>
    );
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#C0D5E1",
        alignItems: "center",
        justifyContent: "center",
    },
    containerS: {
        backgroundColor: '#c0d5e1'
    },

    imageProducto: {
        width: 75,
        height: 75,
        borderRadius: 10
    },

    inputView: {
        backgroundColor: "#E2DFDF",
        borderRadius: 15,
        width: 315,
        height: 46,
        marginBottom: 20,
        alignItems: "center",
        borderColor: "#9C9C9C",
        borderWidth: 1,
        top: 140,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginRight: 40,
        fontWeight: "600",
        fontSize: 15,
        right: 20,
    },

    titulo: {
        fontSize: 30,
        fontWeight: "bold",
        position: "absolute",
        top: 90,
        left: 30,
    },

    titulo2: {
        fontSize: 24,
        fontWeight: "bold",
        position: "absolute",
        top: 240,
        left: 30,
    },

    titulo3: {
        fontSize: 24,
        fontWeight: "bold",
        position: "absolute",
        top: 480,
        left: 30,
    },

    textobr: {
        fontWeight: "600",
    },

    image: {
        width: 60,
        height: 60,
    },

    desayuno: {
        right: 120,
        top: 220,
    },

    comidas: {
        top: 140,
    },
    saludable: {
        top: 60,
        left: 120,
    },

    bebidas: {
        top: 80,
        right: 120,
    },

    postres: {
        top: 6,
        left: 6,
    },

    snacks: {
        bottom: 70,
        left: 120,
    },

    listaContainer: {
        width: "100%",

        backgroundColor: "#C0D5E1",
    },
    productoContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        padding: 15,
        alignItems: "center",
        left: 20,
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
        width: "40%",
    },
    guardarText: {
        fontWeight: "bold",
        color: "#fff",
    },
    // container: {
    //     flex: 1,
    //     backgroundColor: '#1E6995',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
});



export default Home;

