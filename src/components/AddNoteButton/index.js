import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import theme from '../../theme';
const {width} = Dimensions.get('window');

const AddNoteButton = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 40,
    width: (width - 50) / 2,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.PRIMARY_BLUE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  text: {
    fontFamily: theme.fontFamily.comfortaa.bold,
    fontSize: theme.fontSize.MEDIUM,
    color: theme.colors.WHITE,
  },
});

export default AddNoteButton;
