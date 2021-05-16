import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from '..';
import theme from '../../theme';

const Header = ({title, searchEnabled, onChangeText}) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <View style={styles.main}>
      {!searchOpen ? (
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          {searchEnabled && (
            <TouchableOpacity onPress={() => setSearchOpen(true)}>
              <Icon name="search" color={theme.colors.WHITE} />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.searchMain}>
          <TextInput
            placeholder="Search..."
            placeholderTextColor={theme.colors.PLACE_HOLDER_TEXT_COLOR}
            style={styles.searchInput}
            onChangeText={onChangeText}
          />
          <TouchableOpacity
            onPress={() => setSearchOpen(false)}
            style={styles.closeButton}>
            <Icon
              name="close"
              color={theme.colors.BLACK}
              height="13"
              width="13"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 60,
    elevation: 3,
    marginBottom: 10,
  },
  header: {
    paddingHorizontal: 20,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.PRIMARY_BLUE,
  },
  searchMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    backgroundColor: theme.colors.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.GREY3,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: theme.fontFamily.comfortaa.bold,
    fontSize: theme.fontSize.MEDIUM,
    color: theme.colors.WHITE,
  },
  searchInput: {
    color: theme.colors.BLACK,
    flex: 10,
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
});

export default Header;
