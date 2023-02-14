import React, {Profiler} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@ui-kitten/components';

import {useStores} from '../../use-store';

import {default as theme} from '../../custom-theme.json';
import PatientsRouter from './Patients';
import ScheduleRouter from './Schedule';
import {observer} from 'mobx-react';
import ProfileRouter from './Profile';

const Tab = createBottomTabNavigator();

interface Props {
  isAdmin?: boolean;
}

const TabNavigation = observer(({isAdmin = true}: Props) => {
  const ProfileScreens = () => <ProfileRouter isAdmin={isAdmin} />;

  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        headerShown: false,
      }}>
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
        component={ProfileScreens}
      />
      <Tab.Screen
        name="pacients"
        options={{
          tabBarLabel: isAdmin ? 'Pacientes' : 'Ejercicios',
          tabBarIcon: ({color, size}) => (
            <Icon
              style={{width: size, height: size}}
              fill={color}
              name={isAdmin ? 'people-outline' : 'list-outline'}
            />
          ),
          tabBarActiveTintColor: theme['color-primary-600'],
        }}
        component={PatientsRouter}
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
        component={ScheduleRouter}
      />
    </Tab.Navigator>
  );
});

export default TabNavigation;
