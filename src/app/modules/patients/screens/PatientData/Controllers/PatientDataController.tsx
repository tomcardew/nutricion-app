import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientDataViewModel from '../ViewModels/PatientDataViewModel';
import PatientDataView from '../Views/PatientDataView';

interface Props {
  viewModel: PatientDataViewModel;
}

const PatientDataController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.load();
  }, []);

  return (
    <BaseLayoutView
      title="Datos del paciente"
      loadingMessage="Cargando..."
      loading={viewModel.patientsStore.loading}
      disableScrollBar
      onBackAction={viewModel.goBack}
      onAlertDismiss={() => {}}>
      <PatientDataView data={viewModel.patientsStore.patientProgress} />
    </BaseLayoutView>
  );
});

export default PatientDataController;
