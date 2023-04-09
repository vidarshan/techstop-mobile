import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProductsScreen from './screens/ProductsScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserScreen from './screens/UserScreen';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<UserScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route
            path="/products"
            element={<ProductsScreen navigation={{}} />}
          />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/orders" element={<OrderScreen />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
