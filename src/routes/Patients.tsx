import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  PatientController,
  PatientDataController,
  PatientExercisesListController,
  PatientsController,
  PatientsViewModel,
} from '../app/modules/patients';
import ScreenNames from '../constants/Screens';
import {useStores} from '../../use-store';
import PatientViewModel from '../app/modules/patients/screens/Patient/ViewModels/PatientViewModel';
import PatientDataViewModel from '../app/modules/patients/screens/PatientData/ViewModels/PatientDataViewModel';
import PatientGalleryController from '../app/modules/patients/screens/PatientGallery/Controllers/PatientGalleryController';
import PatientGalleryViewModel from '../app/modules/patients/screens/PatientGallery/ViewModels/PatientGalleryViewModel';
import {useNavigation} from '@react-navigation/native';
import PatientExercisesViewModel from '../app/modules/patients/screens/PatientExercises/ViewModels/PatientExercisesViewModel';
import PatientExercisesController from '../app/modules/patients/screens/PatientExercises/Controllers/PatientExercisesController';

const Stack = createNativeStackNavigator();

const PatientsRouter = () => {
  const {patientsStore, authStore} = useStores();
  const navigation = useNavigation();

  const patientsViewModel = new PatientsViewModel(
    patientsStore,
    authStore,
    navigation,
  );
  const patientViewModel = new PatientViewModel(
    patientsStore,
    authStore,
    navigation,
  );
  const patientDataViewModel = new PatientDataViewModel(
    authStore,
    patientsStore,
    navigation,
  );
  const patientGalleryViewModel = new PatientGalleryViewModel(
    patientsStore,
    authStore,
    navigation,
  );
  const patientExercisesListViewModel = new PatientExercisesViewModel(
    authStore,
    patientsStore,
  );
  const patientExercisesViewModel = new PatientExercisesViewModel(
    authStore,
    patientsStore,
  );

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

  const PatientExercisesListScreen = () => (
    <PatientExercisesListController viewModel={patientExercisesListViewModel} />
  );

  const PatientExercisesScreen = () => (
    <PatientExercisesController viewModel={patientExercisesViewModel} />
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
      <Stack.Screen
        name={ScreenNames.PatientExercisesList.toString()}
        component={PatientExercisesListScreen}
      />
      <Stack.Screen
        name={ScreenNames.PatientExercises.toString()}
        component={PatientExercisesScreen}
      />
    </Stack.Navigator>
  );
};

export default PatientsRouter;
