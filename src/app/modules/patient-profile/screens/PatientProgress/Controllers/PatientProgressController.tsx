import React from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientProgressViewModel from '../ViewModels/PatientProgressViewModel';
import PatientProgressView from '../Views/PatientProgressView';

interface Props {
  viewModel: PatientProgressViewModel;
}

const PatientProgressController = observer(({viewModel}: Props) => {
  return (
    <BaseLayoutView
      title="Tu Progreso"
      loading={false}
      loadingMessage="Cargando..."
      disableScrollBar
      onBackAction={viewModel.goBack}>
      <PatientProgressView
        data={viewModel.authStore.dataset}
        refreshing={viewModel.profileStore.loading}
        onRefresh={viewModel.load}
      />
    </BaseLayoutView>
  );
});

export default PatientProgressController;
