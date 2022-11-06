import React from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import ForgotPasswordViewModel from '../ViewModels/ForgotPasswordViewModel';
import ForgotPasswordView from '../Views/ForgotPasswordView';

interface Props {
  viewModel: ForgotPasswordViewModel;
}

const ForgotPasswordController = observer(({viewModel}: Props) => {
  return (
    <BaseLayoutView
      title="Olvidé mi contraseña"
      loading={viewModel.store.loading}
      loadingMessage=""
      alert={viewModel.store.alert}
      onAlertDismiss={viewModel.dismissAlert}
      onBackAction={viewModel.goBack}>
      <ForgotPasswordView
        email={viewModel.store.email}
        didChangeEmail={viewModel.didChangeEmail}
        onSendPress={viewModel.sendEmail}
      />
    </BaseLayoutView>
  );
});

export default ForgotPasswordController;
