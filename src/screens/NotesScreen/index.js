import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import navigation from '../../lib/navigationService';
import {AppRoute} from '../../navigation/appRoute';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

class NotesScreen extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <RichEditor
          onChange={e => console.log(e)}
          ref={r => (this.richText = r)}
          initialContentHTML={
            'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'
          }
          // editorInitializedCallback={() => this.onEditorInitialized()}
        />
        <RichToolbar getEditor={() => this.richText} />
      </View>
    );
  }
}

export default NotesScreen;
