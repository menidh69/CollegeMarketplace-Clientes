import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, } from 'react-native';
import Login from './login'

const Stack = createStackNavigator();


const Landing = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="ScreenLanding"
                    component={LandingScreen}
                    options={{
                        title: '',
                        headerStyle: {
                            backgroundColor: '#1E6995',
                            shadowOffset: {
                                height: 0
                            }
                        },
                        headerTintColor: 'black',
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={
                        {
                            title: 'Log In',
                            headerBackTitle: 'Atrás',
                            headerTintColor: '#000',
                            headerStyle: {
                                backgroundColor: '#C0D5E1'
                            },
                            shadowOffset: {
                                height: 0
                            }
                        }
                    }
                />
            </Stack.Navigator>

        </NavigationContainer>
    );
}


const LandingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/splash.png")} />
            <StatusBar style="auto" />
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() =>
                    navigation.navigate('Login')}
            >
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupBtn}>
                <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E6995',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 220,
        height: 200,
    },
    signupBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#FFAF4C",
        fontWeight: "bold",
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#B1D8EE",
        fontWeight: "bold",
    },
    loginText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E6995'
    },
    signupText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#FFF"
    }
});

export default Landing;