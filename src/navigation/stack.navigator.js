import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRoute} from './appRoute';
import {AddNoteScreen, NotesScreen} from '../screens';

const Stack = createStackNavigator();

export const NotesStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRoute.NOTES}
        component={NotesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={AppRoute.ADD_NOTE}
        component={AddNoteScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
