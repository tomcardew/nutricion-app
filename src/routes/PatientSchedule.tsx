import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenNames from '../constants/Screens';
import {useStores} from '../../use-store';
import {useNavigation} from '@react-navigation/native';
import {
  PatientScheduleController,
  PatientScheduleViewModel,
} from '../app/modules/patient-schedule';

const Stack = createNativeStackNavigator();

const PatientScheduleRouter = () => {
  const {authStore, scheduleStore} = useStores();
  const navigation = useNavigation();

  const patientScheduleViewModel = new PatientScheduleViewModel(
    navigation,
    authStore,
    scheduleStore,
  );

  const PatientScheduleScreen = () => (
    <PatientScheduleController viewModel={patientScheduleViewModel} />
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenNames.PatientSchedule.toString()}
        component={PatientScheduleScreen}
      />
    </Stack.Navigator>
  );
};

export default PatientScheduleRouter;
