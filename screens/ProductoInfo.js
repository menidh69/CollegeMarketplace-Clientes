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
    FlatList
} from "react-native";
import { UserContext } from '../UserContext';
import { useNavigation } from "@react-navigation/native";

const ProductoInfo = ({ route }) => {
    return (
        <View style={styles.container}>

            <Image
                style={styles.imageProducto}
                source={require('../assets/food.png')}
            />
            <View style={styles.productoContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.titulo}>{route.params.producto.nombre}</Text>
                    <View
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            width: "100%"
                        }}
                    />
                    <Text style={styles.precio}>${Number.parseFloat(route.params.producto.precio).toFixed(2)}</Text>
                    <Text style={styles.descripcionText}>{route.params.producto.descripcion}</Text>

                </View>
                <TouchableOpacity style={styles.agregarBtn}>
                    <Text style={styles.agregarText}>Agregar al carrito</Text>
                </TouchableOpacity>
            </View>
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
    imageProducto: {
        width: 150,
        height: 150,
        borderRadius: 25,
        marginBottom: 15
    },
    productoContainer: {
        backgroundColor: '#FFF',
        padding: 10,
        width: "80%",
        alignItems: 'center',
        height: "40%",
        borderRadius: 20,
        justifyContent: 'space-between'
    },
    agregarBtn: {
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E99125",
        marginTop: 20,
        width: "70%",
        marginLeft: 15,
    },
    titulo: {
        fontSize: 24
    },
    descripcionText: {
        marginTop: 10,
        fontSize: 17
    },
    precio: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textContainer: {
        width: "100%",
        alignItems: 'center'
    },
    agregarText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default ProductoInfo;