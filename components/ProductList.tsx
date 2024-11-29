import React from 'react';
import { View, FlatList, StyleSheet } from "react-native";
import ProductCard from '@/components/ProductCard';

export default function ProductList() {

    const productos = [
        {
            nombre: 'Producto 1',
            descripcion: 'Descripcion producto 1',
            precio: 30,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4IxshyBQnfGGqFj3Wwa_RLI3I6ujFMSZhqw&s'
        },
        {
            nombre: 'Producto 2',
            descripcion: 'Descripcion producto 2',
            precio: 32,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4IxshyBQnfGGqFj3Wwa_RLI3I6ujFMSZhqw&s'
        }
    ]

    return(
        <View>
            <FlatList
                data={productos}
                renderItem={({ item }) => (
                    <ProductCard
                        name={item.nombre}
                        description={item.descripcion}
                        price={item.precio}
                        image={item.imagen}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    
})