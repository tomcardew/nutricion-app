import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStores} from '../../use-store';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../constants/Screens';
import {
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

  const patientExercisesViewModel = new PatientExercisesViewModel(
    navigation,
    authStore,
    patientsStore,
  );

  const adminExerciseDetailsViewModel = new AdminExerciseDetailsViewModel(
    navigation,
    patientsStore,
    authStore,
  );

  const PatientExercisesScreen = () => (
    <PatientExercisesController viewModel={patientExercisesViewModel} />
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
    </Stack.Navigator>
  );
};

export default ExercisesRouter;
