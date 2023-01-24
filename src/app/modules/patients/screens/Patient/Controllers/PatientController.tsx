import React from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientViewModel from '../ViewModels/PatientViewModel';
import PatientView from '../Views/PatientView';

interface Props {
  viewModel: PatientViewModel;
}

const PatientController = observer(({viewModel}: Props) => {
  return (
    <BaseLayoutView
      title={viewModel.patientsStore.selectedPatient?.name}
      loadingMessage="Cargando..."
      loading={false}
      alert={null}
      onAlertDismiss={() => {}}>
      <PatientView data={viewModel.patientsStore.selectedPatient} />
    </BaseLayoutView>
  );
});

export default PatientController;
