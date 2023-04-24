import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
window.open(
  'https://booking-app-tu3v.onrender.com',
  'mywindow',
  'menubar=0,resizable=1,width=408,height=844',
);
