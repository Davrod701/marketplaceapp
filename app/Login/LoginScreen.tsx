import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import useMarketplaceApi from '@/services/useMarketplaceApi';
import useLocalStorage from '@/services/useLocalStorage';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useMarketplaceApi();
  const { setUser, setToken } = useLocalStorage();

  // Usar el hook useColorScheme para detectar el tema
  const colorScheme = useColorScheme();
  const currentTheme = Colors[colorScheme ?? 'light'];  // Seleccionar tema según colorScheme

 

  const handleLogin = async () => {
    const { success, data, message } = await login(email, password);
    if (success) {
      setUser(data.user);
      setToken(data.token);
      router.push('/Home/HomeScreen');
    } else {
      alert(message);
    }
  };

  const handleSignUp = () => {
    router.push('/Register/RegisterScreen');
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={[styles.headerContainer, { backgroundColor: currentTheme.headerView }]}></View>
      <Text style={[styles.title, { color: currentTheme.text }]}>MarketplaceApp</Text>

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

      <TouchableOpacity
        style={[styles.inputButtom, { backgroundColor: currentTheme.tint }]}
        onPress={handleLogin}>
        <Text style={[styles.buttonText, { color: currentTheme.opacityText }]}>LOGIN</Text>  
      </TouchableOpacity>

      <Text style={[styles.separator, { color: currentTheme.text }]}>
        _____________________ Or _____________________
      </Text>

      <TouchableOpacity
        style={[styles.inputButtom, { backgroundColor: currentTheme.tint }]}
        onPress={handleSignUp}>
        <Text style={[styles.buttonText, { color: currentTheme.opacityText }]}>SIGN UP</Text> 
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
    fontSize: 41,
    fontWeight: 'bold',
    padding: 40,
    marginBottom: 50,
  },
  inputText: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'left',
    padding: 5,
  },
  inputButtom: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    marginTop: 10,
    marginBottom: 10,
  },
});
