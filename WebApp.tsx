// import * as React from 'react';
import ProductsScreen from './screens/ProductsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductScreen from './screens/ProductScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {TouchableOpacity} from 'react-native';
import {navigationRef} from './RootNavigation';
import * as RootNavigation from './RootNavigation';
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: '#2e2525',
            headerStyle: {backgroundColor: '#DF2E38'},
          }}>
          <Stack.Screen
            name="Home"
            component={ProductsScreen}
            options={{
              headerTitle: 'Products',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => RootNavigation.navigate('Cart', {})}>
                  <Icon name="shopping-bag" size={16} color="#fff" />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="Product" component={ProductScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Order" component={OrderScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
