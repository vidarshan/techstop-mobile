import * as React from 'react';
import {useAppDispatch, useAppSelector} from './store/store';
import {NavigationContainer} from '@react-navigation/native';
import {
  authUser,
  getUserFromAsyncStorage,
  registerUser,
  removeUserFromAsyncStorage,
} from './store/slices/userSlice';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import {TouchableOpacity} from 'react-native';
import * as RootNavigation from './RootNavigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';
import UserScreen from './screens/UserScreen';
import LoginScreen from './screens/LoginScreen';

export default function AppAuthContext() {
  const dispatch = useAppDispatch();
  const AuthContext = React.createContext({});
  const {user} = useAppSelector(state => state.user);
  const Stack = createNativeStackNavigator();

  React.useEffect(() => {
    console.log(user);
    const bootstrapAsync = () => {
      try {
        dispatch(getUserFromAsyncStorage());
      } catch (e) {}
    };

    bootstrapAsync();
  }, [dispatch, user]);

  const authContext = React.useMemo(
    () => ({
      login: async data => {
        dispatch(authUser(data));
      },
      register: async data => {
        dispatch(registerUser(data));
      },
      logout: () => {
        dispatch(removeUserFromAsyncStorage());
      },
    }),
    [dispatch],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer ref={RootNavigation.navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: '#2e2525',
            headerStyle: {backgroundColor: '#fbc405'},
          }}>
          {user.token == null ? (
            <>
              <Stack.Screen
                options={{headerShown: false}}
                name="SignIn"
                component={LoginScreen}
              />
              <Stack.Screen
                options={{headerShown: false}}
                name="SignUp"
                component={RegisterScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={ProductsScreen}
                options={{
                  headerTitle: 'Products',
                  headerLeft: () => (
                    <TouchableOpacity
                      onPress={() => RootNavigation.navigate('User', {})}>
                      <Icon name="user-alt" size={16} color="#000000" />
                    </TouchableOpacity>
                  ),
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => RootNavigation.navigate('Cart', {})}>
                      <Icon name="shopping-bag" size={16} color="#000000" />
                    </TouchableOpacity>
                  ),
                }}
              />
              <Stack.Screen name="Product" component={ProductScreen} />
              <Stack.Screen name="Cart" component={CartScreen} />
              <Stack.Screen name="Order" component={OrderScreen} />
              <Stack.Screen name="User" component={UserScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
