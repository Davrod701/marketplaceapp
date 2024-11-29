import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Animated } from 'react-native';
import { useColorScheme } from 'react-native'; 
import Colors from '@/constants/Colors';
import { Text, View } from '@/components/Themed';

export default function IndexScreen() {
  // Creamos un valor animado para el tamaño de la fuente y el desplazamiento
  const scale = new Animated.Value(1);  // Tamaño original
  const translateY = new Animated.Value(0);  // Empezamos sin desplazamiento

  const colorScheme = useColorScheme();
  const currentTheme = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    // Animamos el tamaño y el desplazamiento al mismo tiempo
    Animated.parallel([
      // Animación para el tamaño
      Animated.timing(scale, {
        toValue: 2,  // Duplicamos el tamaño de la fuente
        duration: 3000,  // Duración de 3 segundos
        useNativeDriver: true,  // Usamos el driver nativo para animaciones de transformaciones
      }),
      // Animación para el desplazamiento
      Animated.timing(translateY, {
        toValue: -55,  // Desplazamos hacia arriba 20 píxeles
        duration: 4000,  // Duración de 3 segundos
        useNativeDriver: true,  // Usamos el driver nativo
      }),
    ]).start();
  }, []);

  // Definir los colores según el tema
  const backgroundColor = currentTheme.background;
  const textColor = currentTheme.text;
  const separatorColor = currentTheme.text;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Aplicamos la animación de escala y desplazamiento */}
      <Animated.Text
        style={[
          styles.title,
          {
            color: textColor, // Aplicamos el color del texto según el tema
            transform: [
              { scale },          // Animación de escala
              { translateY },     // Animación de desplazamiento hacia arriba
            ],
          },
        ]}
      >
        MarketplaceApp
      </Animated.Text>

      <View
        style={[styles.separator, { backgroundColor: separatorColor }]} // Separador con color dinámico
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
