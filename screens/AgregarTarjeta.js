import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect, Component } from 'react';
import { StyleSheet, TabBarIOS, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { UserContext } from '../UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from "@react-navigation/native";
import { List } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { WebView } from 'react-native-webview';



const Stack = createStackNavigator();

const AgregarTarjeta = () => {
    
    const { user, setUser } = useContext(UserContext);

    return(
        <TarjetaView user={user} />
    );

}

class TarjetaView extends Component  {
    render() {

        const myHtmlFile = require(`../WebViews/AgregarTarjeta.html`);

        const jsCode = `
            document.getElementById("name").value = "${this.props.user.nombre} ${this.props.user.apellidos}";
            document.getElementById("email").value = "${this.props.user.email}";
            document.getElementById("id").value = "${this.props.user.id}";
            true;
        `;

        setTimeout(() => {
            this.webref.injectJavaScript(jsCode);
        }, 500);

        return (

            <WebView
                originWhitelist={['*']}
                source={myHtmlFile}
                ref={r => (this.webref = r)}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C0D5E1',
    },
    datos: {
        fontSize: 24
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    inputView: {
        backgroundColor: "#E2DFDF",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 10
    },
    guardarBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E99125",
        marginTop: 20,
        width: "50%"
    },
    guardarText: {
        fontWeight: 'bold',
        color: '#fff'
    }
});

export default AgregarTarjeta;