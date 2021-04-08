import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  TabBarIOS,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ItemSeparatorView,
  FlatList,
} from "react-native";
import { UserContext } from "../UserContext";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NewUserContext } from "../NewUserContext";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Busqueda = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Busqueda"
        component={BusquedaScreen}
        options={{
          title: "Busqueda",
          headerStyle: {
            backgroundColor: "#C0D5E1",
            shadowOffset: {
              height: 0,
            },
          },
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
};

const BusquedaScreen = () => {
  const navigation = useNavigation();

  const [items, setItems] = useState([]);
  const [nombre, setNombre] = useState("");
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const Buscar = async (Nombre) => {
    console.log(Nombre);
    const data = await fetch(
      `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v2/producto/search?producto=${Nombre}`
    );
    const datos = await data.json();
    console.log(datos["productos"]);
    setItems(datos["productos"]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="¿Qué estás buscando?"
          placeholderTextColor="#909090"
          onChangeText={(text) => setNombre(text)}
        />
      </View>

      <TouchableOpacity style={styles.botonsito} onPress={() => Buscar(nombre)}>
        <Text style={{fontWeight:"bold"}}>Buscar</Text>
      </TouchableOpacity>

      <FlatList
        style={styles.flatliiist}
        data={items}
        renderItem={({ item }) => <Producto producto={item} />}
      />
    </View>
  );
};

const Producto = ({ producto }) => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductoInfo", { producto: producto })
        }
      >
        <View style={styles.productoContainer}>
          <Image
            style={styles.imageProducto}
            source={{
              uri: producto.url_imagen
                ? producto.url_imagen
                : "../assets/food.png",
            }}
            defaultSource={require("../assets/food.png")}
          />
          <View style={styles.textoProductoContainer}>
            <Text style={styles.titulo2}>{producto.nombre}</Text>
            <Text style={styles.precio}>
              ${Number.parseFloat(producto.precio).toFixed(2)}
            </Text>
            <Text style={styles.descripcion}>{producto.descripcion}</Text>
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          ></View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0D5E1",
    alignItems: "center",
    justifyContent: "center",
  },

  botonsito: {
    width: 100,
    borderRadius: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFAF4C",
    fontWeight: "bold",
  },

  inputView: {
    backgroundColor: "#E2DFDF",
    borderRadius: 15,
    width: 315,
    height: 46,
    marginBottom: 20,
    borderColor: "#9C9C9C",
    borderWidth: 1,
    marginTop: 20,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginRight: 40,
    fontWeight: "600",
    fontSize: 15,
  },

  flatliiist: {
    marginTop: 30,
  },

  imageProducto: {
    width: 75,
    height: 75,
    borderRadius: 25,
  },
  productoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    padding: 15,
    alignItems: "center",
  },

  listaContainer: {
    width: "100%",
    backgroundColor: "#C0D5E1",
  },
  textoProductoContainer: {
    marginLeft: 15,
  },

  titulo2: {
    fontSize: 18,
  },

  precio: {
    fontSize: 18,
    fontWeight: "bold",
  },

  descripcion: {
    fontSize: 15,
  },
});

export default Busqueda;
