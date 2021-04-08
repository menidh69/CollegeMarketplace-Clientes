import "react-native-gesture-handler";
import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import { UserContext } from "../UserContext";
import { useNavigation } from "@react-navigation/native";

const PedidosAnteriores = () => {
  return <PedidosAnterioresScreen />;
};

const PedidosAnterioresScreen = () => {
  const { user, setUser } = useContext(UserContext);

  const navigation = useNavigation();

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchitems();
  }, []);

  const fetchitems = async (id) => {
    const data = await fetch(
      `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/usuarios/pedidos/entregado/${user.id}`
    );
    const it = await data.json();
    // console.log(it.result);
    setItems(it.result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Pedidos")}
        >
          <Text style={styles.txtbtn}>Pedidos pendientes</Text>
        </TouchableOpacity>
        {items.length > 0 ? "" : "No hay pedidos pendientes"}
      </Text>

      <FlatList
        style={styles.listaContainer}
        data={items}
        renderItem={({ item }) => <Producto item={item} />}
      />
    </View>
  );
};

const Producto = ({ item }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useContext(UserContext);
  const [comentario, setComentario] = useState("");
  const [defaultRating, setDefaultRating] = useState(1);
  const [calificado, setCalificado] = useState(false);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  // Filled Star. You can also give the path from local
  const starImageFilled =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png";
  // Empty Star. You can also give the path from local
  const starImageCorner =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png";

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}
            >
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? { uri: starImageFilled }
                    : { uri: starImageCorner }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const handleReview = async () => {
    const data = await fetch(
      `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/usuarios/calificar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_producto: item.id,
          id_usuario: user.id,
          calificacion: defaultRating,
          comentario: comentario,
        }),
      }
    );
    const resp = await data.json();
    console.log(resp);
    if (resp.error) {
      return;
    }
    setModalVisible(false);
    setCalificado(true);
    return;
  };

  console.log(item);
  return (
    <>
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
            <Image
              style={styles.imageProducto}
              source={{
                uri: item.url_imagen ? item.url_imagen : "../assets/food.png",
              }}
              defaultSource={require("../assets/food.png")}
            />

            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.desc}>{item.descripcion}</Text>

            <CustomRatingBar />

            <View
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View style={styles.inputViewDescripcion}>
                <TextInput
                  style={styles.TextInputDescripcion}
                  placeholder="Comentario"
                  onChangeText={(value) => setComentario(value)}
                  placeholderTextColor="#003f5c"
                  maxLength={100}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.btnmodal}
                onPress={() => handleReview()}
              >
                <Text style={styles.textStyle}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.productoContainer}>
        <View style={styles.imageProducto}>
          <Image
            style={styles.imageProducto}
            source={{
              uri: item.url_imagen ? item.url_imagen : "../assets/food.png",
            }}
            defaultSource={require("../assets/food.png")}
          />
        </View>

        <View style={styles.textoProductoContainer}>
          <Text style={styles.titulo}>{item.nombre}</Text>
          <Text style={styles.titulo}>
            ${Number.parseFloat(item.precio).toFixed(2)}
          </Text>
          <Text>Cantidad: {item.cantidad}</Text>
          <Text>Tienda: {item.nombre_tienda}</Text>
        </View>
        {calificado ? (
          <TouchableOpacity style={styles.btnmodal}>
            <Text style={styles.txtbtn}>Calificado</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btnmodal}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.txtbtn}>Calificame</Text>
          </TouchableOpacity>
        )}
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
    backgroundColor: "#C0D5E1",
    flex: 1,
    alignItems: "center",
  },
  agregarNuevoBtn: {
    marginTop: 20,
    backgroundColor: "#E99125",
    padding: 15,
    borderRadius: 25,
    width: "60%",
  },
  textAgregarNuevoBtn: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  titulo: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  imageProducto: {
    width: 75,
    height: 75,
    borderRadius: 25,
    backgroundColor: "black",
  },
  productoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    padding: 15,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
  },
  listaContainer: {
    width: 350,
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
  btn: {
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E99125",
    fontWeight: "bold",
  },
  txtbtn: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  modalcontainer: {
    backgroundColor: "#C0D5E1",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalView: {
    margin: 15,
    height: 450,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  textStyle: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 18,
    textAlign: "center",
  },
  btnmodal: {
    backgroundColor: "#E99125",
    borderRadius: 25,
    margin: 10,
    padding: 10,
    elevation: 2,
  },
  modalimg: {
    borderRadius: 15,
    backgroundColor: "black",
    margin: 10,
  },
  customRatingBarStyle: {
    margin: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  inputViewDescripcion: {
    backgroundColor: "#E2DFDF",
    borderRadius: 30,
    width: "80%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  TextInputDescripcion: {
    height: "80%",
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
});

export default PedidosAnteriores;
