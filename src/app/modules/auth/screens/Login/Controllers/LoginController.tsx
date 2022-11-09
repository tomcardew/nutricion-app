import React from 'react';
import LoginView from '../Views/LoginView';
import { observer } from 'mobx-react';
import LoginViewModel from '../ViewModels/LoginViewModel';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';

interface Props {
  viewModel: LoginViewModel;
}

const LoginController = observer(({ viewModel }: Props) => {
  return (
    <BaseLayoutView
      hideHeader
      showOverSafeArea
      loadingMessage="Iniciando sesión..."
      loading={viewModel.loginStore.logingIn}
      alert={viewModel.loginStore.error}
      onAlertDismiss={viewModel.dismissAlert}>
      <LoginView
        email={viewModel.loginStore.email}
        password={viewModel.loginStore.password}
        onLoginPress={viewModel.login}
        onRegisterPress={viewModel.goToRegister}
        onForgotPasswordPress={viewModel.goToForgotPassword}
        didChangeEmail={viewModel.didChangeEmail}
        didChangePassword={viewModel.didChangePassword}
      />
    </BaseLayoutView>
  );
});

export default LoginController;
