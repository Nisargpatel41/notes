import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRoute} from './appRoute';
import {NotesStackScreen} from './stack.navigator';
import {StatusBar} from 'react-native';
import theme from '../theme';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      {/* NEW */}
      <Stack.Screen
        name={AppRoute.APP}
        component={NotesStackScreen}
        options={{
          header: () => (
            <StatusBar
              barStyle={'light-content'}
              backgroundColor={theme.colors.BLUE}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
