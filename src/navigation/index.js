import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppNavigator} from './app.navigator';
import {AppRoute} from './appRoute';

const Stack = createStackNavigator();

export default MainContainer = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={AppRoute.APP}>
      <Stack.Screen name={AppRoute.APP} component={AppNavigator} />
    </Stack.Navigator>
  );
};
