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




const Stack = createStackNavigator();

function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

    switch (routeName) {
        case 'Home':
            return 'Hola';
        case 'Cuenta':
            return 'Mi Cuenta';
        case 'Carrito':
            return 'Mi Carrito';
        case 'Pedidos':
            return 'Mis pedidos';
        case 'Buscar':
            return 'Buscar';
    }
}

const App = () => {



    return (
        <>
            <UserContext.Provider>
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
                                    title: getHeaderTitle(route),
                                    headerBackTitle: 'Log Out',
                                    headerTintColor: '#000',
                                    headerStyle: {
                                        backgroundColor: '#C0D5E1'
                                    },
                                    shadowOffset: {
                                        height: 0
                                    }
                                })
                            }
                        />
                    </Stack.Navigator>


                </NavigationContainer>
            </UserContext.Provider>
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

export default App;