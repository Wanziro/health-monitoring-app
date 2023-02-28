import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import Navigation from './src/navigation';
import {AlertNotificationRoot} from 'react-native-alert-notification';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function App(): JSX.Element {
  return (
    <AlertNotificationRoot>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </AlertNotificationRoot>
  );
}

export default App;
