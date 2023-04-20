import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/store';
import WebAppAuthContext from './WebAuthContext';

const App = () => {
  return (
    <Provider store={store}>
      <WebAppAuthContext />
    </Provider>
  );
};

export default App;
