import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TabBarIOS, Text, View } from 'react-native';
import { UserContext } from '../UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from "@react-navigation/native";




const Carrito = ({ route }) => {


    const Tab = createBottomTabNavigator();

    return (
        <>
            <Tab.Navigator>
                <Tab.Screen
                    name='Inicio'
                    children={() => <HomeScreen user={items} />}
                />
                <Tab.Screen
                    name='Buscar'
                    children={() => <HomeScreen user={items} />}
                />
                <Tab.Screen
                    name='Pedidos'
                    children={() => <HomeScreen user={items} />}
                />
                <Tab.Screen
                    name='Carrito'
                    children={() => <HomeScreen user={items} />}
                />
                <Tab.Screen
                    name='Cuenta'
                    children={() => <Micuenta user={items} />}
                />

            </Tab.Navigator>
        </>

    );
}

const CarritoScreen = ({ user }) => {

    return (
        <>
            <View style={styles.container}>
              <Image style={styles.image} source={require("../assets/carrito.png")} />
              <View>
                <Text>Tu carrito esta vacio, comienza a agregar productos</Text>
                <TouchableOpacity style={styles.comprarbtn}>
                    <Text style={styles.comprarText}>Comprar</Text>
                </TouchableOpacity>
              </View>
            </View>
        </>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E6995',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginBottom: 40,
        width: '30%',
        height: '15%'
    },

    comprarbtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#FFAF4C",
        fontWeight: "bold",
    },
    comprarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#FFF",
    },
});

export default Carrito;
