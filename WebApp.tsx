import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/store';
import AppAuthContext from './AuthContext';

const App = () => {
  return (
    <Provider store={store}>
      <AppAuthContext />
    </Provider>
  );
};

export default App;
