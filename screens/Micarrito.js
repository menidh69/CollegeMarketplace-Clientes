import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TabBarIOS, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { UserContext } from '../UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

const Micarrito = ({ user }) => {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name="Carrito"
            children={()=> <MicarritoScreen user={user} />}
            initialParams={{user:user}}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
    );
}

const MicarritoScreen = () => {
    const { user, SetUser } = useContext(UserContext);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetchitems();
    },[]);

    const fetchitems = async (id) => {
        {/*const data = await fetch(`http://college-marketplace.eba-kd3ehnpr.us-east-2.elasticbeanstalk.com/api/v1/carrito/{user.id}/items`); */}
        const data = await fetch('http://college-marketplace.eba-kd3ehnpr.us-east-2.elasticbeanstalk.com/api/v1/carrito/8/items')
        const it = await data.json();
        console.log(it["carrito_items"])
        setItems(it["carrito_items"])
    }


    { if (items.length > 0 ) {
      return (
        <View style = {styles.container2} >
            <FlatList
              style={styles.listaContainer}
                data={items}
                renderItem={({ item }) => <Producto producto={item} /> }
            />

          <View style={ {marginBottom:20, marginLeft:20} }>
              <Text>Items total:</Text>
              <Text>Taxes:</Text>
              <Text>Total:</Text>
            </View>

            <View style={styles.totalcontainer}>
            <TouchableOpacity style={styles.btncheckout}>
                  <Text style={styles.txtcheckout}>Checkout</Text>
              </TouchableOpacity>
          </View>


        </View>
      );

    } else {
      return (
        <View style={styles.container}>

          <Image style={styles.image} source={require("../assets/carrito.png")} />
            <Text>Tu carrito esta vacio, comienza a agregar productos</Text>
            <TouchableOpacity style={styles.btncomprar}>
                <Text style={styles.txtcomprar}>Comprar</Text>
            </TouchableOpacity>


        </View>

      );

      }
    }

}

const Producto = ({ producto }) => {
  return (

      <View style={styles.productoContainer} >
        <View style={styles.imageProducto}></View>
        <View style={styles.txtproducto}>
          <Text>{producto['producto'].nombre}</Text>
            <Text>${Number.parseFloat(producto['producto'].precio).toFixed(2)}</Text>
            <Text>{producto['producto'].descripcion}</Text>
        </View>
        <View style={styles.basuraicon}  >
            <TouchableOpacity onPress={()=> alert("Eliminar producto de carrito?")} >   
              <MaterialCommunityIcons name="trash-can-outline" size={28}  />
            </TouchableOpacity>
        </View>
      </View>
  );
}

const EliminarItem = () => {
  console.log("entro al eliminar");
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C0D5E1',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight:'bold',
    },
    image: {
        marginBottom: 40,
        width: '55%',
        height: '30%',
    },

    btncomprar: {
        width: 200,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#FFAF4C",
        fontWeight: "bold",

    },
    txtcomprar: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#FFF",
        alignItems: "center",
        justifyContent: "center",
    },
    btncheckout: {
        width: 250,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        backgroundColor: "#FFAF4C",
        fontWeight: "bold",

    },
    txtcheckout: {
        color: "#FFF",
        fontSize: 25,

    },
    txtblanco: {
      color: "#FFF",
    },
    productoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        padding: 15,
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,

    },
    imageProducto: {
        width: 75,
        height: 75,
        borderRadius: 25,
        backgroundColor: 'white'
    },
    listaContainer: {
        flexGrow: 0,
        marginBottom: 20,
        marginLeft:15,
        marginRight: 15,

    },
    txtproducto: {
        marginLeft: 15
    },
    container2:{
      flex: 1,
      backgroundColor: '#C0D5E1',
      fontWeight:'bold',
    },
    totalcontainer: {
      alignItems: 'center',
      fontSize: 50,
    },
    basuraicon: {
      flex: 1,
      marginLeft:25,
      justifyContent:'center',
      alignItems: 'center',
    },
});

export default Micarrito;
