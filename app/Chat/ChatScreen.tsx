import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useMessagesApi from '@/services/useMessagesApi';
import { useLocalSearchParams } from 'expo-router';
import useLocalStorage from '@/services/useLocalStorage';

export default function ChatScreen() {
  const { chatId: chatIdParam } = useLocalSearchParams(); // Obtener el chatId como string
  const chatId = Number(chatIdParam); // Convertirlo a number

  const { getMessagesByChatId, sendMessage } = useMessagesApi();
  const { getUser } = useLocalStorage();

  const [messages, setMessages] = useState<any[]>([]); // Para almacenar los mensajes
  const [message, setMessage] = useState<string>('');  // Para almacenar el mensaje que el usuario escribe
  const [loading, setLoading] = useState<boolean>(true); // Para mostrar un indicador de carga si es necesario

  // Aquí inicializas el estado de userId como null (o undefined si prefieres)
  const [userId, setUserId] = useState<number | null>(null);

  // Usar useRef para almacenar el ID del intervalo
  const intervalRef = useRef<NodeJS.Timeout | null>(null); 

  // Obtener los mensajes cada 7 segundos
  useEffect(() => {
    const fetchMessages = async () => {
      if (chatId) {
        const { success, data } = await getMessagesByChatId(chatId);
        if (success) {
          setMessages(data);
        } else {
          alert('No se pudieron obtener los mensajes');
        }
        setLoading(false);
      }
    };

    // Función para obtener el ID de usuario
    const fetchUserId = async () => {
      const userData = await getUser();
      setUserId(userData?.id || null);  // Asigna el ID del usuario
    };

    fetchMessages();
    fetchUserId();

    // Intervalo para actualizar los mensajes cada 7 segundos
    intervalRef.current = setInterval(fetchMessages, 7000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Limpiar el intervalo cuando el componente se desmonte
      }
    };
  }, [chatId]);

  // Enviar un mensaje
  const handleSendMessage = async () => {
    if (!message.trim()) return; // No enviar si el mensaje está vacío
    if (userId === null) {
      alert('Usuario no autenticado');
      return;
    }

    const { success, data } = await sendMessage(chatId, userId, message);

    if (success) {
      setMessages(prevMessages => [...prevMessages, data]);  // Agregar el nuevo mensaje al final de la lista
      setMessage('');  // Limpiar el campo de entrada
    } else {
      alert('Error al enviar el mensaje');
    }
  };

  // Función para renderizar los mensajes
  const renderItem = ({ item }: any) => {
    const isCurrentUser = item.sender_id === userId; // Verificar si el mensaje fue enviado por el usuario actual
    return (
      <View style={[styles.messageContainer, isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage]}>
        <Text style={isCurrentUser ? styles.currentUserMessageText : styles.otherUserMessageText}>{item.message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando mensajes...</Text>
      ) : (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          inverted={false} // Evitar la inversión de la lista de mensajes
          contentContainerStyle={styles.messagesList} // Para mantener el contenido alineado hacia abajo
        />
      )}

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 10,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    maxWidth: '80%',
  },
  currentUserMessage: {
    marginEnd: 10,
    alignSelf: 'flex-end',
    backgroundColor: '#0078ff',  // Color azul para el mensaje del usuario actual
  },
  otherUserMessage: {
    marginStart: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#e1e1e1',  // Color gris para los mensajes de otros
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  currentUserMessageText: {
    fontSize: 18,
    color: '#fff',
  },
  otherUserMessageText: {
    fontSize: 18,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
  },
  sendButton: {
    backgroundColor: '#0078ff',
    borderRadius: 20,
    marginLeft: 10,
    padding: 10,
  },
  messagesList: {
    paddingBottom: 80, // Para dar espacio extra para el campo de entrada
  }
});
