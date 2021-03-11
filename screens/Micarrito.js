import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TabBarIOS, Text, View, Image, TouchableOpacity, TouchableHighlight, ActivityIndicator, FlatList, Modal } from 'react-native';
import { UserContext } from '../UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from 'react-native-reanimated';

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
    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText]=useState("Estas a punto de crear una orden, si tienes productos de distintas tiendas se va a crear una orden por cada tienda")
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    useFocusEffect(
      React.useCallback(() => {
        let isMounted = true
        if(isMounted){
          fetchitems()
          .then((json)=>{
            setItems(json)
          })
        }
        return ()=>isMounted=false
    },[])
  );

    const fetchitems = async (id) => {
        const data = await fetch(`http://college-marketplace.eba-kd3ehnpr.us-east-2.elasticbeanstalk.com/api/v1/carrito/${user.id}/items`)
        const it = await data.json();
        console.log(it["carrito_items"])
        return (it["carrito_items"])
    }

    const getTotalCantidad = ()=>{
      let total = 0
      items.map(item=>{
        total += item.cantidad
      })
      return total
    }
    const getTotaPrecio = ()=>{
      let total = 0
      items.map(item=>{
        total += (item.cantidad * item['producto'].precio)
      })
      return total
    }
    const crearOrden=async()=>{
      console.log("creando")
      setModalText("Creando pedido")
      setLoading(true)
      const crear = await fetch('http://college-marketplace.eba-kd3ehnpr.us-east-2.elasticbeanstalk.com/api/v2/order',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"user": user.id})
      })
      const resp = await crear.json();
      if(resp.message){
        console.log(resp.message)
        setShowModal(false);
        setLoading(false)
        navigation.reset({
          routes: [{ name: 'Pedidos' }]
      });
      }else{
        console.log("Ocurrió un error")
        setShowModal(false)
      }
    }

    { if (items.length > 0 ) {
      return (
        <View style={styles.container}>
            <FlatList
              style={styles.listaContainer}
                data={items}
                renderItem={({ item }) => <Producto producto={item}/> }
            />
          <View>
            <Text>Items total: {getTotalCantidad()}</Text>
            <Text>Total: ${getTotaPrecio()} </Text>
            <TouchableOpacity style={styles.btncheckout} onPress={()=>setShowModal(true)}>
                  <Text style={styles.txtcheckout}>Checkout</Text>
              </TouchableOpacity>
          </View>
          <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{...styles.modalText, fontSize:20}}>{modalText}</Text>
            {!loading ?
            <View style={{flex:1, flexDirection:'row', alignItems: 'center', margin:20}}>
            <TouchableHighlight
              style={{ ...styles.openButton, borderColor: "red", borderWidth:1, backgroundColor: "white", height:40, margin:15 }}
              onPress={() => {
                setModalShow(!showModal);
              }}>
              <Text style={{...styles.textStyle, color: "red"}}>Cancelar</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3', height:40, margin:15 }}
              onPress={()=>{crearOrden()}}
              >
              <Text style={styles.textStyle}>Confirmar</Text>
            </TouchableHighlight>
            
              
  
            </View>
            :
            <ActivityIndicator size="large" color="blue"></ActivityIndicator>
    }
          </View>
        </View>
      </Modal>

        </View>
      );

    } else {
      return (
        <View style={styles.container}>

          <Image style={styles.image} source={require("../assets/carrito.png")} />
            <Text>Tu carrito esta vacio, comienza a agregar productos</Text>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Comprar</Text>
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
            <Text>Cantidad: {producto.cantidad}</Text>
            <Text>{producto['producto'].descripcion}</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
            <TouchableOpacity >
              <MaterialCommunityIcons name="trash-can-outline" size={25} />
            </TouchableOpacity>
        </View>
      </View>
  );
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

    btn: {
        width: 200,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#FFAF4C",
        fontWeight: "bold",

    },
    btnText: {
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
        alignItems: 'center'
    },
    imageProducto: {
        width: 75,
        height: 75,
        borderRadius: 25,
        backgroundColor: 'white'
    },
    listaContainer: {
        width: "90%",
    },
    txtproducto: {
        marginLeft: 15
    },
    button:{
      borderRadius: 20,
      backgroundColor: "#E99125",
      height: 40,
      color: "#FFFFFF",
      marginTop: 30,
      textAlign: 'center',
      paddingTop: 5
  },
  modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    openButton: {
      backgroundColor: '#F194FF',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
});

export default Micarrito;
