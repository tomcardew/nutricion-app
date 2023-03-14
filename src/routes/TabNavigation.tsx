import React, {useEffect, useState} from 'react';
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
import {useStores} from '../../use-store';
import {Logger} from '../utils/Utils';
import {View} from 'react-native';
import Text from '../components/Text';
import InitializingOverlay from '../components/InitializingOverlay';

const Tab = createBottomTabNavigator();

interface State {
  isAdmin: boolean | undefined;
  exercisesEnabled: boolean | undefined;
  loaded: boolean | undefined;
}

const TabNavigation = observer(() => {
  const {authStore} = useStores();

  const [state, setState] = useState<State>({
    isAdmin: true,
    exercisesEnabled: false,
    loaded: false,
  });

  useEffect(() => {
    if (!authStore.user) {
      setTimeout(() => {
        setUpState();
      }, 3000);
    } else {
      setUpState();
    }
  }, []);

  const setUpState = () => {
    setState({
      isAdmin: authStore.user?.esAdministrador,
      exercisesEnabled: authStore.user?.seccion_ejercicios,
      loaded: true,
    });
  };

  const ProfileScreens = () => <ProfileRouter isAdmin={state.isAdmin} />;

  if (!state.loaded) return <InitializingOverlay />;

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
      {(state.isAdmin || state.exercisesEnabled) && (
        <Tab.Screen
          name="patients"
          options={{
            tabBarLabel: state.isAdmin ? 'Pacientes' : 'Ejercicios',
            tabBarIcon: ({color, size}) => (
              <Icon
                style={{width: size, height: size}}
                fill={color}
                name={state.isAdmin ? 'people-outline' : 'list-outline'}
              />
            ),
            tabBarActiveTintColor: theme['color-primary-600'],
          }}
          component={state.isAdmin ? PatientsRouter : ExercisesRouter}
        />
      )}
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
        component={state.isAdmin ? ScheduleRouter : PatientScheduleRouter}
      />
      {!state.isAdmin && (
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
