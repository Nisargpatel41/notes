import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Icon} from '..';
import theme from '../../theme';
import {truncate} from '../../lib/helper';
import moment from 'moment';

const titleLength = 25;
const descLength = 100;

const NoteCard = ({note, desc}) => {
  return (
    <View style={styles.cardMain}>
      <View style={styles.cardHeader}>
        <View style={styles.titleView}>
          <Text style={styles.title}>
            {note.length > titleLength ? truncate(note, titleLength) : note}
          </Text>
        </View>
        <View style={styles.iconsView}>
          <TouchableOpacity style={{marginRight: 10}}>
            <Icon name="archive" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="delete" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.timeView}>
          <Text style={styles.time}>
            {moment().format('DD MMM YYYY hh:mm:a')}
          </Text>
        </View>
        <View style={styles.descView}>
          <Text style={styles.desc}>
            {desc.length > descLength ? truncate(desc, descLength) : desc}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardMain: {
    height: 170,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    elevation: 1,
    marginTop: 20,
  },
  cardHeader: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
  },
  titleView: {
    flex: 4,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  title: {
    fontSize: theme.fontSize.MEDIUM,
    fontFamily: theme.fontFamily.comfortaa.bold,
    // color: theme.colors.PRIMARY_BLUE,
    color: theme.colors.BLACK,
  },
  iconsView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    height: 120,
    paddingHorizontal: 5,
  },
  timeView: {
    paddingVertical: 5,
  },
  time: {
    color: theme.colors.GREY2,
    fontFamily: theme.fontFamily.comfortaa.regular,
  },
  descView: {
    marginTop: 10,
  },
  desc: {
    color: theme.colors.BLACK,
    fontFamily: theme.fontFamily.comfortaa.regular,
    lineHeight: 20,
  },
});

export default NoteCard;
