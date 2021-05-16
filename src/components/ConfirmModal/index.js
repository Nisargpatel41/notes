import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';

const ConfirmModal = ({visible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
      onBackdropPress={() => {
        onClose(false);
      }}
      backdropColor="#000"
      backdropOpacity={0.3}>
      <View
        style={{
          height: '20%',
          marginTop: 'auto',
          backgroundColor: 'blue',
        }}>
        <Text>This is Half Modal</Text>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
