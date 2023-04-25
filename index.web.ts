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
  `Techstop Mobile`,
  'resizable=no,width=420,height=870',
);
