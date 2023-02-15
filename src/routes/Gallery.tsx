import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStores} from '../../use-store';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../constants/Screens';
import {
  GalleryController,
  GalleryViewModel,
} from '../app/modules/patient-gallery';

const Stack = createNativeStackNavigator();

const GalleryRouter = () => {
  const {patientsStore, authStore} = useStores();
  const navigation = useNavigation();

  const galleryViewModel = new GalleryViewModel(
    navigation,
    authStore,
    patientsStore,
  );

  const GalleryScreen = () => (
    <GalleryController viewModel={galleryViewModel} />
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenNames.Gallery.toString()}
        component={GalleryScreen}
      />
    </Stack.Navigator>
  );
};

export default GalleryRouter;
