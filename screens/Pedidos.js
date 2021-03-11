import React,{useEffect, useState} from 'react'
import { TextInput, Text, View, StyleSheet, Button, Touchable, TouchableOpacity, FlatList } from 'react-native';



const data = [
  { id: '13', nombre: 'Tienda industrial', fecha: '19/09/21'},
  { id: '22', nombre: 'Tienda industrial', fecha: '19/09/21' },
  { id: '53', nombre: 'Tienda industrial', fecha: '19/09/21' },

];

export default function Pedidos() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pedidos</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.nombre}{"\n"}{item.fecha}</Text>
          <TouchableOpacity text="Ver" onPress={() =>
        { alert(item.desc);}} style={styles.button}>
            <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
                Ver
            </Text>
        </TouchableOpacity>



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

  titleText: {
          fontSize: 46,
          fontWeight: "bold",
          textAlign:"left",
          marginBottom: 30,
          marginTop:30,
          color: "white",
          textAlign: 'center'
        },
  text: {
    fontSize: 20,
    color: "white",
    marginTop: 40,
    fontWeight: '700'
  },
  listItem: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap:'wrap',
    padding: 20,
    alignItems: 'center',
    width: '95%',
    justifyContent: 'space-between'
  },
  listItemText: {
    fontSize: 18,
    fontWeight: ""
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
