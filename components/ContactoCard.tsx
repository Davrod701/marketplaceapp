import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text,  StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

// Definir los tipos para las props que recibe el componente
interface ProductCardProps {
  id: number | undefined;
  name: string;
}

export default function ContactoCard({ id, name }: ProductCardProps) {
  const router = useRouter();


 
  const colorScheme = useColorScheme();
  const currentTheme = Colors[colorScheme ?? 'light'];
  

  return (
    <View style={styles.container}>
    <View style={[ styles.card, {borderColor: currentTheme.text}]}>
     
    <Ionicons name="person-circle" size={30} style={[{ color: currentTheme.text }, styles.icon]} />
        <Text style={[{ color: currentTheme.text }, styles.textWithIcon]}>
           {name}
        </Text>
         <TouchableOpacity
       style={[styles.inputButon, { backgroundColor: currentTheme.tint }]}
       onPress={() => alert({id} + ' ' +{name})}>
          <Text style={styles.name}>Ir al chat con el vendedor</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    textWithIcon: {
        flexDirection: 'row', 
        alignItems: 'center', 
        fontSize: 16,
      },
      icon: {
        marginRight: 8, 
      },
    container: {
        justifyContent: 'center',  
        alignItems: 'center',   
      },
  card: {
    margin: 'auto',
    backgroundColor: '',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 2,
    width: '80%',
    borderWidth: 1
  },
  inputButon: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    margin: 'auto',
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
