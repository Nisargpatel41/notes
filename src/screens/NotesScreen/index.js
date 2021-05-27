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
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';

import {
  ConfirmModal,
  Header,
  Icon,
  LoadingContainer,
  NoteCard,
} from '../../components';
// import {notes} from '../../lib/dummyData';
import {AppRoute} from '../../navigation/appRoute';
import {onMessageShow} from '../../lib/helper';
import theme from '../../theme';
import {
  getNotesAction,
  callPendingSubmits,
  setPendingDataAction,
  deleteNoteAction,
  archiveNoteAction,
} from './action';

const {height} = Dimensions.get('window');

const NotesScreen = ({navigation}) => {
  let dispatch = useDispatch();

  const {
    notes,
    success,
    error,
    loading,
    pendingAddNotes,
    pendingUpdateNotes,
    pendingArchiveNotes,
    pendingDeleteNotes,
    callPendingSubmitsSuccess,
    callPendingSubmitsError,
  } = useSelector(state => ({
    notes: state.notesReducer.notes,
    success: state.notesReducer.success,
    error: state.notesReducer.error,
    pendingAddNotes: state.notesReducer.pendingAddNotes,
    pendingUpdateNotes: state.notesReducer.pendingUpdateNotes,
    pendingArchiveNotes: state.notesReducer.pendingArchiveNotes,
    pendingDeleteNotes: state.notesReducer.pendingDeleteNotes,
    callPendingSubmitsSuccess: state.notesReducer.callPendingSubmitsSuccess,
    callPendingSubmitsError: state.notesReducer.callPendingSubmitsError,
    loading: state.notesReducer.loading,
  }));

  const [isDeleteNoteVisible, setIsDeleteNoteVisible] = useState(false);
  const [isArchiveNoteVisible, setIsArchiveNoteVisible] = useState(false);
  const [sortedNotes, setSortedNotes] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [archiveNoteId, setArchiveNoteId] = useState('');
  const [deleteNoteId, setDeleteNoteId] = useState('');

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(getNotesAction());
      // NETINFO LISTENER
      NetInfo.addEventListener(state => {
        if (state.isConnected && state.isInternetReachable) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      });
    });
  }, [navigation]);

  useEffect(() => {
    refillData();
  }, [notes]);

  useEffect(() => {
    let tempNotes = [...notes];
    if (searchText !== '') {
      tempNotes = tempNotes.filter(
        note =>
          note.title.toLowerCase().includes(searchText.toLowerCase()) ||
          note.content.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    const newarr = tempNotes.sort((a, b) => {
      return moment(b.modifiedAt).diff(a.modifiedAt);
    });
    setSortedNotes(newarr);
  }, [searchText]);

  // CALL DATA AND PENDING WHEN CONNECTED
  useEffect(() => {
    if (isConnected) {
      if (
        pendingAddNotes.length > 0 ||
        pendingUpdateNotes.length > 0 ||
        pendingArchiveNotes.length > 0 ||
        pendingDeleteNotes.length > 0
      ) {
        dispatch(
          callPendingSubmits({
            pendingAddNotes: pendingAddNotes,
            pendingUpdateNotes: pendingUpdateNotes,
            pendingArchiveNotes: pendingArchiveNotes,
            pendingDeleteNotes: pendingDeleteNotes,
          }),
        );
      }
    }
  }, [isConnected]);

  useEffect(() => {
    if (callPendingSubmitsSuccess !== '') {
      onMessageShow(callPendingSubmitsSuccess, 'success');
      dispatch(setPendingDataAction());
      dispatch(getNotesAction());
    }
  }, [callPendingSubmitsSuccess]);

  useEffect(() => {
    if (callPendingSubmitsError !== '') {
      onMessageShow(callPendingSubmitsError, 'danger');
    }
  }, [callPendingSubmitsError]);

  useEffect(() => {
    if (success !== '') {
      onMessageShow(success, 'success');
      dispatch(getNotesAction());
    }
  }, [success]);

  useEffect(() => {
    if (error !== '') {
      onMessageShow(error, 'danger');
    }
  }, [error]);

  const refillData = () => {
    const filteredNotes = notes.filter(note => note.isDeleted === false);
    const newarr = filteredNotes.sort((a, b) => {
      return moment(b.modifiedAt).diff(a.modifiedAt);
    });
    setSortedNotes(newarr);
  };

  const handleNotePress = note => {
    navigation.navigate(AppRoute.ADD_NOTE, {note});
  };

  const handleArchivePress = id => {
    setArchiveNoteId(id);
    setIsArchiveNoteVisible(true);
  };

  const handleDeletePress = id => {
    setDeleteNoteId(id);
    setIsDeleteNoteVisible(true);
  };

  const handleDeleteModalClose = value => {
    setDeleteNoteId('');
    setIsDeleteNoteVisible(value);
  };

  const handleArchiveModalClose = value => {
    setArchiveNoteId('');
    setIsArchiveNoteVisible(value);
  };

  const handleArchiveModalYesPress = () => {
    dispatch(archiveNoteAction({noteId: archiveNoteId}));
    setIsArchiveNoteVisible(false);
    setDeleteNoteId('');
  };

  const handleDeleteModalYesPress = () => {
    dispatch(deleteNoteAction({noteId: deleteNoteId}));
    setIsDeleteNoteVisible(false);
    setArchiveNoteId('');
  };

  return (
    <View style={styles.main}>
      <Header
        title="Nisu's notes"
        searchEnabled
        onChangeText={text => setSearchText(text)}
        onSearchClose={() => {
          setSearchText('');
          refillData();
        }}
      />
      <View style={styles.contentView}>
        {sortedNotes.length > 0 ? (
          <FlatList
            data={sortedNotes}
            key="_"
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            keyExtractor={item => '_' + item._id}
            renderItem={({item, index}) => (
              <NoteCard
                key={index}
                note={item}
                onNotePress={handleNotePress}
                onArchivePress={handleArchivePress}
                onDeletePress={handleDeletePress}
              />
            )}
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
      <ConfirmModal
        visible={isDeleteNoteVisible}
        onClose={handleDeleteModalClose}
        message="Are you sure to delete this note?"
        onYesPress={handleDeleteModalYesPress}
      />
      <ConfirmModal
        visible={isArchiveNoteVisible}
        onClose={handleArchiveModalClose}
        message="Are you sure to archive this note?"
        onYesPress={handleArchiveModalYesPress}
      />
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
