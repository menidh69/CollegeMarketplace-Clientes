import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {emailValidation, textValidation, isEmptyNull, repeatPassword, numberValidation, limit} from '../validation/formValidation'
import {UserContext} from '../UserContext';
import ErrorModal from '../components/ErrorModal'

const Registro = ({navigation})=> {
  const {user, setUser} = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [message, setModalMessage] = useState("");
  const [universidades, setUniversidades] = useState([])
  const [datos, setDatos] = useState({
    "nombre": "",
    "apellidos":"",
    "email": "",
    "contraseña": "",
    "repetirContraseña": "",
    "telefono": "",
    "universidad": ""
  });
  useEffect(()=>{
    let isMounted = true;
    fetchitems()
    .then(response=>{
      if(isMounted){
        setUniversidades(response)
      }
    })
   return ()=>isMounted=false
  }, [])

  const fetchitems =async()=>{
    const datos = await fetch('http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/universidades');
    const universidades =  await datos.json();
    console.log(universidades)
    return universidades;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#C0D5E1',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo: {
      fontSize: 25,
      fontWeight: 'bold',
    },
      titulo1: {
      fontSize: 15,
      fontWeight: 'bold',
    },
      forgot_button: {
      fontSize: 12,
      color: 'blue',
      textDecorationLine: 'underline',
    },
  
    inputPicker:{    
      backgroundColor: "#FFFFFF",
      height: 40,   
      borderColor: 'gray', 
      borderWidth: 1,
      borderRadius: 15,
      padding: 5,
      width: 300

  },
  pickerInput:{    
    backgroundColor: "#FFFFFF",
    height: 25,   
    borderColor: 'gray', 
    borderWidth: 1,
   


},
  
  
    inputView: {
      backgroundColor: '#E2DFDF',
      borderRadius: 15,
      width: 300,
      height: 37,
      marginBottom: 20,
      paddingLeft: 10,
      borderColor: '#9C9C9C',
      borderWidth: 1,
    },
  
     loginBtn: {
          width: "90%",
          borderRadius: 25,
          height: 35,
          backgroundColor: "#E99125",
          margin: 20
      },
         faceBtn: {
          width: "90%",
          borderRadius: 25,
          height: 35,
          backgroundColor: "#4267B2",
      },
  
      loginText: {
      fontSize: 20,
      color: "#fff",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  
  });
  
  const handleSubmit = ()=>{
    if(isEmptyNull(datos.nombre)||isEmptyNull(datos.apellidos)||isEmptyNull(datos.email)||isEmptyNull(datos.contraseña)
    ||isEmptyNull(datos.repetirContraseña)||isEmptyNull(datos.telefono)){
      setShowModal(true);
      setModalMessage("Debes llenar todos los campos")
      return
    }
    if(!emailValidation(datos.email)){
      setModalMessage("El formato de tu correo es incorrecto")
      setShowModal(true);
      return
    }
    if(!repeatPassword(datos.contraseña, datos.repetirContraseña)){
      setShowModal(true);
      setModalMessage("Tus contraseñas no coinciden")
      return
    }
    return submitData();
  }

  const submitData = async()=>{
    const body = datos;
    const response = await fetch('http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/usuarios',
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })
    const resp = await response.json();
    console.log(resp);
    if(response.status==200){
      setUser(datos)
      navigation.navigate("Home")
    }else{
      console.log(resp)
      console.log(response)
      setShowModal(true);
      setModalMessage("Ooops ocurrio algo: "+resp.message)
    }
  }

  const handleInput = (text, type)=>{
    switch(type){
      case "nombre":
        if(textValidation(text) && !limit(text,20)){
          setDatos({...datos, "nombre": text})
        }
        return
      case "apellidos":
        if(textValidation(text) && !limit(text,30)){
          setDatos({...datos, "apellidos": text})
        }
        return
      case "email":
        if(!limit(text,50)){
          setDatos({...datos, "email": text})
        }
        return
      case "contraseña":
        if(!limit(text,25)){
         setDatos({...datos, "contraseña": text})
        }
        return
      case "repetirContraseña":
        if(!limit(text,25)){
          setDatos({...datos, "repetirContraseña": text})
        }
        return
      case "telefono":
        if(numberValidation(text) && !limit(text,10)){
        setDatos({...datos, "telefono": text})
        }
        return
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{margin: 20}}>
      <Text style={styles.titulo}>CREAR CUENTA </Text>
      <Text style={styles.titulo1}> Introduce tus datos para registrarte </Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
        <Text style={styles.forgot_button}>¿Ya tienes una cuenta?</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          label ="Nombre"
          placeholder="Nombre"
          placeholderTextColor="#909090"
          onChangeText={text=> handleInput(text, "nombre")}
          value={datos.nombre}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          label ="Apellido"
          placeholder="Apellido"
          placeholderTextColor="#909090"
          onChangeText={text=> handleInput(text, "apellidos")}
          value={datos.apellidos}
        />
        </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          label ="Email"
          placeholder="Email"
          placeholderTextColor="#909090"
          onChangeText={text=> handleInput(text, "email")}
          value={datos.email}
        />
      </View>

            <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          label ="Contraseña"
          placeholder="Contraseña"
          placeholderTextColor="#909090"
          secureTextEntry={true}
          onChangeText={text=> handleInput(text, "contraseña")}
          value={datos.contraseña}
        />
      </View>
            <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          label ="Repetir Contraseña"
          placeholder="Repetir contraseña"
          placeholderTextColor="#909090"
          secureTextEntry={true}
          onChangeText={text=> handleInput(text, "repetirContraseña")}
          value={datos.repetirContraseña}
        />
      </View>
            <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          label ="Telefono"
          placeholder="Telefono"
          placeholderTextColor="#909090"
          onChangeText={text=> handleInput(text, "telefono")}
          value={datos.telefono}
        />
      </View>
      <View style={styles.inputPicker}>
        <Picker
          selectedValue={datos.universidad}
          style={styles.pickerInput}
          onValueChange={(itemValue, itemIndex) =>
            setDatos({...datos, "universidad": itemValue})

          }>
        {universidades.map(item=>(
          <Picker.Item key={item.id} label={item.nombre} value={item.id} />
        )
        )}
        
      </Picker>
      </View>
      <TouchableOpacity  onPress={()=>handleSubmit()} style={styles.loginBtn}>
        <Text style={styles.loginText}>Siguiente</Text>
      </TouchableOpacity>
                  <TouchableOpacity style={styles.faceBtn}>
        <Text style={styles.loginText}>Conectarse con facebook</Text>
      </TouchableOpacity>
      <ErrorModal message={message} show={showModal} setShow={setShowModal}/>
    </View>
  );

    

}

export default Registro;


