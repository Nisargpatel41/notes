import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import navigation from './lib/navigationService';
import MainContainer from './navigation';
import {store, persisted} from './store';
import FlashMessage from 'react-native-flash-message';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  const navigationRef = useRef(null);

  useEffect(() => {
    navigation.setTopLevelNavigator(navigationRef.current);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <PersistGate loading={null} persistor={persisted}>
          <MainContainer />
        </PersistGate>
      </NavigationContainer>
      <FlashMessage position="bottom" />
    </Provider>
  );
};

export default App;
