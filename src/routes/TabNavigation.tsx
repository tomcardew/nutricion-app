import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@ui-kitten/components';
import {default as theme} from '../../custom-theme.json';
import PatientsRouter from './Patients';
import ScheduleRouter from './Schedule';
import {observer} from 'mobx-react';
import ProfileRouter from './Profile';
import ExercisesRouter from './Exercises';
import GalleryRouter from './Gallery';
import PatientScheduleRouter from './PatientSchedule';

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
        name="patients"
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
        component={isAdmin ? PatientsRouter : ExercisesRouter}
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
        component={isAdmin ? ScheduleRouter : PatientScheduleRouter}
      />
      {!isAdmin && (
        <Tab.Screen
          name="gallery"
          options={{
            tabBarLabel: 'Galería',
            tabBarIcon: ({color, size}) => (
              <Icon
                style={{width: size, height: size}}
                fill={color}
                name="image-outline"
              />
            ),
            tabBarActiveTintColor: theme['color-primary-600'],
          }}
          component={GalleryRouter}
        />
      )}
    </Tab.Navigator>
  );
});

export default TabNavigation;
