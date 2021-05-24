import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  ConfirmModal,
  Header,
  Icon,
  LoadingContainer,
  NoteCard,
} from '../../components';
// import {notes} from '../../lib/dummyData';
import navigation from '../../lib/navigationService';
import {AppRoute} from '../../navigation/appRoute';
import theme from '../../theme';
import {getNotesAction} from './action';

const {height} = Dimensions.get('window');

const NotesScreen = () => {
  let dispatch = useDispatch();

  const {notes, loading} = useSelector(state => ({
    notes: state.notesReducer.notes,
    loading: state.notesReducer.loading,
  }));

  const [isVisible, setIsVisible] = useState(false);
  const [sortedNotes, setSortedNotes] = useState([]);

  useEffect(() => {
    dispatch(getNotesAction());
  }, []);

  useEffect(() => {
    const newarr = notes.sort((a, b) => {
      return moment(b.modifiedAt).diff(a.modifiedAt);
    });
    setSortedNotes(newarr);
  }, [notes]);

  return (
    <View style={styles.main}>
      <Header title="Nisu's notes" searchEnabled />
      <View style={styles.contentView}>
        {/* <Button title="test" onPress={() => setIsVisible(true)} /> */}

        {sortedNotes.length > 0 ? (
          <FlatList
            data={sortedNotes}
            key="_"
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            keyExtractor={item => '_' + item._id}
            renderItem={({item, index}) => <NoteCard key={index} note={item} />}
            numColumns={1}
          />
        ) : (
          <View style={styles.emptyNotesView}>
            <Image
              source={require('../../assets/empty_notes.png')}
              style={styles.emptyNotesImage}
            />
            <Text style={styles.emptyNotesText}>No notes available.</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate(AppRoute.ADD_NOTE)}>
        <Icon name="add" color={theme.colors.WHITE} />
      </TouchableOpacity>
      <LoadingContainer loading={loading} />
      {/* <ConfirmModal visible={isVisible} onClose={setIsVisible} /> */}
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
    height: height - 70,
  },
  addButton: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: height - 120,
    right: 30,
    borderRadius: 50,
    backgroundColor: theme.colors.PRIMARY_BLUE,
    elevation: 2,
  },
  emptyNotesView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  emptyNotesImage: {
    height: 100,
    width: 100,
  },
  emptyNotesText: {
    marginTop: 10,
    fontFamily: theme.fontFamily.comfortaa.light,
    fontSize: theme.fontSize.MEDIUM,
    color: theme.colors.GREY2,
  },
});

export default NotesScreen;
