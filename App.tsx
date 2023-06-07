import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {configure, reaction} from 'mobx';

import Router from './src/routes';
import {default as theme} from './custom-theme.json';
import {default as mapping} from './mapping.json';
import {useStores} from './use-store';
import {observer} from 'mobx-react';
import {Logger} from './src/utils/Utils';
import SplashScreen from './src/components/SplashScreen';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {FeatherIconsPack} from './src/components/FeatherIcons';
import moment from 'moment';

configure({
  enforceActions: 'never', // TODO: Enable strict mode
});

const App = observer(() => {
  const {authStore} = useStores();

  reaction(
    () => authStore.token,
    token => {
      Logger.warn('Token changed to:', token);
    },
  );

  reaction(
    () => authStore.user,
    user => {
      Logger.debug('User changed to:', user);
    },
  );

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!authStore.hydrating) {
      setTimeout(() => {
        setShowSplash(false);
      }, 5000);
    }
  }, [authStore.hydrating]);

  return (
    <>
      <IconRegistry icons={[EvaIconsPack, FeatherIconsPack]} />
      <ApplicationProvider
        {...eva}
        customMapping={mapping}
        theme={{...eva.light, ...theme}}>
        {showSplash ? (
          <SplashScreen />
        ) : (
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        )}
      </ApplicationProvider>
    </>
  );
});

export default App;
