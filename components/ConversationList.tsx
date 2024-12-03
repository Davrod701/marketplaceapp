import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, useColorScheme } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect
import useConversationsApi from '@/services/useConversationsApi'; // Asegúrate de que la ruta sea correcta
import useMarketplaceApi from '@/services/useMarketplaceApi'; // Asegúrate de que la ruta sea correcta
import ConversationCard from '@/components/ConversationCard'; // Asumimos que tienes una tarjeta para mostrar las conversaciones
import Colors from '@/constants/Colors';
import useLocalStorage from '@/services/useLocalStorage';

export interface Conversation {
  id: number;
  product_id: number;
  user_owner_id: number;
  user_interested_id: number;
  created_at: string;
  updated_at: string;
}

export default function ConversationList() {
  // Estado para almacenar las conversaciones y el estado de carga
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [productNames, setProductNames] = useState<Record<number, string>>({}); // Para almacenar los nombres de los productos

  const [userId, setUserId] = useState<number>(0);
  const { getUser } = useLocalStorage();

  const { getAllConversations } = useConversationsApi(); // Llamamos a la función del servicio
  const { getProductoById } = useMarketplaceApi(); // Llamamos al servicio para obtener los productos

  const fetchUserId = async () => {
    const userData = await getUser();
    setUserId(userData?.id || 0);  // Asigna el ID del usuario
  };

  // Función para obtener conversaciones de la API
  const fetchConversations = async () => {
    fetchUserId();
    try {
      const { success, data, message } = await getAllConversations(userId); // Usamos la función que ya creaste en useConversationsApi
      if (success) {
        setConversations(data); // Actualizamos el estado con las conversaciones obtenidas
        fetchProductNames(data); // Cargamos los nombres de los productos
      } else {
        console.log('Error al obtener las conversaciones:', message);
      }
    } catch (error) {
      console.log('Error al obtener las conversaciones:', error);
    } finally {
      setLoading(false); // Deja de cargar cuando termine la solicitud
    }
  };

  // Función para obtener los nombres de los productos por el id de cada conversación
  const fetchProductNames = async (conversations: Conversation[]) => {
    const productNamesTemp: Record<number, string> = {}; // Usamos un objeto para almacenar los nombres de los productos
    for (const conversation of conversations) {
      try {
        const { success, data } = await getProductoById(conversation.product_id); // Obtenemos el producto usando el product_id
        if (success && data) {
          productNamesTemp[conversation.id] = data.nombre; // Almacenamos el nombre del producto con el id de la conversación
        }
      } catch (error) {
        console.log('Error al obtener el producto:', error);
      }
    }
    setProductNames(productNamesTemp); // Actualizamos el estado con los nombres de los productos
  };

  // Usamos useFocusEffect para que se recarguen las conversaciones cada vez que el componente se enfoque
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true); // Al enfocarse, iniciamos el indicador de carga
      fetchConversations(); // Cargamos las conversaciones
    }, []) // Solo lo ejecutamos una vez cuando se enfoque
  );

  const colorScheme = useColorScheme();
  const currentTheme = Colors[colorScheme ?? 'light'];

  // Mostrar un indicador de carga mientras estamos esperando las conversaciones
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={[{ color: currentTheme.text }]}>Cargando conversaciones...</Text>
      </View>
    );
  }

  if (conversations.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={[{ color: currentTheme.text }]}>No existen conversaciones.</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={conversations}
        renderItem={({ item }) => (
          <ConversationCard
            id={item.id}
            product_id={item.product_id}
            productName={productNames[item.id] || 'Cargando...'} 
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
});
