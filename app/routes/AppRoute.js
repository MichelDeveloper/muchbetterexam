import React from 'react';
import Game from '../scenes/Game';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RankingDrawerContent from '../components/RankingDrawerContent';

const Drawer = createDrawerNavigator();

const AppRoute = () => {
  return (
    <Drawer.Navigator
      initialRouteName='Frog Lily Toad'
      screenOptions={{ headerShown: false, drawerPosition: 'right' }}
      drawerContent={() => <RankingDrawerContent />}
    >
      <Drawer.Screen name='Frog Lily Toad' component={Game} />
    </Drawer.Navigator>
  );
};

export default AppRoute;
