import Colors from '@/constants/Colors';
import useMarketplaceApi from '@/services/useMarketplaceApi';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Definir los tipos para las props que recibe el componente
export interface ProductCardProps {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  estatus: number;
  user_id: number;
}

export default function EditarCard({
  id,
  nombre,
  precio,
  imagen,
  descripcion,
  estatus,
  user_id,
}: ProductCardProps) {
  const router = useRouter();
  const { updateProducto } = useMarketplaceApi();
  const colorScheme = useColorScheme();
  const currentTheme = Colors[colorScheme ?? 'light'];

  // Estado para almacenar el estatus del producto que se va a actualizar
  const [selectedStatus, setSelectedStatus] = useState<number>(estatus);

  // Función para actualizar el producto
  const handleUpdate = async () => {
    try {
      const response = await updateProducto( id,
        nombre,
        precio,
        imagen,
        descripcion,
        selectedStatus,
        user_id,);
      if (response.success) {
        alert('Producto actualizado correctamente');
      } else {
        alert('Error al actualizar el producto');
      }
    } catch (error) {
      alert('Hubo un error al actualizar el producto');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, { borderColor: currentTheme.text }]}>
        <Text style={[styles.name, { color: currentTheme.text }]}>Cambiar estatus de la venta</Text>
        <Text style={[styles.label, { color: currentTheme.text }]}>Estatus:</Text>
        <Picker
          selectedValue={selectedStatus}
          style={[styles.picker, { color: currentTheme.text, borderColor: currentTheme.text }]}
          dropdownIconColor={currentTheme.text} 
          onValueChange={(itemValue: number) => setSelectedStatus(itemValue)}
        >
          <Picker.Item label="Activo" value={1} />
          <Picker.Item label="Vendido" value={2} />
          <Picker.Item label="Pendiente" value={3} />
        </Picker>

        {/* Botón para actualizar el estatus */}
        <TouchableOpacity
          style={[styles.inputButon, { backgroundColor: currentTheme.tint }]}
          onPress={handleUpdate}
        >
          <Text style={[styles.buttonText, { color: currentTheme.opacityText }]}>Actualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
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
