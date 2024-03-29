import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  PatientController,
  PatientDataController,
  AdminExercisesListController,
  PatientsController,
  PatientsViewModel,
  AdminExercisesListViewModel,
  AdminExercisesViewModel,
  AdminExerciseDetailsViewModel,
  AdminExerciseDetailsController,
  PatientGoalsViewModel,
  PatientGoalsController,
} from '../app/modules/patients';
import ScreenNames from '../constants/Screens';
import {useStores} from '../../use-store';
import PatientViewModel from '../app/modules/patients/screens/Patient/ViewModels/PatientViewModel';
import PatientDataViewModel from '../app/modules/patients/screens/PatientData/ViewModels/PatientDataViewModel';
import PatientGalleryController from '../app/modules/patients/screens/PatientGallery/Controllers/PatientGalleryController';
import PatientGalleryViewModel from '../app/modules/patients/screens/PatientGallery/ViewModels/PatientGalleryViewModel';
import {useNavigation} from '@react-navigation/native';
import AdminExercisesController from '../app/modules/patients/screens/AdminExercises/Controllers/AdminExercisesController';
import PatientDataEditorViewModel from '../app/modules/patients/screens/PatientDataEditor/ViewModels/PatientDataEditorViewModel';
import PatientDataEditorController from '../app/modules/patients/screens/PatientDataEditor/Controllers/PatientDataEditorController';
import {
  PatientExerciseCommentsController,
  PatientExerciseCommentsViewModel,
} from '../app/modules/patient-exercises';

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
  const patientDataEditorViewModel = new PatientDataEditorViewModel(
    authStore,
    patientsStore,
    navigation,
  );
  const patientGalleryViewModel = new PatientGalleryViewModel(
    patientsStore,
    authStore,
    navigation,
  );
  const adminExercisesListViewModel = new AdminExercisesListViewModel(
    authStore,
    patientsStore,
    navigation,
  );
  const adminExercisesViewModel = new AdminExercisesViewModel(
    authStore,
    patientsStore,
  );

  const adminExerciseDetailsViewModel = new AdminExerciseDetailsViewModel(
    navigation,
    patientsStore,
    authStore,
  );

  const patientExerciseCommentsViewModel = new PatientExerciseCommentsViewModel(
    navigation,
    authStore,
    patientsStore,
  );

  const patientGoalsViewModel = new PatientGoalsViewModel(
    navigation,
    authStore,
    patientsStore,
  );

  const PatientExerciseCommentsScreen = () => (
    <PatientExerciseCommentsController
      viewModel={patientExerciseCommentsViewModel}
    />
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

  const PatientDataEditorScreen = () => (
    <PatientDataEditorController viewModel={patientDataEditorViewModel} />
  );

  const PatientGalleryScreen = () => (
    <PatientGalleryController viewModel={patientGalleryViewModel} />
  );

  const PatientGoalsScreen = () => (
    <PatientGoalsController viewModel={patientGoalsViewModel} />
  );

  const AdminExercisesListScreen = () => (
    <AdminExercisesListController viewModel={adminExercisesListViewModel} />
  );

  const AdminExercisesScreen = () => (
    <AdminExercisesController viewModel={adminExercisesViewModel} />
  );

  const AdminExerciseDetailsScreen = () => (
    <AdminExerciseDetailsController viewModel={adminExerciseDetailsViewModel} />
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
        name={ScreenNames.PatientDataEditor.toString()}
        component={PatientDataEditorScreen}
      />
      <Stack.Screen
        name={ScreenNames.PatientGallery.toString()}
        component={PatientGalleryScreen}
      />
      <Stack.Screen
        name={ScreenNames.AdminExercisesList.toString()}
        component={AdminExercisesListScreen}
      />
      <Stack.Screen
        name={ScreenNames.AdminExercises.toString()}
        component={AdminExercisesScreen}
      />
      <Stack.Screen
        name={ScreenNames.AdminExerciseDetails.toString()}
        component={AdminExerciseDetailsScreen}
      />
      <Stack.Screen
        name={ScreenNames.PatientExerciseComments.toString()}
        component={PatientExerciseCommentsScreen}
      />
      <Stack.Screen
        name={ScreenNames.PatientGoals.toString()}
        component={PatientGoalsScreen}
      />
    </Stack.Navigator>
  );
};

export default PatientsRouter;
