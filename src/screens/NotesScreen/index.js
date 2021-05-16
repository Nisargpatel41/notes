import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ConfirmModal, Header, Icon, NoteCard} from '../../components';
import {notes} from '../../lib/dummyData';
import navigation from '../../lib/navigationService';
import {AppRoute} from '../../navigation/appRoute';
import theme from '../../theme';
const {height} = Dimensions.get('window');

const NotesScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={styles.main}>
      <Header title="Nisu's notes" searchEnabled />
      <View style={styles.contentView}>
        {/* <Button title="test" onPress={() => setIsVisible(true)} /> */}
        <FlatList
          data={notes}
          key="_"
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          keyExtractor={item => '_' + item.id}
          renderItem={({item, index}) => <NoteCard key={index} note={item} />}
          numColumns={1}
        />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate(AppRoute.ADD_NOTE)}>
        <Icon name="add" color={theme.colors.WHITE} />
      </TouchableOpacity>
      <ConfirmModal visible={isVisible} onClose={setIsVisible} />
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
});

export default NotesScreen;
