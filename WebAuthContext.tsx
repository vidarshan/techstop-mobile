import * as React from 'react';
import {useAppDispatch, useAppSelector} from './store/store';
import {
  authUser,
  getUserFromLocalStorage,
  registerUser,
  removeUserFromLocalStorage,
} from './store/slices/userSlice';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';
import UserScreen from './screens/UserScreen';
import LoginScreen from './screens/LoginScreen';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

export default function WebAppAuthContext() {
  const dispatch = useAppDispatch();
  const AuthContext = React.createContext({});
  const {user} = useAppSelector(state => state.user);

  React.useEffect(() => {
    const bootstrapAsync = () => {
      try {
        dispatch(getUserFromLocalStorage());
      } catch (e) {}
    };

    bootstrapAsync();
  }, [dispatch]);

  const authContext = React.useMemo(
    () => ({
      login: async data => {
        dispatch(authUser(data));
      },
      register: async data => {
        dispatch(registerUser(data));
      },
      logout: () => {
        dispatch(removeUserFromLocalStorage());
      },
    }),
    [dispatch],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Router>
        <Routes>
          {user.token == null ? (
            <>
              <Route path="/" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
            </>
          ) : (
            <>
              <Route path="/" element={<OrderScreen />} />
              <Route
                path="/orders"
                element={<ProductsScreen navigation={{}} />}
              />
              <Route path="/user" element={<UserScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
            </>
          )}
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}
