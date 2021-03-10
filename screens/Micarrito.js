import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TabBarIOS, Text, View, Image, TouchableOpacity } from 'react-native';
import { UserContext } from '../UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from "@react-navigation/native";
const Stack = createStackNavigator();


const Micarrito = ({ user }) => {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name="Carrito"
            children={()=> <MicarritoScreen user={user} />}
            initialParams={{user:user}}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
    );
}

const MicarritoScreen = ({ user }) => {
    return (
        <>
            <View style={styles.container}>
              <Image style={styles.image} source={require("../assets/carrito.png")} />

                <Text>Tu carrito esta vacio, comienza a agregar productos</Text>
                <TouchableOpacity style={styles.comprarbtn}>
                    <Text style={styles.comprarText}>Comprar</Text>
                </TouchableOpacity>

            </View>
        </>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C0D5E1',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight:'bold',
    },
    image: {
        marginBottom: 40,
        width: '55%',
        height: '30%',
    },

    comprarbtn: {
        width: 200,
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
        alignItems: "center",
        justifyContent: "center",
    },
    txtblanco: {
      color: "#FFF",
    }
});

export default Micarrito;
