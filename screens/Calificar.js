import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";

export default function App() {
  const [defaultRating, setDefaultRating] = useState(1);
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          width: "100%",
        }}
      />
      <View style={styles.productoContainer}>
        <Image
          style={styles.imageProducto}
          defaultSource={require("./assets/snack-icon.png")}
        />
        <View style={styles.textoProductoContainer}>
          <Text style={styles.nombre}>Hamburguesa</Text>
          <Text style={styles.desc}>Simple</Text>
          <View style={styles.container}>
            <CustomRatingBar />
          </View>
        </View>
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
              placeholderTextColor="#003f5c"
              maxLength={100}
              multiline={true}
              numberOfLines={4}
            />
          </View>
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
            <Text style={styles.guardarText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginBottom: 10,
          borderBottomColor: "black",
          borderBottomWidth: 1,
          width: "100%",
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0D5E1",
    marginTop: 50,
  },
  productoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    padding: 15,
    alignItems: "center",
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
    marginTop: 10,
    width: "40%",
  },
  guardarText: {
    fontWeight: "bold",
    color: "#fff",
  },
  imageProducto: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  desc: {
    fontSize: 15,
    marginBottom: 5,
  },
  inputViewDescripcion: {
    backgroundColor: "#E2DFDF",
    borderRadius: 30,
    width: "80%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: -50,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  TextInputDescripcion: {
    height: "80%",
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
});
