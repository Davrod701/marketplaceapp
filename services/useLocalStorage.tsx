import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipo para los datos del usuario
interface User {
  id: number;
  name: string;
  email: string;
  // Agrega más propiedades según lo que almacenes en el objeto de usuario
}

const useLocalStorage = () => {

  // Función para obtener el token de AsyncStorage
  const getToken = async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem('token');
      if(token != null){
        return token;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el token:', error);
      return null;
    }
  };

  // Función para almacenar el token en AsyncStorage
  const setToken = async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Error al almacenar el token:', error);
    }
  };

  // Función para obtener los datos del usuario de AsyncStorage
  const getUser = async (): Promise<User | null> => {
    try {
      const user = await AsyncStorage.getItem('user');
      if(user != null){
        return user ? JSON.parse(user) : null;
      } else {
        return null;
      }
      
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      return null;
    }
  };

  // Función para almacenar los datos del usuario en AsyncStorage
  const setUser = async (user: User): Promise<void> => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error al almacenar el usuario:', error);
    }
  };

  // Función para eliminar el token y los datos del usuario (cerrar sesión)
  const clearStorage = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error al eliminar los datos de almacenamiento:', error);
    }
  };

  return { setToken, getToken, setUser, getUser, clearStorage };
};

export default useLocalStorage;
