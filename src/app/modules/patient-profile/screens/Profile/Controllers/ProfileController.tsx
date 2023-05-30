import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import ProfileViewModel from '../ViewModels/ProfileViewModel';
import ProfileView from '../Views/ProfileView';
import {Logger} from '../../../../../../utils/Utils';

interface Props {
  viewModel: ProfileViewModel;
}

const ProfileController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.load();
  }, []);

  return (
    <BaseLayoutView
      hideHeader
      backgroundColor="red"
      loading={viewModel.profileStore.loading}
      loadingMessage="Cargando..."
      alert={viewModel.profileStore.alert}
      onAlertDismiss={viewModel.dismissAlert}
      onBackAction={viewModel.goBack}>
      <ProfileView
        profile={viewModel.authStore.user}
        enableSteps={viewModel.profileStore.isGoogleFitAuthorized}
        onEditProfilePress={viewModel.showEditingOptions}
        onLogout={viewModel.logout}
        didPressGoToProgress={viewModel.goToProgress}
        didPressSeeDiet={viewModel.didPressSeeDiet}
        didPressSeeVersion={viewModel.didPressSeeVersion}
        stepCount={viewModel.profileStore.stepCount}
      />
    </BaseLayoutView>
  );
});

export default ProfileController;
