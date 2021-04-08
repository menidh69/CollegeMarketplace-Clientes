import React from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";

const LoadingModal = (props) => {
  const styles = StyleSheet.create({
    button: {
      borderRadius: 20,
      backgroundColor: "#E99125",
      height: 40,
      color: "#FFFFFF",
      marginTop: 30,
      textAlign: "center",
      paddingTop: 5,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
  });
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.show}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{props.message}</Text>
          {props.loading ? (
            <ActivityIndicator
              style={styles.spinner}
              color="red"
              size="large"
            />
          ) : (
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                props.setShow(!props.show);
              }}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableHighlight>
          )}
        </View>
      </View>
    </Modal>
  );
};
export default LoadingModal;
