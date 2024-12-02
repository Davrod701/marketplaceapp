import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import useLocalStorage from '@/services/useLocalStorage'; // Asegúrate de que la ruta es correcta
import useConversationsApi from '@/services/useConversationsApi'; // Asegúrate de que la ruta es correcta
import { useRouter } from 'expo-router';

interface ContactoCardProps {
  owner_id: number | undefined;           // user_owner_id
  name: string;                    // name of the user or the product name
  product_id: number;              // product_id from the conversation
}

export default function ContactoCard({ owner_id, name, product_id }: ContactoCardProps) {
  const [loading, setLoading] = useState(false);
  const { getUser } = useLocalStorage();
  const { createConversation } = useConversationsApi(); // Servicio para crear conversaciones
  const router = useRouter();
  const colorScheme = useColorScheme();
  const currentTheme = Colors[colorScheme ?? 'light'];

  // Obtener el ID del usuario autenticado
  const getUserId = async () => {
    const user = await getUser();
    const userId = user?.id 
    return userId;
  };

  // Función para crear la conversación al presionar el botón
  const handleCreateConversation = async () => {
    const user_interested_id = await getUserId(); // Obtener el ID del usuario interesado
    if (user_interested_id && owner_id && product_id) {
      setLoading(true);
      try {
        const { success, message } = await createConversation(product_id, owner_id, user_interested_id);
        if (success) {
          alert('Conversación creada exitosamente');
          // Redirigir al chat (si deseas navegar a otra pantalla después de crear la conversación)
          // router.push('/chat/' + conversationId);  // Si necesitas navegar a la conversación
        } else {
          alert(message || 'Error al crear la conversación');
        }
      } catch (error) {
        alert('Error al crear la conversación');
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Faltan datos necesarios para crear la conversación');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, { borderColor: currentTheme.text }]}>
        <Ionicons name="person-circle" size={30} style={[{ color: currentTheme.text }, styles.icon]} />
        <Text style={[{ color: currentTheme.text }, styles.textWithIcon]}>{name}</Text>
        
        <TouchableOpacity
          style={[styles.inputButon, { backgroundColor: currentTheme.tint }]}
          onPress={handleCreateConversation} // Ejecutar la función al presionar el botón
          disabled={loading} // Desactivar el botón mientras estamos creando la conversación
        >
          {loading ? (
            <Text style={styles.name}>Creando conversación...</Text>
          ) : (
            <Text style={styles.name}>Ir al chat con el vendedor</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textWithIcon: {
    flexDirection: 'row', 
    alignItems: 'center', 
    fontSize: 16,
  },
  icon: {
    marginRight: 8, 
  },
  container: {
    justifyContent: 'center',  
    alignItems: 'center',   
  },
  card: {
    margin: 'auto',
    backgroundColor: '',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 2,
    width: '80%',
    borderWidth: 1,
  },
  inputButon: {
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
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
