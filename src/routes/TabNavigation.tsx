import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@ui-kitten/components';

import {useStores} from '../../use-store';

import {SignupController, SignupViewModel} from '../app/modules/auth';
import {ProfileController, ProfileViewModel} from '../app/modules/profile';

import {default as theme} from '../../custom-theme.json';
import PatientsRouter from './Patients';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const {registerStore, authStore, profileStore} = useStores();

  const SignupScreen = () => (
    <SignupController viewModel={new SignupViewModel(registerStore)} />
  );

  const ProfileScreen = () => (
    <ProfileController
      viewModel={new ProfileViewModel(authStore, profileStore)}
    />
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="pacients"
        options={{
          tabBarLabel: 'Pacientes',
          tabBarIcon: ({color, size}) => (
            <Icon
              style={{width: size, height: size}}
              fill={color}
              name="people-outline"
            />
          ),
          tabBarActiveTintColor: theme['color-primary-600'],
        }}
        component={PatientsRouter}
      />
      <Tab.Screen
        name="profile"
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({color, size}) => (
            <Icon
              style={{width: size, height: size}}
              fill={color}
              name="home-outline"
            />
          ),
          tabBarActiveTintColor: theme['color-primary-600'],
        }}
        component={ProfileScreen}
      />
      <Tab.Screen
        name="dates"
        options={{
          tabBarLabel: 'Citas',
          tabBarIcon: ({color, size}) => (
            <Icon
              style={{width: size, height: size}}
              fill={color}
              name="calendar-outline"
            />
          ),
          tabBarActiveTintColor: theme['color-primary-600'],
        }}
        component={SignupScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
