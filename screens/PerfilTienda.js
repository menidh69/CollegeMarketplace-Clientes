import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    FlatList,
    Alert,
    Modal
} from "react-native";
import { UserContext } from '../UserContext';
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuTienda from "./MenuTienda";


const PerfilTienda = ({ route }) => {
    const navigation = useNavigation();

    const { user, setUser } = useContext(UserContext);
    const [items, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const Openmodal = () => {
        { validada ? setModalVisible(true) : alert('Ya esta validada tenkius!') }
    }
    const validartienda = async (estado) => {
        estado ? true : false;
        console.log("estado ", estado)
        try {
            const body = {
                id_usuario: user.id,
                id_tienda: route.params.tienda.id,
                verificada: estado
            }

            console.log("body", body)
            const response = await fetch('http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/validar_tienda',
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })
                .then(async resp => {
                    const result = await resp.json()
                    if (result.error) {
                        console.log(result.error)
                        setModalVisible(false);
                    } else {
                        console.log("llega aqui y en unos dice status repetito keseso?")
                        console.log(result)

                        setModalVisible(false);
                    }
                })

        } catch (err) {

            console.log(err)
            setModalVisible(false)
        }

    }

    useEffect(() => {
        fetchitems();
    }, []);

    const fetchitems = async (id) => {
        const data = await fetch(`http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/tiendas/${route.params.tienda.id}`);
        const it = await data.json();
        console.log("INFO TIENDA")
        console.log(it)
        setItems(it)
    }

    var tipoTienda = "";
    var validada = ""
    route.params.tienda.validada ? validada = "si" : validada = "No validada"

    switch (route.params.tienda.id_tipo_tienda) {
        case 1:
            tipoTienda = "Cooperativa"
            break;

        case 2:
            tipoTienda = "Puesto"
            break;
        case 3:
            tipoTienda = "Cafetería"
            break;
    }


    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalcontainer}>
                    <View style={styles.modalView}>
                        <MaterialCommunityIcons name="check-decagram" size={150} />
                        <Text style={styles.modalText}>Esta tienda es nueva, ayudanos a verificarla</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.btnmodal} onPress={() => validartienda("true")} >
                                <Text style={styles.textStyle}>Si existe</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.btnmodal]} onPress={() => validartienda("false")} >
                                <Text style={styles.textStyle}>No existe</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.imgcontainer}>
                <Image
                    style={styles.imageProducto}
                    source={{ uri: route.params.tienda.url_imagen ? route.params.tienda.url_imagen : '../assets/restaurant.png' }}
                    defaultSource={require('../assets/restaurant.png')}
                />
                <Text style={styles.titulo}>{route.params.tienda.nombre} </Text>
            </View>
            <View style={styles.tiendacontainer}>
                <View style={styles.txttiendainfo}>
                    <Text>
                        Nombre tienda: {route.params.tienda.nombre} {"\n"}
                        Tipo tienda: {tipoTienda} {"\n"}
                        Horario: {route.params.tienda.horario} {"\n"}
                        Forma de pago: {route.params.tienda.tarjeta ? "Tarjeta" : "Efectivo"} {"\n"}
                        {"\n"} {validada}
                    </Text>
                </View>
                <View style={styles.botones}>
                    <TouchableOpacity style={styles.menuBtn} >
                        <MaterialCommunityIcons name="silverware" size={30} onPress={() => navigation.navigate("MenuTienda", { tienda: route.params.tienda })} />
                        <Text style={styles.btnmenuText}>Ver menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuBtn} >
                        <MaterialCommunityIcons name="phone" size={30} />
                        <Text style={styles.btnmenuText}>Llamar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuBtn} >
                        <MaterialCommunityIcons name="star" size={30} />
                        <Text style={styles.btnmenuText}>Reseñas</Text>
                    </TouchableOpacity>
                </View>



                <View style={styles.center}>
                    <TouchableOpacity style={styles.validarBtn} onPress={() => Openmodal()} >
                        <Text style={styles.btnText}>Validar Tienda</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#C0D5E1",
        flex: 1
    },
    modalcontainer: {
        backgroundColor: "#C0D5E1",
        alignContent: "center",
        justifyContent: "center",
        flex: 1
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    imageProducto: {
        width: 200,
        height: 200,
        borderRadius: 10
    },
    imgcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
    },
    titulo: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10
    },
    tiendacontainer: {
        paddingTop: 25,
        margin: 20,
        padding: 20,
        backgroundColor: '#EDEDED',
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    botones: {
        flexDirection: 'row',
        alignContent: "center",
        marginTop: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    txttiendainfo: {
        fontSize: 20,
    },
    menuBtn: {
        width: 100,
        margin: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    btnmenuText: {
        fontSize: 14,
        paddingBottom: 2,
        fontWeight: 'bold',
        color: 'black',
    },
    validarBtn: {
        width: 150,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#E99125",
    },
    modalView: {
        margin: 30,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10
    },
    textStyle: {
        fontSize: 17,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 10,
        marginTop: 10,
        fontSize: 18,
        textAlign: "center"
    },
    btnmodal: {
        backgroundColor: "#E99125",
        borderRadius: 25,
        margin: 10,
        padding: 10,
        elevation: 2
    },
});

export default PerfilTienda;