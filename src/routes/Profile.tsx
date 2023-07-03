import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenNames from '../constants/Screens';
import {useStores} from '../../use-store';
import {useNavigation} from '@react-navigation/native';
import {
  ProfileController as AdminProfileController,
  ProfileViewModel as AdminProfileViewModel,
} from '../app/modules/profile';
import {
  PatientProgressController,
  PatientProgressViewModel,
  ProfileController as PatientProfileController,
  ProfileViewModel as PatientProfileViewModel,
  PatientDietController,
  PatientDietViewModel,
  SinglePatientGoalsController,
  SinglePatientGoalsViewModel,
} from '../app/modules/patient-profile';
import AboutRouter from './About';

const Stack = createNativeStackNavigator();

interface Props {
  isAdmin?: boolean;
}

const ProfileRouter = ({isAdmin = true}: Props) => {
  const {authStore, profileStore} = useStores();
  const navigation = useNavigation();

  const adminProfileViewModel = new AdminProfileViewModel(
    authStore,
    profileStore,
  );

  const patientProfileViewModel = new PatientProfileViewModel(
    authStore,
    profileStore,
  );

  const patientProgressProfileViewModel = new PatientProgressViewModel(
    navigation,
    authStore,
    profileStore,
  );

  const patientDietViewModel = new PatientDietViewModel(
    navigation,
    authStore,
    profileStore,
  );

  const singlePatientGoalsViewModel = new SinglePatientGoalsViewModel(
    navigation,
    authStore,
    profileStore,
  );

  const AdminProfileScreen = () => (
    <AdminProfileController viewModel={adminProfileViewModel} />
  );

  const PatientProfileScreen = () => (
    <PatientProfileController viewModel={patientProfileViewModel} />
  );

  const PatientProgressScreen = () => (
    <PatientProgressController viewModel={patientProgressProfileViewModel} />
  );

  const PatientDietScreen = () => (
    <PatientDietController viewModel={patientDietViewModel} />
  );

  const SinglePatientGoalsScreen = () => (
    <SinglePatientGoalsController viewModel={singlePatientGoalsViewModel} />
  );

  const initialScreen = isAdmin
    ? ScreenNames.Profile
    : ScreenNames.PatientProfile;

  return (
    <Stack.Navigator
      initialRouteName={initialScreen.toString()}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenNames.Profile.toString()}
        component={AdminProfileScreen}
      />
      <Stack.Screen
        name={ScreenNames.PatientProfile.toString()}
        component={PatientProfileScreen}
      />
      <Stack.Screen
        name={ScreenNames.PatientProgress.toString()}
        component={PatientProgressScreen}
      />
      <Stack.Screen
        name={ScreenNames.PatientDiet.toString()}
        component={PatientDietScreen}
      />
      <Stack.Screen
        name={ScreenNames.About.toString()}
        component={AboutRouter}
      />
      <Stack.Screen
        name={ScreenNames.SinglePatientGoals.toString()}
        component={SinglePatientGoalsScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileRouter;
