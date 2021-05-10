import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useMemo, useLayoutEffect, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserContext } from './UserContext';
import Home from './screens/Home'
import Landing from './screens/landing'
import Login from './screens/login'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Registro from './screens/Registro'
import { NewUserContext } from './NewUserContext'
import Forgotpass1 from './screens/forgotpass1'
import Forgotpass2 from './screens/forgotpass2'
import Forgotpass3 from './screens/forgotpass3'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { ExpoTokenContext } from './ExpoTokenContext';

const Stack = createStackNavigator();

// function getHeaderTitle(route) {
//     const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

//     switch (routeName) {
//         case 'Home':
//             return 'Hola';
//         case 'Cuenta':
//             return 'Mi Cuenta';
//         case 'Carrito':
//             return 'Mi Carrito';
//         case 'Pedidos':
//             return 'Mis pedidos';
//         case 'Buscar':
//             return 'Buscar';
//     }
// }

const App = () => {

    useEffect(() => {
        registerForPushNotification().then(token => console.log(token)).catch(err => console.log(err))
    }, [])

    async function registerForPushNotification() {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status != 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        }
        if (status != 'granted') {
            alert('Fail')
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("TOKENNN ", token)
        setExpotoken(token);
        return token;
    }

    const [user, setUser] = useState(null);
    const [expotoken, setExpotoken] = useState(null);

    return (
        <ExpoTokenContext.Provider value={{ expotoken, setExpotoken }}>

            <UserContext.Provider value={{ user, setUser }}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Landing"
                            component={Landing}
                            options={{
                                title: '',
                                headerStyle: {
                                    backgroundColor: '#1E6995',
                                    shadowOffset: {
                                        height: 0
                                    }
                                }
                            }}
                        />

                        <Stack.Screen
                            name="Registro"
                            component={Registro}
                            options={
                                {
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
                        <Stack.Screen
                            name="Home"
                            component={Home}
                            options={({ route }) => (
                                {
                                    headerShown: false,
                                    shadowOffset: {
                                        height: 0
                                    }
                                })
                            }
                        />
                        <Stack.Screen
                            name="Forgotpass1"
                            component={Forgotpass1}
                            options={
                                {
                                    title: 'Reestablecer contra',
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
                        <Stack.Screen
                            name="Forgotpass2"
                            component={Forgotpass2}
                            options={
                                {
                                    title: 'Reestablecer contra',
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
                        <Stack.Screen
                            name="Forgotpass3"
                            component={Forgotpass3}
                            options={
                                {
                                    title: 'Reestablecer contra',
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
            </UserContext.Provider>
        </ExpoTokenContext.Provider>

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

export default App;
