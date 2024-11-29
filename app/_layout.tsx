import { useState, useEffect } from 'react';
import { useRouter, Stack } from 'expo-router';
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import useLocalStorage from '@/services/useLocalStorage';




export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Esto debe ser manejado con lógica real
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      validarAutenticate();
      if (isAuthenticated) {
        router.push('/Home/HomeScreen');
      } else {
        router.push('/Login/LoginScreen');
      }
    }, 5000); // Retraso de 2 segundos

    return () => clearTimeout(timer); 
  }, [isAuthenticated]);

 


  const { getUser, getToken} = useLocalStorage();


  const validarAutenticate =  () => {
    if (getUser() != null && getToken() != null) {
      setIsAuthenticated(true);
    }
  }

  return (
  <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme }>
    <Stack>
      {/* Definir la ruta predeterminada a la que quieres redirigir */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Login/LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="Register/RegisterScreen" options={{ headerShown: false }} />
      <Stack.Screen name="Home/HomeScreen" options={{ headerShown: false }} />
    </Stack>
  </ThemeProvider>
  );
}
