import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, useColorScheme, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ProductList from '@/components/ProductList';
import ChatList from '@/components/ChatList';
import Colors from '@/constants/Colors';
import useMarketplaceApi from '@/services/useMarketplaceApi';

const Tab = createBottomTabNavigator();

function Tab1Screen() {

  const router = useRouter();

  const handleAgregar = () => {
    router.push('/Producto/AddProductScreen');
  }

  const colorScheme = useColorScheme();
  const currentTheme = Colors[colorScheme ?? 'light']; 

  return (
    <View>
      <TouchableOpacity 
      style={[ styles.addButon, { backgroundColor: currentTheme.tint }]}
      onPress={handleAgregar} ><Text style={[ styles.butonText,  { color: currentTheme.opacityText }]}>Agregar nuevo</Text></TouchableOpacity>
      <ProductList/>
    </View>
  );
}



function Tab2Screen() {
  return (
    <View>
      <ChatList />
    </View>
  );
}

export default function HomeScreen() {

  const colorScheme = useColorScheme();
  const currentTheme = Colors[colorScheme ?? 'light'];
  const { logout } = useMarketplaceApi();
  const router = useRouter();

   const handleButtonPress = async () => {
    const { success,  message } = await logout();

    if (success) {
      router.push('/Login/LoginScreen')
      alert('Se ha cerrado la sesion correctamente');
    }
  };

  return (
    <Tab.Navigator>
      <Tab.Screen name="MarketplaceApp" component={Tab1Screen} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} /> // Icono para MarketplaceApp
          ),
          headerRight: () => (
            <TouchableOpacity 
              style={{ padding: 10 }}
              onPress={handleButtonPress}
            >
              <Text style={[ {fontSize: 25} ,{ color: currentTheme.logout }]} > Salir <Ionicons name="log-out-outline" size={25} color={currentTheme.logout} /></Text>
              
            </TouchableOpacity>
          ),
        }} />
      <Tab.Screen name="Chat" component={Tab2Screen} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" size={size} color={color} /> // Icono para Chat
          ),
        }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  addButon: {
    width: '40%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginBottom: 10,
    marginStart: 2,
    marginTop: 10
  },
  butonText: {
    alignContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  }
})