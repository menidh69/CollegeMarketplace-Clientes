import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { Image, StyleSheet, TabBarIOS, Text, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from "@react-navigation/native";
import { List } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import AgregarTarjeta from './AgregarTarjeta';



const Stack = createStackNavigator();

const Micuenta = () => {

    const { user, setUser } = useContext(UserContext);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetchitems();
    }, []);

    const fetchitems = async (id) => {
        const data = await fetch(
            `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v2/openpay/cards/${user.id}`
        );
        const it = await data.json();
        console.log(it.tarjeta);
        setCards(it.tarjeta);
    };

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Cuenta"
                children={() => <MicuentaScreen user={user} cards={cards} />}
                initialParams={{ user: user }}
                options={{
                    title: 'Mi cuenta',
                    headerStyle: {
                        backgroundColor: '#C0D5E1',
                        shadowOffset: {
                            height: 0
                        }
                    },
                    headerLeft: null
                }}
            />
            <Stack.Screen
                name="AgregarTarjeta"
                component={AgregarTarjeta}
                initialParams={{ user: user }}
                options={{
                    title: 'Agregar Tarjeta',
                    headerStyle: {
                        backgroundColor: '#C0D5E1',
                        shadowOffset: {
                            height: 0
                        }
                    },
                    headerTintColor: 'black'
                }}
            />
        </Stack.Navigator>



    );
}

const MicuentaScreen = ({ user, cards }) => {

    const navigation = useNavigation();

    var num_sf = user.telefono
    var num_cf = '';
    num_cf = "(" + num_sf.substring(0, 3) + ") ";
    num_cf += num_sf.substring(3, 6) + " ";
    num_cf += num_sf.substring(6, 10);

    return (
        <View style={styles.container}>
            <List.Section style={styles.datosPersonales}>
                <List.Accordion
                    title="Detalles personales" style={{ borderRadius: 25 }}>
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
                            <Text>{num_cf}</Text>
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
                    title="Ordenes" style={{ borderRadius: 25 }}>
                    <View style={styles.detallesContainer}>
                        <View style={styles.imagen}></View>
                        <View style={styles.datosPersonalesList}>
                            <Text>Tarjetas</Text>
                            <TouchableOpacity>
                                <Text>Agregar Tarjeta</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </List.Accordion>
            </List.Section>
            <List.Section style={styles.datosPersonales}>
                <List.Accordion
                    title="Información bancaria" style={{ borderRadius: 25 }}>
                    <View style={styles.informacionBancaria}>
                        <View style={styles.tarjetasContainer}>
                            <Text>Mis tarjetas guardadas</Text>
                            <Text
                                style={{
                                    marginTop: 10,
                                    fontSize: 18,
                                    textAlign: "center",
                                }}
                            >
                                {cards !== undefined ? "" : "No hay Tarjetas"}
                            </Text>
                            {cards !== undefined ? <Tarjeta card={cards} /> : <></>}
                            <View style={styles.agregarTarjetaBtnContainer}>
                                <TouchableOpacity style={styles.agregarTarjetaBtn} onPress={() => navigation.navigate('AgregarTarjeta')} >
                                    <Text style={styles.textoAgregarTarjetaBtn}>Agregar Tarjeta</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </List.Accordion>
            </List.Section>
            <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.reset({ routes: [{ name: 'Landing' }] })} >
                <Text style={styles.textoAgregarTarjetaBtn}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>

    );
}

const Tarjeta = ({ card }) => {


    var num_sf = card.card_number;
    var num_cf = '';
    num_cf = "" + num_sf.substring(12, 16);

    var url_icon = `../assets/${card.brand}.png`;
    console.log(url_icon)

    return (
        <View style={styles.cardContainer}>
            <Text
                style={{
                    fontSize: 18,
                }}
            >**** **** **** </Text>
            <Text>{num_cf}</Text>
            <Image
                style={styles.imageCard}
                source={require(`../assets/visa.png`)}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C0D5E1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    datos: {
        fontSize: 24
    },
    datosPersonales: {
        backgroundColor: '#88CBF1',
        borderRadius: 25,
        width: "80%"
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
    },
    informacionBancaria: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
    },
    tarjetasContainer: {
        padding: 10,
        width: '80%'
    },
    agregarTarjetaBtnContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center'
    },
    agregarTarjetaBtn: {
        marginTop: 20,
        width: "80%",
        padding: 15,
        borderRadius: 25,
        height: 50,
        backgroundColor: "#16b585",
    },
    textoAgregarTarjetaBtn: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    },
    logoutBtn: {
        marginTop: 20,
        width: "80%",
        padding: 15,
        borderRadius: 25,
        height: 50,
        backgroundColor: "#bf4d4d",
    },
    imageCard: {
        width: 33,
        height: 33,
        borderRadius: 10
    },
    cardContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: 25,
        padding: 5,
    }
});

export default Micuenta;