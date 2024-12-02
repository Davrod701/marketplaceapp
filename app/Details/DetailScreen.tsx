import { View, Text, StyleSheet, useColorScheme, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { useEffect, useState } from 'react';
import useMarketplaceApi from '@/services/useMarketplaceApi';
import ContactoCard from '@/components/ContactoCard';
import useLocalStorage from '@/services/useLocalStorage';
import EditarCard from '@/components/EditarCard';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  estatus: number;
  user_id: number;
}

export default function DetailScreen() {
  const { id } = useLocalSearchParams(); // Accedemos al parámetro 'id' de la propiedad route.params

  // Estado para almacenar los productos y el estado de carga
  const [producto, setProducto] = useState<Producto>();
  const [loading, setLoading] = useState(true);
  const [userDataId, setUserDataId] = useState<number | undefined>();

  const { getProductoById } = useMarketplaceApi(); // Llamamos a la función del servicio
  const { getUser } = useLocalStorage();

  // Función para obtener productos de la API
  const fetchProducto = async (identifier: any) => {
    try {
      const { success, data, message } = await getProductoById(identifier); // Usamos la función que ya creaste en useMarketplaceApi
      setProducto(data); // Actualizamos el estado con los productos obtenidos
    } catch (error) {
      console.log('Error al obtener productos:', error);
    } finally {
      setLoading(false); // Deja de cargar cuando termine la solicitud
    }

    const userData = await getUser();
    setUserDataId(userData?.id); // Asignamos el ID del usuario logueado
  };

  // Usamos useEffect para obtener productos al montar el componente
  useEffect(() => {
    fetchProducto(id);
  }, []);

  const colorScheme = useColorScheme();
  const currentTheme = Colors[colorScheme ?? 'light'];

  // Mostrar un indicador de carga mientras estamos esperando los productos
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={[{ color: currentTheme.text }]}>Cargando producto...</Text>
      </View>
    );
  }

  if (!producto?.id) {
    return <Text>No se encontró el producto</Text>; // O cualquier otro mensaje de error o UI
  }

  return (
    <View>
      <Image
        source={{ uri: producto?.imagen }}
        style={styles.image}
        onError={(error) => console.log('Image loading error:', error)}
      />
      <Text style={[styles.name, { color: currentTheme.text }]}>{producto?.nombre} </Text>
      <Text style={[styles.price, { color: currentTheme.text }]}>${producto?.precio}</Text>
      <Text style={[styles.description, styles.topSpace, { color: currentTheme.text }]}>Descripcion del producto:</Text>
      <Text style={[styles.description, styles.bottomSpace, { color: currentTheme.text }]}>{producto?.descripcion}</Text>

      {/* Condicional para mostrar el componente correspondiente */}
      {producto?.user_id === userDataId ? (


        <EditarCard
          id={producto?.id}
          nombre={producto?.nombre ?? 'Nombre no disponible'}  // Valor por defecto
          precio={producto?.precio ?? 0}  // Valor por defecto
          imagen={producto?.imagen ?? ''}  // Valor por defecto
          descripcion={producto?.descripcion ?? 'Descripción no disponible'}  // Valor por defecto
          estatus={producto?.estatus ?? 1}  // Valor por defecto
          user_id={producto?.user_id ?? 0}  // Valor por defecto
        />
      ) : (
        <ContactoCard owner_id={producto?.user_id} product_id={producto?.id} name="Contactar al vendedor" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  description: {
    fontWeight: 'bold',
  },
  topSpace: {
    marginTop: 20,
  },
  bottomSpace: {
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    margin: 'auto',
  },
});
