// services/useMarketplaceApi.ts
const API_URL = 'http://192.168.1.3:8000/api'; // Cambia la URL según tu API

// Función para manejar las peticiones
const useMarketplaceApi = () => {

  
  
  // Función para login
  const login = async (email: string, password: string) => {
    console.log('login');
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Si la respuesta no es exitosa, lanzamos un error
      if (!response.ok) {
        return { success: false, message: 'Verifique que los datos sean correctos' };
      }

      const data = await response.json();
      console.log(data);
      
      return {
        success: true,
        data: data, // Los datos del usuario y el token
        message: 'Login exitoso',
      };

    } catch (error) {
      console.log(error);
      
      throw error;
    }
  };

  // Función para registro
  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    console.log('register');
    
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, password_confirmation }),
      });

      console.log('Response status:', response.status); // Ver el código de estado HTTP
      const data = await response.json();
      console.log('Response data:', data); // Ver los datos que se reciben de la API
      

      if (!response.ok) {
          return { success: false, message: 'Error al registrar al usuario' };
      }
      
      return {
        success: true,
        data: data, // Los datos del usuario y el token
        message: 'Registro exitoso',
      };

    } catch (error) {
      console.log(error);
      
      throw error;
    }
  };

  return { login, register };
};

export default useMarketplaceApi;
