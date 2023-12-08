import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactListScreen from './components/ContactListScreen';
import Create_new_contact_screen from './components/CreateNewContactScreen';
import ProfileScreen from './components/ProfileScreen';
import UpdateContactScreen from './components/UpdateContactScreen';
import FavoriteContactScreen from './components/FavoriteContactScreen';


const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ContactList'>
        <Stack.Screen name="ContactList" component={ContactListScreen} options={{
         headerTitleAlign:'center'
        }}></Stack.Screen>
        <Stack.Screen name="AddContact" component={Create_new_contact_screen} options={{
          headerShown:false
        }}></Stack.Screen>
        <Stack.Screen name="ContactProfile" component={ProfileScreen}></Stack.Screen>
        <Stack.Screen name="UpdateContact" component={UpdateContactScreen}></Stack.Screen>
        <Stack.Screen name="FavoriteContact" component={FavoriteContactScreen}></Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
