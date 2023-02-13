import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import ProfileView from '../Views/ProfileView';
import ProfileViewModel from '../ViewModels/ProfileViewModel';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import {Logger} from '../../../../../../utils/Utils';

interface Props {
  viewModel: ProfileViewModel;
}

const ProfileController = observer(({viewModel}: Props) => {
  useEffect(() => {
    Logger.warn('AdminProfileController.tsx:14');
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
        onEditProfilePress={viewModel.showEditingOptions}
      />
    </BaseLayoutView>
  );
});

export default ProfileController;
