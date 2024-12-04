import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, useColorScheme } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; 
import useConversationsApi from '@/services/useConversationsApi'; 
import useMarketplaceApi from '@/services/useMarketplaceApi'; 
import ConversationCard from '@/components/ConversationCard'; 
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
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [productNames, setProductNames] = useState<Record<number, string>>({});
  const [userId, setUserId] = useState<number>(0);

  const { getUser } = useLocalStorage();
  const { getAllConversations } = useConversationsApi(); 
  const { getProductoById } = useMarketplaceApi(); 

  const fetchUserId = async () => {
    const userData = await getUser();
    setUserId(userData?.id || 0);  
  };

  const fetchConversations = async () => {
    if (userId === 0) {
      setLoading(false); 
      return; // Si el userId es 0, no ejecutamos la carga de conversaciones
    }

    try {
      const { success, data, message } = await getAllConversations(userId);
      if (success) {
        setConversations(data);
        fetchProductNames(data); 
      } else {
        console.log('Error al obtener las conversaciones:', message);
        setLoading(false);
      }
    } catch (error) {
      console.log('Error al obtener las conversaciones:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductNames = async (conversations: Conversation[]) => {
    const productNamesTemp: Record<number, string> = {};
    for (const conversation of conversations) {
      try {
        const { success, data } = await getProductoById(conversation.product_id);
        if (success && data) {
          productNamesTemp[conversation.id] = data.nombre; 
        }
      } catch (error) {
        console.log('Error al obtener el producto:', error);
      }
    }
    setProductNames(productNamesTemp);
  };

  // Llamar a fetchConversations solo cuando userId cambie
  useEffect(() => {
    if (userId !== 0) {
      fetchConversations(); // Llamamos a fetchConversations solo cuando el userId ha cambiado
      setUserId(0);
    }
  }, [userId]);

  // Usamos useFocusEffect para recargar las conversaciones cada vez que la pantalla se enfoque
  useFocusEffect(
    React.useCallback(() => {
      fetchUserId();
      setLoading(true); // Reestablecer el loading al enfocarse
    }, []) // Solo cuando el componente se enfoque
  );

  const colorScheme = useColorScheme();
  const currentTheme = Colors[colorScheme ?? 'light'];

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
