import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import ReleaseNotesViewModel from '../ViewModels/ReleaseNotesViewModel';
import ReleaseNotesView from '../Views/ReleaseNotesView';
import Environment from '../../../../../../constants/Environment';

interface Props {
  viewModel: ReleaseNotesViewModel;
}

const ReleaseNotesController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.getReleaseNotes();
  }, []);

  return (
    <BaseLayoutView
      title="Notas de la versión"
      subtitle={Environment.VERSION}
      loading={viewModel.authStore.loading}
      disableScrollBar
      loadingMessage="Cargando..."
      onBackAction={viewModel.goBack}>
      <ReleaseNotesView copy={viewModel.authStore.releaseNotes} />
    </BaseLayoutView>
  );
});

export default ReleaseNotesController;
