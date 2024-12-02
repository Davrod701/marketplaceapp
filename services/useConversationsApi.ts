import useLocalStorage from "@/services/useLocalStorage";

// services/useConversationsApi.ts
const API_URL = 'http://192.168.1.3:8000/api'; // Cambia la URL según tu API

// Función para manejar las peticiones
const useConversationsApi = () => {

  const { getToken } = useLocalStorage();
  
  // Función para obtener todas las conversaciones
  const getAllConversations = async () => {
    console.log('getAllConversations');
    const token = await getToken();
    try {
      const response = await fetch(`${API_URL}/chats?user_id=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Usando el token para autenticación
        },
      });

      if (!response.ok) {
        return { success: false, message: 'No se pudieron obtener las conversaciones' };
      }

      const data = await response.json();
//      console.log('Conversaciones:', data);

      return {
        success: true,
        data: data, // Lista de conversaciones
        message: 'Conversaciones obtenidas exitosamente',
      };
    } catch (error) {
      //console.log(error);
      throw error;
    }
  };

  // Función para crear una nueva conversación
  const createConversation = async (user_id: number, nombre: string) => {
    console.log('createConversation');
    const token = await getToken();
    try {
      const response = await fetch(`${API_URL}/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, nombre }), // Datos de la nueva conversación
      });

      if (!response.ok) {
        return { success: false, message: 'Error al crear la conversación' };
      }

      const data = await response.json();
      console.log('Conversación creada:', data);

      return {
        success: true,
        data: data, // Conversación creada
        message: 'Conversación creada exitosamente',
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { getAllConversations, createConversation };
};

export default useConversationsApi;
