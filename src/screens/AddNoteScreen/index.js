import React, {Component} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import navigation from '../../lib/navigationService';
import {AppRoute} from '../../navigation/appRoute';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import theme from '../../theme';
import {AddNoteButton, Header} from '../../components';
import {onMessageShow} from '../../lib/helper';
const {width} = Dimensions.get('window');
class AddNoteScreen extends Component {
  state = {
    data: {
      title: '',
      description: '',
    },
  };

  onChangeHandler(type, value) {
    const data = {...this.state.data};
    data[type] = value;
    this.setState({data});
  }

  onSaveHandler() {
    onMessageShow('Please enter title', 'danger');
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Header title="Add new note" />
        <ScrollView style={styles.contentView}>
          <View style={styles.titleView}>
            <TextInput
              style={styles.input}
              placeholder="title"
              placeholderTextColor={theme.colors.GREY2}
              onChange={text => this.onChangeHandler('title', text)}
              value={this.state.title}
            />
          </View>
          <View style={styles.editorView}>
            <RichToolbar
              getEditor={() => this.richText}
              selectedButtonStyle={{backgroundColor: theme.colors.BLUE}}
              style={styles.toolbar}
            />
            <RichEditor
              onChange={text => this.onChangeHandler('description', text)}
              placeholder="note"
              editorStyle={{placeholderColor: theme.colors.GREY2}}
              ref={r => (this.richText = r)}
              // initialContentHTML={
              //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"
              // }
            />
          </View>
          <View style={styles.buttonsRow}>
            <AddNoteButton text="Save" onPress={() => this.onSaveHandler()} />
            <AddNoteButton
              text="Cancel"
              onPress={() => navigation.navigate(AppRoute.NOTES)}
            />
          </View>
          <View style={styles.buttonsRow}>
            <AddNoteButton text="Archive" />
            <AddNoteButton text="Delete" />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  contentView: {
    paddingHorizontal: 20,
  },
  titleView: {
    marginVertical: 10,
    borderBottomColor: theme.colors.GREY,
    height: 40,
    backgroundColor: theme.colors.WHITE,
  },
  input: {
    // fontFamily: theme.fontFamily.comfortaa.bold,
    color: theme.colors.BLACK,
    paddingHorizontal: 10,
    fontSize: theme.fontSize.MEDIUM,
  },
  editorView: {
    marginVertical: 10,
  },
  toolbar: {
    backgroundColor: theme.colors.WHITE,
    borderBottomColor: theme.colors.GREY4,
    borderBottomWidth: 1,
  },
  buttonsRow: {
    width: width - 20,
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default AddNoteScreen;
