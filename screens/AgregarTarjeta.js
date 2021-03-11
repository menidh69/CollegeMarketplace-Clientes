import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TabBarIOS, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { UserContext } from '../UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from "@react-navigation/native";
import { List } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';



const Stack = createStackNavigator();

const AgregarTarjeta = ({ user }) => {

    const navigation = useNavigation();

    const onSubmit = async () => {
       
    };

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        register('card');
        register('date');
        register('cvv')
    }, [register]);


    return (
        <ScrollView style={styles.container} contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={styles.datos}>Numero de tarjeta:</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="0000 0000 0000 0000"
                    placeholderTextColor="#003f5c"
                    keyboardType='number-pad'
                    maxLength={16}
                    onChangeText={text => { setValue('card', text) }}
                    data-openpay-card="card_number"
                />
            </View>
            <Text style={styles.datos}>Fecha de vencimiento:</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="MM/AA"
                    placeholderTextColor="#003f5c"
                    maxLength={5}
                    onChangeText={text => { setValue('date', text) }}
                    data-openpay-card="cvv2"
                />
            </View>
            <Text style={styles.datos}>CVV:</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="CVV"
                    placeholderTextColor="#003f5c"
                    keyboardType='number-pad'
                    maxLength={3}
                    onChangeText={text => { setValue('cvv', text) }}
                />
            </View>
            <TouchableOpacity style={styles.guardarBtn} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.guardarText}>Guardar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
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