import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import useConversationsApi from '@/services/useConversationsApi';
import useMessagesApi from '@/services/useMessagesApi';

export interface ConversationsList {
    id: number;
    nombre: string;
}

const ChatList = () => {
  const [conversations, setConversations] = useState<ConversationsList[]>([]);
  const { getAllConversations } = useConversationsApi();
  const { getMessagesByChatId } = useMessagesApi();

  useEffect(() => {
    const fetchConversations = async () => {
      const result = await getAllConversations();
      if (result.success) {
        setConversations(result.data);
      }
    };

    fetchConversations();
  }, []);

  const fetchMessages = async (chatId: number) => {
    const result = await getMessagesByChatId(chatId);
    if (result.success) {
      console.log('Mensajes:', result.data);
    }
  };

  return (
    <View>
      <FlatList
        data={conversations}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nombre}</Text>
            <Button title="Ver mensajes" onPress={() => fetchMessages(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ChatList;
