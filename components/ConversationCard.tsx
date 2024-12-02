import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';

export interface ConversationCardProps {
  id: number;
  product_id: number;
  productName: string;
}

const ConversationCard = ({ id, product_id, productName }: ConversationCardProps) => {

  const colorScheme = useColorScheme();
  const currentTheme = Colors[colorScheme ?? 'light'];

  const router = useRouter();

  const navigateToChat = (idConversation: number) => {
    router.push(`/Chat/ChatScreen?chatId=${idConversation}`);
  }

  return (
    <View style={[styles.card, {backgroundColor: currentTheme.conversationCardBackground, borderColor: currentTheme.text}]}>
      <TouchableOpacity onPress={() => navigateToChat(id)}>
      <Text style={[styles.id, {color: currentTheme.text}]}> {id}</Text>
      <Text style={[styles.productName, {color: currentTheme.text}]}> Producto: {productName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  id: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ConversationCard;
