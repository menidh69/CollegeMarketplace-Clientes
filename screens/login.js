import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Alert } from "react-native";
import { useForm } from 'react-hook-form';
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import ErrorModal from '../components/ErrorModal';
import { isEmptyNull } from '../validation/formValidation'
import { UserContext } from '../UserContext';



const Stack = createStackNavigator();

const Login = () => {
    return (
        <Body />
    );

}

const Body = () => {
    const { user, setUser } = useContext(UserContext);
    const navigation = useNavigation();
    const [showmodal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState("")

    const onSubmit = async data => {
        if (isEmptyNull(data.email) || isEmptyNull(data.contra)) {
            setShowModal(true);
            setModalMessage("El correo o la contraseña son incorrectos")
            return
        }
        try {
            const body = data;
            const response = await fetch('http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/usuario/login',
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })

            const result = await response.json()
            if (response.status != 200) {
                setShowModal(true);
                setModalMessage(result.message || result.error)
                console.log(result.error)
                return
            } else {
                AsyncStorage.setItem("token.tuw", result.user.token)
                setUser(result.user);
                console.log("todo  ", result.user)
                navigation.reset({ routes: [{ name: 'Home' }] })
            }

        } catch (err) {
            console.log(err)
        }
    };

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        register('email');
        register('contra');
    }, [register]);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/icon.png")} />

            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <Image
                    source={require('../assets/email.png')}
                    style={styles.icono}
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => { setValue('email', text) }}
                />
            </View>

            <View style={styles.inputView}>
                <Image
                    source={require('../assets/padlock.png')}
                    style={styles.icono}
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={text => { setValue('contra', text) }}
                />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Forgotpass1')}>
                <Text style={styles.forgot_button}>Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>

            <View style={styles.fbView}>
                <Image
                    source={require('../assets/fbicon.png')}
                    style={styles.fbIconoStyle}
                />
                <TouchableOpacity style={styles.fbBtn}>
                    <Text style={styles.loginText}>Conectarse con Facebook</Text>
                </TouchableOpacity>
            </View>
            <ErrorModal setShow={setShowModal} show={showmodal} message={modalMessage}></ErrorModal>

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

    image: {
        marginBottom: 40,
        width: 200,
        height: 150,
    },

    icono: {
        height: 25,
        width: 25,
        marginLeft: 10,
    },

    inputView: {
        backgroundColor: "#E2DFDF",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
        textDecorationLine: "underline",
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E99125",
    },
    loginText: {
        color: "white",
    },
    fbView: {
        backgroundColor: "#4267B2",
        borderRadius: 30,
        width: "80%",
        height: 50,
        marginBottom: 20,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center'
    },
    fbBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    fbIconoStyle: {
        width: 25,
        height: 25,
    }
});

export default Login;
