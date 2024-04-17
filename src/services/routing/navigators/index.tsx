import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNavigationContainerRef } from '@react-navigation/native';

import { routes } from '../routesConfig';

import SplashScreen from '@screens/core/splash';
import LoginScreen from '@screens/auth/login';

const Root = createStackNavigator();

export const navigationRef = createNavigationContainerRef();

const RootNavigator = () => {
  return (
    <Root.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
      initialRouteName={routes.core.splash}>
      <Root.Screen name={routes.core.splash} component={SplashScreen} />
      <Root.Screen name={routes.auth.login} component={LoginScreen} />
    </Root.Navigator>
  );
};

export default RootNavigator;
