import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {configure, reaction} from 'mobx';

import Router from './src/routes';
import {default as theme} from './custom-theme.json';
import {default as mapping} from './mapping.json';
import {useStores} from './use-store';
import {Text, View} from 'react-native';
import {observer} from 'mobx-react';
import {Logger} from './src/utils/Utils';

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

  if (authStore.hydrating) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Cargando...</Text>
      </View>
    );
  }
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        customMapping={mapping}
        theme={{...eva.light, ...theme}}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
});

export default App;
