import React, {useState} from 'react';
import SignupView from '../Views/SignupView';
import {observer} from 'mobx-react';
import SignupViewModel from '../ViewModels/SignupViewModel';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import {DatePickerModal} from '../../../../../../components/Inputs';

interface Props {
  viewModel: SignupViewModel;
}

const SignupController = observer(({viewModel}: Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <BaseLayoutView
      title="Registrarse"
      alert={viewModel.store.error}
      loading={viewModel.store.loading}
      loadingMessage="Creando tu cuenta..."
      onAlertDismiss={viewModel.dismissAlert}
      overlay={
        showDatePicker ? (
          <DatePickerModal
            mode="calendar"
            onClose={() => setShowDatePicker(false)}
            onSelectedDate={viewModel.didChangeDate}
          />
        ) : undefined
      }
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
        didPressChangeDate={() => setShowDatePicker(true)}
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
