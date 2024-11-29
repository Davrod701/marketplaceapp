import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Definir los tipos para las props que recibe el componente
interface ProductCardProps {
    name: string;
    description: string;
    price: number;
    image: string;
}

export default function ProductCard({ name, description, price, image }: ProductCardProps) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>${price}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    details: {
        flex: 1,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2a9d8f',
    },
});
