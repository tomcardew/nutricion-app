import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {default as theme} from './custom-theme.json';
import {default as mapping} from './mapping.json';

import Router from './src/router';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {configure} from 'mobx';

configure({
  enforceActions: 'never', // TODO: Enable strict mode
});

const App = () => {
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
};

export default App;
