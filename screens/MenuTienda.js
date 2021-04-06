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
} from "react-native";
import { UserContext } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const MenuTienda = ({ route }) => {
  const { user, setUser } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState("abc");

  useEffect(() => {
    fetchitems();
  }, []);
  console.log(route.params.tienda);
  const fetchitems = async (id) => {
    const data = await fetch(
      `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/productosTienda/${route.params.tienda.id}`
    );
    const it = await data.json();
    console.log(it);
    setItems(it);
  };

  return (
    <>
      <Text
        style={{
          fontSize: 24,
          backgroundColor: "#C0D5E1",
          textAlign: "center",
        }}
      >
        {items.length > 0 ? "" : "No hay productos"}
      </Text>

      <View>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 250 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          onChangeText={(value) => {
            this.setState({
              value,
            });
            if (this.state.value === "menor") {
              <FlatList
                style={styles.listaContainer}
                data={items.sort((a, b) => a.precio.localeCompare(b.precio))}
                renderItem={({ item }) => <Producto producto={item} />}
              />;
            }

            if (this.state.value === "abc") {
              <FlatList
                style={styles.listaContainer}
                data={items.sort((a, b) => a.nombre.localeCompare(b.nombre))}
                renderItem={({ item }) => <Producto producto={item} />}
              />;
            }
          }}
        >
          <Picker.Item label="Precio: Menor a mayor" value="menor" />
          <Picker.Item label="Precio: Mayor a menor" value="mayor" />
          <Picker.Item label="A-z" value="abc" />
          <Picker.Item label="Z-a" value="xyz" />
        </Picker>
      </View>

      <FlatList
        style={styles.listaContainer}
        data={items}
        renderItem={({ item }) => <Producto producto={item} />}
      />
    </>
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
            <Text style={styles.titulo}>{producto.nombre}</Text>
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

  titulo: {
    fontSize: 18,
  },

  precio: {
    fontSize: 18,
    fontWeight: "bold",
  },

  descripcion: {
    fontSize: 15,
  },

  inputView: {
    backgroundColor: "#E2DFDF",
    borderRadius: 15,
    width: 315,
    height: 46,
    marginBottom: 20,
    alignItems: "center",
    borderColor: "#9C9C9C",
    borderWidth: 1,
    bottom: 240,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginRight: 40,
    fontWeight: "600",
    fontSize: 15,
    right: 20,
  },

  listaContainer: {
    width: "100%",
    backgroundColor: "#C0D5E1",
  },
  textoProductoContainer: {
    marginLeft: 15,
  },
  guardarBtn: {
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5db385",
    marginTop: 20,
    width: "20%",
  },
  guardarText: {
    fontWeight: "bold",
    color: "#fff",
  },
  eliminarBtn: {
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#bf4d4d",
    marginTop: 20,
    width: "20%",
    marginLeft: 15,
  },
  eliminarText: {
    fontWeight: "bold",
    color: "#fff",
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
});

export default MenuTienda;
