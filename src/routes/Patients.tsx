import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  PatientController,
  PatientDataController,
  PatientsController,
  PatientsViewModel,
} from '../app/modules/patients';
import ScreenNames from '../constants/Screens';
import {useStores} from '../../use-store';
import PatientViewModel from '../app/modules/patients/screens/Patient/ViewModels/PatientViewModel';
import PatientDataViewModel from '../app/modules/patients/screens/PatientData/ViewModels/PatientDataViewModel';
import PatientGalleryController from '../app/modules/patients/screens/PatientGallery/Controllers/PatientGalleryController';
import PatientGalleryViewModel from '../app/modules/patients/screens/PatientGallery/ViewModels/PatientGalleryViewModel';

const Stack = createNativeStackNavigator();

const PatientsRouter = () => {
  const {patientsStore, authStore} = useStores();

  const patientsViewModel = new PatientsViewModel(patientsStore, authStore);
  const patientViewModel = new PatientViewModel(patientsStore, authStore);
  const patientDataViewModel = new PatientDataViewModel(
    authStore,
    patientsStore,
  );
  const patientGalleryViewModel = new PatientGalleryViewModel();

  const PatientsScreen = () => (
    <PatientsController viewModel={patientsViewModel} />
  );

  const PatientScreen = () => (
    <PatientController viewModel={patientViewModel} />
  );

  const PatientDataScreen = () => (
    <PatientDataController viewModel={patientDataViewModel} />
  );

  const PatientGalleryScreen = () => (
    <PatientGalleryController viewModel={patientGalleryViewModel} />
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenNames.Patients.toString()}
        component={PatientsScreen}
      />
      <Stack.Screen
        name={ScreenNames.Patient.toString()}
        component={PatientScreen}
      />
      <Stack.Screen
        name={ScreenNames.PatientData.toString()}
        component={PatientDataScreen}
      />
      <Stack.Screen
        name={ScreenNames.PatientGallery.toString()}
        component={PatientGalleryScreen}
      />
    </Stack.Navigator>
  );
};

export default PatientsRouter;
