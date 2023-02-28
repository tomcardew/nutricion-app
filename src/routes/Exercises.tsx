import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStores} from '../../use-store';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../constants/Screens';
import {
  PatientExercisesController,
  PatientExercisesViewModel,
} from '../app/modules/patient-exercises';

const Stack = createNativeStackNavigator();

const ExercisesRouter = () => {
  const {patientsStore, authStore} = useStores();
  const navigation = useNavigation();

  const patientExercisesViewModel = new PatientExercisesViewModel(
    navigation,
    authStore,
    patientsStore,
  );

  const PatientExercisesScreen = () => (
    <PatientExercisesController viewModel={patientExercisesViewModel} />
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenNames.PatientExercises.toString()}
        component={PatientExercisesScreen}
      />
    </Stack.Navigator>
  );
};

export default ExercisesRouter;
