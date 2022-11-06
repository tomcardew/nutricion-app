import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStores} from '../use-store';
import ScreenNames from './constants/Screens';

import {
  LoginController,
  LoginViewModel,
  SignupController,
  SignupViewModel,
  ForgotPasswordController,
  ForgotPasswordViewModel,
} from './app/modules/auth';

const Stack = createNativeStackNavigator();

const Router = () => {
  const {loginStore, registerStore} = useStores();

  const LoginScreen = () => (
    <LoginController viewModel={new LoginViewModel(loginStore)} />
  );

  const SignupScreen = () => (
    <SignupController viewModel={new SignupViewModel(registerStore)} />
  );

  const ForgotPasswordScreen = () => (
    <ForgotPasswordController
      viewModel={new ForgotPasswordViewModel(loginStore)}
    />
  );

  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}>
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
    </Stack.Navigator>
  );
};

export default Router;
