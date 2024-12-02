import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Definir los tipos para las props que recibe el componente
interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, description, price, image }: ProductCardProps) {
  const router = useRouter();

  const navigateToDetail = (idProduct: number) => {
    router.push(`/Details/DetailScreen?id=${idProduct}`); // Navega a la pantalla de detalle pasando el parámetro 'id'
  };
 
  return (
    <View style={styles.card}>
      {/* Aquí estamos usando una función anónima para evitar que se ejecute inmediatamente */}
      <TouchableOpacity onPress={() => navigateToDetail(id)}>
        <Image source={{ uri: image }} style={styles.image} onError={(error) => console.log('Image loading error:', error)} />
        <View style={styles.details}>
          <Text style={styles.name}>
            {name} <Text style={styles.price}> ${price}</Text>
          </Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#efefef',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 2,
    width: '50%',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    margin: 'auto',
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
