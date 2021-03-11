import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

const Enviar = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchitems();
  }, []);

  const fetchitems = async (id) => {
    const data = await fetch(
      `http://college-marketplace.eba-kd3ehnpr.us-east-2.elasticbeanstalk.com/api/v1/tiendas`
    );
    const it = await data.json();
    console.log(it);
    setItems(it);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <Text style={styles.titulo}> Explorar </Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="¿Qué estás buscando?"
            placeholderTextColor="#909090"
          />
        </View>

        <Text style={styles.titulo2}> Búsqueda rápida </Text>

        <TouchableOpacity style={styles.desayuno}>
          <Image
            style={styles.image}
            source={require("./assets/desayuno.png")}
          />
          <Text style={styles.textobr}>Desayuno </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.comidas}>
          <Image
            style={styles.image}
            source={require("./assets/comidas.png")}
          />
          <Text style={styles.textobr}> Comidas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saludable}>
          <Image
            style={styles.image}
            source={require("./assets/saludable.png")}
          />
          <Text style={styles.textobr}>Saludable</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bebidas}>
          <Image
            style={styles.image}
            source={require("./assets/bebidas.png")}
          />
          <Text style={styles.textobr}>Bebidas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postres}>
          <Image
            style={styles.image}
            source={require("./assets/postres.png")}
          />
          <Text style={styles.textobr}>Postres</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.snacks}>
          <Image style={styles.image} source={require("./assets/snacks.png")} />
          <Text style={styles.textobr}> Snacks</Text>
        </TouchableOpacity>

        <Text style={styles.titulo3}> Tiendas Populares </Text>
      </View>
      <FlatList
        style={styles.listaContainer}
        data={items}
        renderItem={({ item }) => <Tienda producto={item} />}
      />
    </ScrollView>
  );
};

const Tienda = ({ producto }) => {
  return (
    <>
      <View style={styles.productoContainer}>
        <View style={styles.imageProducto}></View>
        <View style={styles.textoProductoContainer}>
          <Text>{producto.nombre}</Text>
          <Text>{producto.horario}</Text>
          <Text>{producto.id_tipo_tienda}</Text>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity style={styles.guardarBtn}>
            <Text
              style={styles.guardarText}
              onPress={() =>
                navigation.navigate("EditarProducto", { producto: producto })
              }
            >
              Ver menu
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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

  imageProducto: {
    width: 75,
    height: 75,
    borderRadius: 25,
    backgroundColor: "white",
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
    top: 140,
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

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    top: 90,
    left: 30,
  },

  titulo2: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    top: 240,
    left: 30,
  },

  titulo3: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    top: 480,
    left: 30,
  },

  textobr: {
    fontWeight: "600",
  },

  image: {
    width: 60,
    height: 60,
  },

  desayuno: {
    right: 120,
    top: 220,
  },

  comidas: {
    top: 140,
  },
  saludable: {
    top: 60,
    left: 120,
  },

  bebidas: {
    top: 80,
    right: 120,
  },

  postres: {
    top: 6,
    left: 6,
  },

  snacks: {
    bottom: 70,
    left: 120,
  },

  listaContainer: {
    width: "100%",

    backgroundColor: "#C0D5E1",
  },
  productoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    padding: 15,
    alignItems: "center",
    left: 20,
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
    width: "40%",
  },
  guardarText: {
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Enviar;
