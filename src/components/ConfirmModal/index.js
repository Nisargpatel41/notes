import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../theme';

const ConfirmModal = ({visible, onClose, onYesPress, message}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => {
        onClose(false);
      }}>
      <View style={styles.modalBody}>
        <View style={styles.mainBody}>
          <Text style={styles.header}>Confirmation Dialog</Text>
          <Text style={styles.title}>{message}</Text>
        </View>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onClose(false)}>
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {borderLeftWidth: 1, borderLeftColor: '#d4d4d4'},
            ]}
            onPress={() => onYesPress()}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  modalBody: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  mainBody: {justifyContent: 'center', alignItems: 'center'},
  title: {
    fontFamily: theme.fontFamily.comfortaa.bold,
    fontSize: theme.fontSize.NORMAL,
    color: theme.colors.GREY2,
  },
  header: {
    fontFamily: theme.fontFamily.comfortaa.bold,
    fontSize: theme.fontSize.MEDIUM,
    marginBottom: 10,
  },
  buttonsView: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#d4d4d4',
    marginTop: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 40,
  },
  buttonText: {
    textTransform: 'uppercase',
    fontFamily: theme.fontFamily.comfortaa.regular,
    color: theme.colors.PRIMARY_BLUE,
  },
});
