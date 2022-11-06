import React from 'react';
import SignupView from '../Views/SignupView';
import {observer} from 'mobx-react';
import SignupViewModel from '../ViewModels/SignupViewModel';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';

interface Props {
  viewModel: SignupViewModel;
}

const SignupController = observer(({viewModel}: Props) => {
  return (
    <BaseLayoutView
      title="Registrarse"
      alert={viewModel.store.error}
      loading={viewModel.store.loading}
      loadingMessage="Creando tu cuenta..."
      onAlertDismiss={viewModel.dismissAlert}
      onBackAction={viewModel.goBack}>
      <SignupView
        name={viewModel.store.name}
        date={viewModel.store.birthdate}
        genderSelectedIndex={viewModel.store.gender}
        genderSelectedValue={viewModel.store.genderText}
        email={viewModel.store.email}
        password={viewModel.store.password}
        passwordConfirmation={viewModel.store.passwordConfirmation}
        didChangeName={viewModel.didChangeName}
        didChangeDate={viewModel.didChangeDate}
        didChangeGender={viewModel.didChangeGender}
        didChangeEmail={viewModel.didChangeEmail}
        didChangePassword={viewModel.didChangePassword}
        didChangePasswordConfirmation={viewModel.didChangePasswordConfirmation}
        onRegisterPress={viewModel.registerUser}
      />
    </BaseLayoutView>
  );
});

export default SignupController;
