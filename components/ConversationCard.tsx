import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface ConversationCardProps {
  id: number;
  product_id: number;
  productName: string;
}

const ConversationCard = ({ id, product_id, productName }: ConversationCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.id}> Conversación ID: {id}</Text>
      <Text style={styles.productName}> Producto: {productName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
  },
  id: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productName: {
    fontSize: 14,
    color: '#555',
  },
});

export default ConversationCard;
