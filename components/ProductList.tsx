import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, useColorScheme } from "react-native";
import ProductCard from '@/components/ProductCard';
import useMarketplaceApi from '@/services/useMarketplaceApi'; // Asegúrate de que la ruta sea correcta
import Colors from '@/constants/Colors';
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  estatus: number;
}

export default function ProductList() {
  // Estado para almacenar los productos y el estado de carga
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const { getAllProductos } = useMarketplaceApi(); // Llamamos a la función del servicio

  // Función para obtener productos de la API
  const fetchProductos = async () => {
    try {
      const { success, data, message } = await getAllProductos(); 
      if (success) {
        setProductos(data); 
      } else {
        console.log('Error al obtener productos:', message);
      }
    } catch (error) {
      console.log('Error al obtener productos:', error);
    } finally {
      setLoading(false); // Deja de cargar cuando termine la solicitud
    }
  };

  // Usamos useFocusEffect para que se recarguen los productos cada vez que el componente se enfoque
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true); // Al enfocarse, iniciamos el indicador de carga
      fetchProductos(); // Cargamos los productos
    }, []) // Solo lo ejecutamos una vez cuando se enfoque
  );

  const colorScheme = useColorScheme();
  const currentTheme = Colors[colorScheme ?? 'light'];

  // Mostrar un indicador de carga mientras estamos esperando los productos
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={[{ color: currentTheme.text }]}>Cargando productos...</Text>
      </View>
    );
  }

  if (productos.length === 0) {
    return (
      <View >
        <Text style={[{ color: currentTheme.text }]}>No existen productos.</Text>
      </View>
    );
  }

  if (productos.length === 0 && !loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={[{ color: currentTheme.text }]}>Hubo un problema al cargar los productos. Intenta de nuevo.</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={productos}
        numColumns={2} // Dos columnas por fila
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            name={item.nombre}
            description={item.descripcion}
            price={item.precio}
            image={item.imagen}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 220 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
