import useLocalStorage from "@/services/useLocalStorage";
// services/useMarketplaceApi.ts
const { apiUrl } = require('../package.json');

// Función para manejar las peticiones
const useMarketplaceApi = () => {

  const { getToken, clearStorage } = useLocalStorage();
  
  // Función para login
  const login = async (email: string, password: string) => {
    console.log('login');
    try {
      const response = await fetch(`${apiUrl}/login`, {
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
      //console.log(data);
      
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
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, password_confirmation }),
      });

      //console.log('Response status:', response.status); // Ver el código de estado HTTP
      const data = await response.json();
      //console.log('Response data:', data); // Ver los datos que se reciben de la API
      

      if (!response.ok) {
          return { success: false, message: 'Error al registrar al usuario' };
      }
      
      return {
        success: true,
        data: data, // Los datos del usuario y el token
        message: 'Registro exitoso',
      };

    } catch (error) {
     // console.log(error);
      
      throw error;
    }
  };



  // Función para obtener todos los productos
  const getAllProductos = async () => {
    console.log('getAllProductos');
    try {
      const response = await fetch(`${apiUrl}/productos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return { success: false, message: 'No se pudieron obtener los productos' };
      }

      const data = await response.json();
      //console.log('Productos:', data);

      return {
        success: true,
        data: data, // Lista de productos
        message: 'Productos obtenidos exitosamente',
      };
    } catch (error) {
      //console.log(error);
      throw error;
    }
  };


  // Función para obtener un producto por ID
  const getProductoById = async (id: number) => {
    console.log('getProductoById');
    try {
      const response = await fetch(`${apiUrl}/productos/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return { success: false, message: 'No se encontró el producto' };
      }

      const data = await response.json();
      //console.log('Producto:', data);

      return {
        success: true,
        data: data, // Producto específico
        message: 'Producto obtenido exitosamente',
      };
    } catch (error) {
      //console.log(error);
      throw error;
    }
  };



  // Función para agregar un producto
  const addProducto = async (nombre: string, precio: number, imagen: string, descripcion: string, estatus: number, user_id: number) => {
    console.log('addProducto');
    try {
      const response = await fetch(`${apiUrl}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, precio, imagen,descripcion, estatus, user_id }),
      });

      if (!response.ok) {
        return { success: false, message: 'Error al agregar el producto' };
      }

      const data = await response.json();
      //console.log('Producto agregado:', data);

      return {
        success: true,
        data: data, // Producto creado
        message: 'Producto agregado exitosamente',
      };
    } catch (error) {
      //console.log(error);
      throw error;
    }
  };


  // Función para actualizar un producto
  const updateProducto = async (id: number, nombre: string, precio: number, imagen: string, descripcion: string, estatus: number, user_id: number) => {
    console.log('updateProducto');
    try {
      const response = await fetch(`${apiUrl}/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, precio, imagen, descripcion, estatus, user_id }),
      });

      if (!response.ok) {
        return { success: false, message: 'Error al actualizar el producto' };
      }

      const data = await response.json();
      //console.log('Producto actualizado:', data);

      return {
        success: true,
        data: data, // Producto actualizado
        message: 'Producto actualizado exitosamente',
      };
    } catch (error) {
      //console.log(error);
      throw error;
    }
  };

  const logout = async () => {
    console.log('logout');
    const token = await getToken();
    try {
      const response = await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Asegúrate de enviar el token
        },
      });

      if (!response.ok) {
        //console.log('err al cerrar sesion');
        
        return { success: false, message: 'Error al cerrar sesión' };
      }

      clearStorage();

      return {
        success: true,
        message: 'Sesión cerrada exitosamente',
      };
    } catch (error) {
      //console.log(error);
      throw error;
    }
  };

  return { login, logout, register, getAllProductos, getProductoById, addProducto, updateProducto };
};

export default useMarketplaceApi;
