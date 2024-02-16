import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import HomeScreen from './pages/Home';
import SettingsScreen from './pages/Settings';

const Stack = createStackNavigator();

import Dropdown from './Dropdown';
import {colors} from './config/colors';

const dropdownStack = (navigation: StackNavigationProp<any>) => (
  <Dropdown navigation={navigation} />
);

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: colors.background},
          headerTintColor: colors.text,
        }}>
        <Stack.Screen
          name="Abip"
          component={HomeScreen}
          options={({navigation}) => ({
            headerShown: true,
            headerRight: () => dropdownStack(navigation),
            headerTitle: 'Abip App',
          })}
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerTitle: 'Configurações',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
