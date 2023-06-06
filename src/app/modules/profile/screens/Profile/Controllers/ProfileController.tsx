import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import ProfileView from '../Views/ProfileView';
import ProfileViewModel from '../ViewModels/ProfileViewModel';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';

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
      loadingMessage="Cargando..."
      loading={viewModel.profileStore.loading}
      alert={viewModel.profileStore.alert}
      showBackButton={false}
      onAlertDismiss={viewModel.dismissAlert}>
      <ProfileView
        fullname={viewModel.authStore.user?.nombre || ''}
        cover="https://alianzapronutricion.org/wp-content/uploads/2020/10/epigenetica-y-nutricion-1.png"
        profilePicture={viewModel.authStore.user?.urlFoto}
        upcomingDates={viewModel.profileStore.pendingDates}
        onEditProfilePress={viewModel.showEditingOptions}
        onLogout={viewModel.logout}
      />
    </BaseLayoutView>
  );
});

export default ProfileController;
