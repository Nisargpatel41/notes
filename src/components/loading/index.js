import React from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import theme from '../../theme';

const {height, width} = Dimensions.get('window');

const LoadingContainer = ({loading}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={loading}>
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" color={theme.colors.BLUE} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    position: 'absolute',
    height: height,
    width: width,
    backgroundColor: theme.colors.WHITE_FADE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});

export default LoadingContainer;
