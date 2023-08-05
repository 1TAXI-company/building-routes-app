import { AppRegistry } from 'react-native';
import { YaMap, Geocoder } from 'react-native-yamap';
import { Provider } from 'react-redux';
import App from './src/app/app';
import { name as appName } from './app.json';
import { store } from './src/app/store';

Geocoder.init('0ca4b092-6ea9-4f6b-9ef8-3a55d107062b');
YaMap.init('df293b24-7ee5-45f7-8e57-7d9cf072376a');
YaMap.resetLocale();

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <App />
  </Provider>
));
