import React from 'react';
import Game from '../scenes/Game';
import Menu from '../scenes/Menu';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RankingDrawerContent from '../components/RankingDrawerContent';

const Drawer = createDrawerNavigator();

const AppRoute = () => {
  return (
    <Drawer.Navigator
      initialRouteName='Menu'
      screenOptions={{ headerShown: false, drawerPosition: 'right' }}
      drawerContent={() => <RankingDrawerContent />}
    >
      <Drawer.Screen name='Game' component={Game} />
      <Drawer.Screen name='Menu' component={Menu} />
    </Drawer.Navigator>
  );
};

export default AppRoute;
