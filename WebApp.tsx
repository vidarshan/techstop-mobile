// import * as React from 'react';
import ProductsScreen from './screens/ProductsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductScreen from './screens/ProductScreen';

import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/store';

const App = () => {
  console.log('dd');
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: '#ffffff',
            headerStyle: {backgroundColor: '#DF2E38'},
          }}>
          <Stack.Screen
            name="Home"
            component={ProductsScreen}
            options={{headerTitle: 'Products'}}
          />
          <Stack.Screen name="Product" component={ProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
