import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Header, NoteCard} from '../../components';
import navigation from '../../lib/navigationService';
import {AppRoute} from '../../navigation/appRoute';
import theme from '../../theme';

const NotesScreen = () => {
  return (
    <View style={styles.main}>
      <Header title="Nisu's notes" searchEnabled />
      <View style={styles.contentView}>
        <NoteCard
          note="he editor component. Simply place this component in your view hi"
          desc="useContainer A boolean value that determines if a View container is wrapped around the WebView. The default value is true. If you are using your own View to wrap this library around, set this value to false."
        />
        <NoteCard
          note="he editor component. Simply place this component in your view hi"
          desc="useContainer A boolean value that determines if a View container is wrapped around the WebView. The default value is true. If you are using your own View to wrap this library around, set this value to false."
        />
      </View>
      {/* <Button
        title="Add Note"
        onPress={() => navigation.navigate(AppRoute.ADD_NOTE)}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.WHITE,
  },
  contentView: {
    paddingHorizontal: 20,
  },
});

export default NotesScreen;
