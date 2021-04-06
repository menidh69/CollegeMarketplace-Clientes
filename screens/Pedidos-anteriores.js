import React,{useEffect, useState} from 'react'
import { TextInput, Text, View, StyleSheet, Button, Touchable, TouchableOpacity, FlatList } from 'react-native';



const data = [
  { id: '13', nombre: 'Hamburguesa', fecha: '19/09/21', precio: '20', nombre_tienda: 'Tienda industrial', },
  { id: '22', nombre: 'Hamburguesa', fecha: '19/09/21', precio: '20', nombre_tienda: 'Tienda industrial', },
  { id: '53', nombre: 'Hamburguesa', fecha: '19/09/21', precio: '20', nombre_tienda: 'Tienda industrial', },

];

export default function Pedidos() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pedidos anteriores</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <View style={styles.productoContainer}>
                <View style={styles.imageProducto}></View>
                <View style={styles.textoProductoContainer}>
                    <Text style={styles.titulo}>{item.nombre}</Text>
                    <Text style={styles.titulo}>
                        ${Number.parseFloat(item.precio).toFixed(2)}
                    </Text>

                    <Text>Tienda: {item.nombre_tienda}</Text>

                              <TouchableOpacity text="Ver" onPress={() =>
                              { alert(item.desc);}} style={styles.button}>
                              <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>Ver</Text>
        </TouchableOpacity>
                </View>
            </View>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B1D8EE',
    alignItems: 'center'
  },

  text: {
    fontSize: 20,
    color: "white",
    marginTop: 40,
    fontWeight: '700'
  },
  imageProducto: {
        width: 75,
        height: 75,
        borderRadius: 20,
        marginTop:-40,
        backgroundColor: "white",
    },
    productoContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        padding: 15,
        alignItems: "center",
    },
        textoProductoContainer: {
        marginLeft: 15,
    },
  button:{
            borderRadius: 20,
            backgroundColor: "#E99125",
            height: 40,
            width: 110,
            color: "#FFFFFF",
            marginTop: 10,
            textAlign: 'center',
            paddingTop: 5

        }
});
