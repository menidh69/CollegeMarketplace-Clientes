import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TabBarIOS, Text, View } from 'react-native';
import { UserContext } from '../UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from "@react-navigation/native";
import { List } from 'react-native-paper';





const Micuenta = ({ user }) => {


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.datos}>Hola esta es mi cuenta {user.nombre} </Text>
                <List.Section style={styles.datosPersonales}>
                    <List.Accordion
                        title="Detalles personales" >
                        <View style={styles.detallesContainer}>
                            <View style={styles.imagen}></View>
                            <View style={styles.datosPersonalesList}>
                                <Text>{user.nombre} {user.apellidos}</Text>
                                <Text>{user.email}</Text>
                                <View
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 1,
                                    }}
                                />
                                <Text>{user.tel}</Text>
                                <View
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 1,
                                    }}
                                />

                            </View>
                        </View>
                    </List.Accordion>
                </List.Section>
                <List.Section style={styles.datosPersonales}>
                    <List.Accordion
                        title="Ordenes" >
                        <View style={styles.detallesContainer}>
                            <View style={styles.imagen}></View>
                            <View style={styles.datosPersonalesList}>
                                <Text>{user.nombre} {user.apellidos}</Text>
                                <Text>{user.email}</Text>
                                <View
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 1,
                                    }}
                                />
                                <Text>{user.tel}</Text>
                                <View
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 1,
                                    }}
                                />
                                
                            </View>
                        </View>
                    </List.Accordion>
                </List.Section>
                <List.Section style={styles.datosPersonales}>
                    <List.Accordion
                        title="Información bancaria" >
                        <View style={styles.detallesContainer}>
                            <View style={styles.imagen}></View>
                            <View style={styles.datosPersonalesList}>
                                <Text>{user.nombre} {user.apellidos}</Text>
                                <Text>{user.email}</Text>
                                <View
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 1,
                                    }}
                                />
                                <Text>{user.tel}</Text>
                                <View
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 1,
                                    }}
                                />
                                
                            </View>
                        </View>
                    </List.Accordion>
                </List.Section>
            </View>

        </View>

    );
}

const MicuentaScreen = () => {

    return (
        <>

        </>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C0D5E1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    datos: {
        fontSize: 24
    },
    datosPersonales: {
        backgroundColor: '#88CBF1',
        borderRadius: 25,
    },
    datosPersonalesList: {

        padding: 10
    },
    imagen: {
        width: 50,
        height: 75,
        backgroundColor: 'black'
    },
    detallesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10
    }
});

export default Micuenta;