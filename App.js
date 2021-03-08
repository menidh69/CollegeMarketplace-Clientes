import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useMemo, useLayoutEffect, useContext } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Landing from './screens/landing';
import { UserContext } from './UserContext';




const App = () => {

    const [user, setUser] = useState(null);
    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    const storedToken = AsyncStorage.getItem('token.tuw');
    const [token, setToken] = useState(storedToken || null);

    const checkSignIn = async () => {
        if (token) {
            const response = await fetch('http://college-marketplace.eba-kd3ehnpr.us-east-2.elasticbeanstalk.com/api/v1/auth/user',
                {
                    method: "GET",
                    headers: {
                        "x-auth-token": token
                    }
                })
                .then(async resp => {
                    const usuario = await resp.json();
                    if (resp.status == 400) {
                        AsyncStorage.removeItem('token.utw')
                    } else {
                        console.log(usuario)
                        setUser(usuario)
                    }
                })
        }
    }
    // checkSignIn();

    useLayoutEffect(() => {
        checkSignIn();
    }, [])

    if (user != null) {
        return(
            <>
                <Home/>
            </>
        );
    } else {
        return (
            <>
                <Landing />
            </>
    
        );
    }
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