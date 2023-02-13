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
      title="PatientProgress"
      loading={false}
      loadingMessage="Cargando..."
      onBackAction={viewModel.goBack}>
      <PatientProgressView />
    </BaseLayoutView>
  );
});

export default PatientProgressController;
