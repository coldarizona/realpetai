import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation';
import { MainTabs } from './src/navigation/MainTabs';
import StylesScreen from './src/screens/StylesScreen';
import PaymentScreen from './src/screens/PaymentScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="MainTabs"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Styles" 
          component={StylesScreen}
          options={{
            title: 'Choose Style',
          }}
        />
        <Stack.Screen 
          name="Payment" 
          component={PaymentScreen}
          options={{
            title: 'Payment',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 