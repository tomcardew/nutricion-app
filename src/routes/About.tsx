import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStores} from '../../use-store';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../constants/Screens';
import {
  AboutController,
  AboutViewModel,
  ReleaseNotesController,
  ReleaseNotesViewModel,
} from '../app/modules/about';

const Stack = createNativeStackNavigator();

const AboutRouter = () => {
  const {authStore} = useStores();
  const navigation = useNavigation();

  const aboutViewModel = new AboutViewModel(navigation);
  const releaseNotesViewModel = new ReleaseNotesViewModel(
    navigation,
    authStore,
  );

  const AboutScreen = () => <AboutController viewModel={aboutViewModel} />;

  const ReleaseNotesScreen = () => (
    <ReleaseNotesController viewModel={releaseNotesViewModel} />
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'about'} component={AboutScreen} />
      <Stack.Screen
        name={ScreenNames.ReleaseNotes.toString()}
        component={ReleaseNotesScreen}
      />
    </Stack.Navigator>
  );
};

export default AboutRouter;
