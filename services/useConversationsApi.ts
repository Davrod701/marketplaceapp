import useLocalStorage from "@/services/useLocalStorage";

const { apiUrl } = require('../package.json');

// Función para manejar las peticiones
const useConversationsApi = () => {

  const { getToken } = useLocalStorage();
  
  
  // Función para obtener todas las conversaciones
  const getAllConversations = async (idUser: number) => {
    console.log('getAllConversations');
    const token = await getToken();
    try {
      const response = await fetch(`${apiUrl}/chats?user_id=${idUser}`, {
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
  const createConversation = async (product_id: number, user_owner_id: number,user_interested_id: number ) => {
    console.log('createConversation');
    const token = await getToken();
    try {
      const response = await fetch(`${apiUrl}/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({product_id, user_owner_id, user_interested_id }), // Datos de la nueva conversación
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
