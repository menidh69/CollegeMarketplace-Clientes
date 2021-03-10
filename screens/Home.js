import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TabBarIOS, Text, View } from 'react-native';
import {NewUserContext} from '../NewUserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from "@react-navigation/native";
import Micuenta from './Micuenta';
import Carrito from './Carrito';




const Home = ({ route }) => {

    // const [items, setItems] = useState([]);


    // useEffect(() => {
    //     fetchitems();
    // }, []);

    // const fetchitems = async (id) => {
    //     const data = await fetch(`http://college-marketplace.eba-kd3ehnpr.us-east-2.elasticbeanstalk.com/api/v1/usuarioinfo/${route.params.id}`);
    //     const it = await data.json();
    //     setItems(it[0]);
    //     console.log(it[0])
    // }


    const Tab = createBottomTabNavigator();

    return (
        <>
            <Tab.Navigator>
                <Tab.Screen
                    name='Inicio'
                    children={() => <HomeScreen/>}
                />
                <Tab.Screen
                    name='Buscar'
                    children={() => <HomeScreen/>}
                />
                <Tab.Screen
                    name='Pedidos'
                    children={() => <HomeScreen/>}
                />
                <Tab.Screen
                    name='Carrito'
                    children={() => <HomeScreen/>}
                />
                <Tab.Screen
                    name='Cuenta'
                    children={() => <Micuenta/>}
                />

            </Tab.Navigator>
        </>

    );
}

const HomeScreen = () => {
    const {user, setUser} = useContext(NewUserContext);
    return (
        <>
            <View>
                <Text>Hola este es el inicio {user.nombre}  </Text>
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
});

export default Home;
