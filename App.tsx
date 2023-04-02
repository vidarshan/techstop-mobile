import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/store';
import ProductsScreen from './screens/ProductsScreen';
import {navigationRef} from './RootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Screen
          name="Initial"
          component={ProductsScreen}
          options={{headerShown: false, gestureEnabled: true}}
        />
      </NavigationContainer>
    </Provider>
  );
};

// const styles = StyleSheet.create({});

export default App;
