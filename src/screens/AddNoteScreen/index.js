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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import moment from 'moment';

import {AddNoteButton, Header, LoadingContainer} from '../../components';
import {onMessageShow} from '../../lib/helper';
import navigation from '../../lib/navigationService';
import theme from '../../theme';
import {AppRoute} from '../../navigation/appRoute';
import {addNoteAction, updateNoteAction} from '../NotesScreen/action';

const {width} = Dimensions.get('window');
class AddNoteScreen extends Component {
  state = {
    data: {
      title: '',
      content: '',
    },
    headerTitle: 'Add new note',
    buttonText: 'Save',
  };

  componentDidMount() {
    const {route} = this.props;

    if (route.params) {
      const {note} = route.params;
      let data = {
        title: note.title,
        content: note.content ? note.content : '',
      };
      this.setState({
        data: data,
        headerTitle: 'Edit note',
        buttonText: 'Update',
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {success, error} = this.props;

    if (prevProps.success !== success) {
      if (success !== '') {
        onMessageShow(success, 'success');
      }
      navigation.navigate(AppRoute.NOTES);
    }

    if (prevProps.error !== error) {
      onMessageShow(error, 'danger');
    }
  }

  onChangeHandler(type, value) {
    const data = {...this.state.data};
    data[type] = value;
    this.setState({data});
  }

  onSaveHandler() {
    if (!this.state.data.title) {
      onMessageShow('Please enter title', 'danger');
    } else {
      let data = {...this.state.data};
      data['modifiedAt'] = moment().toISOString();
      data['isDeleted'] = false;

      if (this.state.buttonText === 'Save') {
        data['createdAt'] = moment().toISOString();
        this.props.addNoteAction(data);
      } else {
        const {notes, route} = this.props;
        let tempNotes = notes;
        const updatedRecordIndex = tempNotes.findIndex(
          note => note._id === route.params.note._id,
        );
        data['noteId'] = route.params.note._id;
        tempNotes.splice(updatedRecordIndex, 1);
        this.props.updateNoteAction(data);
      }
    }
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Header title={this.state.headerTitle} />
        <ScrollView style={styles.contentView}>
          <View style={styles.titleView}>
            <TextInput
              style={styles.input}
              placeholder="title"
              placeholderTextColor={theme.colors.GREY2}
              onChangeText={text => this.onChangeHandler('title', text)}
              value={this.state.data.title}
            />
          </View>
          <View style={styles.editorView}>
            <RichToolbar
              getEditor={() => this.richText}
              selectedIconTint={theme.colors.PRIMARY_BLUE}
              style={styles.toolbar}
            />
            <RichEditor
              onChange={text => this.onChangeHandler('content', text)}
              placeholder="note"
              editorStyle={{placeholderColor: theme.colors.GREY2}}
              ref={r => (this.richText = r)}
              initialContentHTML={this.state.data.content}
            />
          </View>
          <View style={styles.buttonsRow}>
            <AddNoteButton
              text={this.state.buttonText}
              onPress={() => this.onSaveHandler()}
            />
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
        <LoadingContainer loading={this.props.loading} />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addNoteAction,
      updateNoteAction,
    },
    dispatch,
  );
}

const mapStateToProps = state => {
  return {
    loading: state.notesReducer.loading,
    error: state.notesReducer.error,
    success: state.notesReducer.success,
    notes: state.notesReducer.notes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteScreen);
