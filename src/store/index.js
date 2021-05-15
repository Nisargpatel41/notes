import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import reduxReset from 'redux-reset';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import {rootSaga} from '../saga/rootSaga';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({predicate: () => __DEV__});

function configureStore(initialState) {
  const middleWare = compose(
    applyMiddleware(loggerMiddleware, sagaMiddleware),
    reduxReset(),
  );
  return createStore(persistedReducer, initialState, middleWare);
}

const store = configureStore({});
let persisted = persistStore(store);
sagaMiddleware.run(rootSaga);
export {store, persisted};
