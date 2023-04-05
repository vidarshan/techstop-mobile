// import * as React from 'react';
import ProductsScreen from './screens/ProductsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductScreen from './screens/ProductScreen';

// const WebApp = () => {
//   const Stack = createNativeStackNavigator();
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={ProductsScreen} />
//         <Stack.Screen name="Product" component={ProductScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default WebApp;

import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/store';

const App = () => {
  console.log('dd');
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ProductsScreen} />
          <Stack.Screen name="Product" component={ProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
