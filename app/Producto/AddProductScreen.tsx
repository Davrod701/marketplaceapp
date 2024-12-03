import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image, TouchableOpacity, useColorScheme } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Importamos ImagePicker
import { useRouter } from 'expo-router';
import useMarketplaceApi from '@/services/useMarketplaceApi'; // El servicio API
import useLocalStorage from '@/services/useLocalStorage';
import Colors from '@/constants/Colors';

const AddProductScreen = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenBase64, setImagenBase64] = useState<string | null>(null); // Inicializamos con null
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { getUser } = useLocalStorage();
  const [userId, setUserId] = useState<number>(0);

  const fetchUserId = async () => {
    const userData = await getUser();
    setUserId(userData?.id || 0);  // Asigna el ID del usuario
  };

  const colorScheme = useColorScheme();
  const currentTheme = Colors[colorScheme ?? 'light'];

  const { addProducto } = useMarketplaceApi(); // Llamada a la API para agregar el producto

  // Función para abrir el selector de imágenes
  const pickImage = async () => {
    // Solicitar permisos para acceder a las imágenes
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permiso Denegado', 'Necesitamos acceso a la galería para seleccionar una imagen');
      return;
    }

    // Abre la galería de imágenes
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo imágenes
      allowsEditing: true, // Permite editar la imagen antes de elegirla
      aspect: [4, 3], // Opcional: relación de aspecto
      quality: 1, // Calidad máxima
    });

    // Verificar si el resultado es exitoso
    if (result?.assets && result.assets[0]?.uri) {
      const base64Image = await getBase64(result.assets[0].uri); // Convertir la imagen seleccionada a base64
      setImagenBase64(base64Image); // Guardar la imagen base64
    } else {
      Alert.alert('Error', 'No se ha seleccionado ninguna imagen.');
    }
  };

  // Función para convertir la imagen a base64
  const getBase64 = async (uri: string): Promise<string> => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob); // Convierte la imagen a base64
      });
    } catch (error) {
      console.error('Error al obtener la imagen en base64:', error);
      return ''; // Retorna un string vacío en caso de error
    }
  };

  const handleSubmit = async () => {
    if (!nombre || !precio || !descripcion || !imagenBase64) {
      Alert.alert('Error', 'Por favor, completa todos los campos y selecciona una imagen.');
      return;
    }

    setIsLoading(true);
    await fetchUserId();
    

    try {
      const user_id = userId; // Ajusta el ID del usuario según sea necesario
      const response = await addProducto(
        nombre,
        parseFloat(precio),
        imagenBase64, // Enviamos la imagen en base64
        descripcion,
        1, // Estatus (por ejemplo, 1=activo)
        user_id
      );

      if (response.success) {
        Alert.alert('Éxito', 'Producto agregado correctamente');
        setNombre('');
        setPrecio('');
        setDescripcion('');
        setImagenBase64(null);
        router.push('/Home/HomeScreen');
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      Alert.alert('Error', 'Hubo un problema al agregar el producto.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.productBackground }]}>
      <Text style={[styles.title, { borderColor: currentTheme.text, color: currentTheme.text }]}>Agregar Producto</Text>

      <TextInput
        style={[styles.input, { borderColor: currentTheme.text, color: currentTheme.text }]}
        placeholder="Nombre del Producto"
        placeholderTextColor={currentTheme.text}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={[styles.input, { borderColor: currentTheme.text, color: currentTheme.text }]}
        placeholder="Precio"
        placeholderTextColor={currentTheme.text}
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />
      <TextInput
        style={[styles.input, { borderColor: currentTheme.text, color: currentTheme.text }]}
        placeholder="Descripción"
        placeholderTextColor={currentTheme.text}
        value={descripcion}
        onChangeText={setDescripcion}
      />

      {/* Input para la imagen */}
      <TouchableOpacity style={[styles.button, { backgroundColor: currentTheme.tint}]} onPress={pickImage}>
        <Text style={[styles.buttonText, { borderColor: currentTheme.text, color: currentTheme.opacityText }]}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {/* Mostrar la imagen seleccionada */}
      {imagenBase64 && (
        <Image source={{ uri: imagenBase64 }} style={{ width: 100, height: 100, marginTop: 10, borderRadius: 5 }} />
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isLoading ? '#ccc' : currentTheme.tint }]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={[styles.buttonText, { borderColor: currentTheme.text, color: currentTheme.opacityText }]}>{isLoading ? 'Cargando...' : 'Agregar Producto'} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default AddProductScreen;
