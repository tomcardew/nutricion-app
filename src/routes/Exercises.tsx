import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStores} from '../../use-store';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../constants/Screens';
import {
  PatientExerciseCommentsController,
  PatientExerciseCommentsViewModel,
  PatientExercisesController,
  PatientExercisesViewModel,
} from '../app/modules/patient-exercises';
import {
  AdminExerciseDetailsController,
  AdminExerciseDetailsViewModel,
} from '../app/modules/patients';

const Stack = createNativeStackNavigator();

const ExercisesRouter = () => {
  const {patientsStore, authStore} = useStores();
  const navigation = useNavigation();

  // MARK: - Patient Screens

  const patientExercisesViewModel = new PatientExercisesViewModel(
    navigation,
    authStore,
    patientsStore,
  );

  const PatientExercisesScreen = () => (
    <PatientExercisesController viewModel={patientExercisesViewModel} />
  );

  const patientExerciseCommentsViewModel = new PatientExerciseCommentsViewModel(
    navigation,
    authStore,
    patientsStore,
  );

  const PatientExerciseCommentsScreen = () => (
    <PatientExerciseCommentsController
      viewModel={patientExerciseCommentsViewModel}
    />
  );

  // MARK: - Admin Screens

  const adminExerciseDetailsViewModel = new AdminExerciseDetailsViewModel(
    navigation,
    patientsStore,
    authStore,
  );

  const AdminExerciseDetailsScreen = () => (
    <AdminExerciseDetailsController viewModel={adminExerciseDetailsViewModel} />
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenNames.PatientExercises.toString()}
        component={PatientExercisesScreen}
      />
      <Stack.Screen
        name={ScreenNames.AdminExerciseDetails.toString()}
        component={AdminExerciseDetailsScreen}
      />
      <Stack.Screen
        name={ScreenNames.PatientExerciseComments.toString()}
        component={PatientExerciseCommentsScreen}
      />
    </Stack.Navigator>
  );
};

export default ExercisesRouter;
