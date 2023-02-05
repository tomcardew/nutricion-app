import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenNames from '../constants/Screens';
import {useStores} from '../../use-store';
import {useNavigation} from '@react-navigation/native';
import {
  ScheduleViewModel,
  ScheduleController,
  AddScheduleController,
  AddScheduleViewModel,
} from '../app/modules/schedule';

const Stack = createNativeStackNavigator();

const ScheduleRouter = () => {
  const {authStore, scheduleStore} = useStores();
  const navigation = useNavigation();

  const scheduleViewModel = new ScheduleViewModel(
    navigation,
    authStore,
    scheduleStore,
  );

  const addScheduleViewModel = new AddScheduleViewModel(
    navigation,
    authStore,
    scheduleStore,
  );

  const ScheduleScreen = () => (
    <ScheduleController viewModel={scheduleViewModel} />
  );

  const AddScheduleScreen = () => (
    <AddScheduleController viewModel={addScheduleViewModel} />
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenNames.Schedule.toString()}
        component={ScheduleScreen}
      />
      <Stack.Screen
        name={ScreenNames.AddSchedule.toString()}
        component={AddScheduleScreen}
      />
    </Stack.Navigator>
  );
};

export default ScheduleRouter;
