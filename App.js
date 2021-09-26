import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from './components/Home';
import { About } from './components/About';
import { TV } from './components/TV';

const HomeStack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen 
      name="Home" 
      component={Home}
      options= {({ navigation }) => ({
        headerShown: false,
        headerTitleAlign: 'left',
      })}
      />
      <HomeStack.Screen 
      name="TV" 
      component={TV}
      options={({ route }) => ({
        headerShown: false
      })}
      />
      <HomeStack.Screen 
      name="About" 
      component={About}
      options={({ route }) => ({
        headerShown: false
      })}
      />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
