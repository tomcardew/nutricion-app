import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStores} from '../../use-store';
import ScreenNames from '../constants/Screens';
import TabNavigation from './TabNavigation';
import {observer} from 'mobx-react';

import {
  LoginController,
  LoginViewModel,
  SignupController,
  SignupViewModel,
  ForgotPasswordController,
  ForgotPasswordViewModel,
} from '../app/modules/auth';

const Stack = createNativeStackNavigator();

const Router = observer(() => {
  const {loginStore, registerStore, authStore} = useStores();

  const LoginScreen = () => (
    <LoginController viewModel={new LoginViewModel(loginStore, authStore)} />
  );

  const SignupScreen = () => (
    <SignupController viewModel={new SignupViewModel(registerStore)} />
  );

  const ForgotPasswordScreen = () => (
    <ForgotPasswordController
      viewModel={new ForgotPasswordViewModel(loginStore)}
    />
  );

  const TabNavigationScreen = () => (
    <TabNavigation isAdmin={authStore.user?.esAdministrador} />
  );

  return (
    <Stack.Navigator
      initialRouteName={
        authStore.token
          ? ScreenNames.Dashboard.toString()
          : ScreenNames.Login.toString()
      }
      screenOptions={{
        headerShown: false,
      }}>
      {!authStore.token ? (
        <Stack.Group>
          <Stack.Screen
            name={ScreenNames.Login.toString()}
            component={LoginScreen}
          />
          <Stack.Screen
            name={ScreenNames.Signup.toString()}
            component={SignupScreen}
          />
          <Stack.Screen
            name={ScreenNames.ForgotPassword.toString()}
            component={ForgotPasswordScreen}
          />
        </Stack.Group>
      ) : (
        <Stack.Screen
          name={ScreenNames.Dashboard.toString()}
          component={TabNavigationScreen}
        />
      )}
    </Stack.Navigator>
  );
});

export default Router;
