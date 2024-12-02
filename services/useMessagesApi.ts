// services/useMessagesApi.ts
const API_URL = 'http://192.168.1.3:8000/api'; // Cambia la URL según tu API

// Función para manejar las peticiones
const useMessagesApi = () => {

  // Función para obtener todos los mensajes de un chat
  const getMessagesByChatId = async (chatId: number) => {
    console.log('getMessagesByChatId');
    try {
      const response = await fetch(`${API_URL}/chats/${chatId}/messages`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Usando el token para autenticación
        },
      }); 

      if (!response.ok) {
        return { success: false, message: 'No se pudieron obtener los mensajes' };
      }

      const data = await response.json();
      //console.log('Mensajes:', data);

      return {
        success: true,
        data: data, // Lista de mensajes
        message: 'Mensajes obtenidos exitosamente',
      };
    } catch (error) {
      //console.log(error);
      throw error;
    }
  };

  // Función para enviar un mensaje
  const sendMessage = async (chatId: number, user_id: number, message: string) => {
    console.log('sendMessage');
    try {
      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ chat_id: chatId, user_id, message }), // Datos del mensaje
      });

      if (!response.ok) {
        return { success: false, message: 'Error al enviar el mensaje' };
      }

      const data = await response.json();
      //console.log('Mensaje enviado:', data);

      return {
        success: true,
        data: data, // Mensaje enviado
        message: 'Mensaje enviado exitosamente',
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Función para eliminar un mensaje
  const deleteMessage = async (messageId: number) => {
    console.log('deleteMessage');
    try {
      const response = await fetch(`${API_URL}/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        return { success: false, message: 'Error al eliminar el mensaje' };
      }

      const data = await response.json();
      //console.log('Mensaje eliminado:', data);

      return {
        success: true,
        message: 'Mensaje eliminado exitosamente',
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { getMessagesByChatId, sendMessage, deleteMessage };
};

export default useMessagesApi;