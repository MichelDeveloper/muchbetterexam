import React from 'react';
import AppRoute from './AppRoute';
import { NavigationContainer } from '@react-navigation/native';

const RouterComponent = () => {
  return (
    <NavigationContainer>
      <AppRoute />
    </NavigationContainer>
  );
};

export default RouterComponent;
