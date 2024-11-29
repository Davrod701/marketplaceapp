import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import ProductList from '@/components/ProductList';

const Tab = createBottomTabNavigator();

function Tab1Screen() {
  return (
    <View>
      <ProductList/>
    </View>
  );
}

function Tab2Screen() {
  return (
    <View>
      <Text>Tab 2 Content</Text>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MarketplaceApp" component={Tab1Screen} />
      <Tab.Screen name="Chat" component={Tab2Screen} />
    </Tab.Navigator>
  );
}
