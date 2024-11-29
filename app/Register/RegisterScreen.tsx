import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import useMarketplaceApi from "@/services/useMarketplaceApi";
import useLocalStorage from '@/services/useLocalStorage';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const { setUser, setToken } = useLocalStorage();
  const router = useRouter();

  const { register } = useMarketplaceApi();

  const colorScheme = useColorScheme();
  const currentTheme = Colors[colorScheme ?? 'light'];  // Seleccionar tema según colorScheme

  const handleRegister = async () => {
    // Aquí llamamos a la función register
    const { success, data, message } = await register(nombre, email, password, verifyPassword);

    if (success) {
      setUser(data.user);
      setToken(data.token);
      router.push('/Home/HomeScreen');
    } else {
      // Si hubo un error, puedes mostrar el mensaje al usuario
      alert(message); // O utiliza una librería como `Toast` para mostrar el error
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>

        <View style={[styles.headerContainer, { backgroundColor: currentTheme.headerView }]}>
        </View>
        <Text style={[styles.title, { color: currentTheme.text }]}>Register</Text>
        <TextInput
            placeholder="name"
            style={[styles.inputText, { borderColor: currentTheme.text, color: currentTheme.text }]}
            placeholderTextColor={currentTheme.text}  // Cambiar el color del placeholder
            value={nombre}
            onChangeText={setNombre}
        />
        <TextInput
            placeholder="useremail@marketplace.com"
            style={[styles.inputText, { borderColor: currentTheme.text, color: currentTheme.text }]}
            placeholderTextColor={currentTheme.text}  // Cambiar el color del placeholder
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            placeholder="password"
            style={[styles.inputText, { borderColor: currentTheme.text, color: currentTheme.text }]}
            placeholderTextColor={currentTheme.text}  // Cambiar el color del placeholder
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />
        <TextInput
            placeholder="verify password"
            style={[styles.inputText, { borderColor: currentTheme.text, color: currentTheme.text }]}
            placeholderTextColor={currentTheme.text}  // Cambiar el color del placeholder
            secureTextEntry
            value={verifyPassword}
            onChangeText={setVerifyPassword}
        />
        <TouchableOpacity 
          style={[styles.inputButtom, { backgroundColor: currentTheme.tint }]}
          onPress={handleRegister}>
          <Text style={[styles.buttonText, { color: currentTheme.opacityText }]}>Register</Text>
        </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }, 
    headerContainer: {
        width: '100%',
        height: 160,
        justifyContent: 'center', // Asegura que el contenido del header esté centrado
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        position: 'absolute', // Hace que el header quede fijo en la parte superior
        top: 0,
      },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      padding: 70
    },
    inputText: {
        width: '90%',
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'left',
        padding: 5
    },
    inputButtom: {
      width: '90%',
      height: 50,
      backgroundColor: '#2196f3', // Color de fondo
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginTop: 20,
      elevation: 3, // Añadir sombra en Android
      shadowColor: '#000', // Sombra en iOS
      shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
      shadowOpacity: 0.1, // Opacidad de la sombra
      shadowRadius: 4, // Difusión de la sombra
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    separator: {
        marginTop: 10,
        marginBottom: 10
      },
  });
