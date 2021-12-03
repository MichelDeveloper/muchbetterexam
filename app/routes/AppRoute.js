import React from 'react';
import Game from '../scenes/Game';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Game'
    >
      <Stack.Screen component={Game} name='Game' />
    </Stack.Navigator>
  );
};

export default AppRoute;
