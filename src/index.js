import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Route';
import * as serviceWorker from './serviceWorker';
import '../src/style.scss'
import Firebase, { FirebaseContext } from './components/Firebase';
import 'typeface-roboto';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers'
import logger from 'redux-logger'
import mySaga from './sagas'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger))

sagaMiddleware.run(mySaga)

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
      <Provider store={store}>
      <App />
      </Provider>  
    </FirebaseContext.Provider>,
    document.getElementById('root'),
  );
serviceWorker.unregister();