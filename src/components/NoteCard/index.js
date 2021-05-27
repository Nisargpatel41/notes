import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {Icon} from '..';
import theme from '../../theme';
import {truncate} from '../../lib/helper';
import moment from 'moment';
import HTML from 'react-native-render-html';

const titleLength = 25;
const descLength = 100;
const mongoIdRegex = new RegExp('^[0-9a-fA-F]{24}$');

const NoteCard = ({note, onNotePress, onArchivePress, onDeletePress}) => {
  return (
    <TouchableOpacity style={styles.cardMain} onPress={() => onNotePress(note)}>
      <View style={styles.cardHeader}>
        <View style={styles.titleView}>
          {!mongoIdRegex.test(note?._id) ? (
            <Icon name="unsynced" color="red" />
          ) : null}
          <Text
            style={[
              styles.title,
              {marginLeft: mongoIdRegex.test(note?._id) ? 0 : 5},
            ]}>
            {note?.title.length > titleLength
              ? truncate(note?.title, titleLength)
              : note?.title}
          </Text>
        </View>
        <View style={styles.iconsView}>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => onArchivePress(note?._id)}>
            <Icon name="archive" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDeletePress(note?._id)}>
            <Icon name="delete" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.cardBody}>
        <View style={styles.timeView}>
          <Text style={styles.time}>
            Modified On :{' '}
            {moment(note?.modifiedAt).format('DD MMM YYYY hh:mm a')}
          </Text>
          <Text style={styles.time}>
            Created On : {moment(note?.createdAt).format('DD MMM YYYY hh:mm a')}
          </Text>
        </View>
        {note.content !== '' ? (
          <View style={styles.descView}>
            <HTML source={{html: note?.content}} />
            {/* {note?.note.length > descLength
              ? truncate(note?.note, descLength)
              : note?.note} */}
          </View>
        ) : null}
      </ScrollView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardMain: {
    // height: 170,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    elevation: 1,
    marginTop: 20,
    paddingBottom: 10,
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
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
