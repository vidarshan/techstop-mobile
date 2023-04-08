import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProductsScreen from './screens/ProductsScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ProductsScreen navigation={{}} />} />
          <Route path="/product/:id" element={<ProductScreen />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
