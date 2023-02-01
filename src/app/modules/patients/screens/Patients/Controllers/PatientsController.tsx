import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientsView from '../Views/PatientsView';
import PatientsViewModel from '../ViewModels/PatientsViewModel';

interface Props {
  viewModel: PatientsViewModel;
}

const PatientsController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.load();
  }, []);

  return (
    <BaseLayoutView
      title="Mis Pacientes"
      loadingMessage="Cargando..."
      loading={viewModel.patientsStore.loading}
      alert={viewModel.patientsStore.alert}
      showBackButton={false}
      disableScrollBar
      onAlertDismiss={() => {}}>
      <PatientsView
        data={viewModel.patientsStore.patients}
        query={viewModel.patientsStore.query}
        didChangeQuery={undefined}
        onPatientPress={viewModel.goToPatient}
        onReload={viewModel.load}
      />
    </BaseLayoutView>
  );
});

export default PatientsController;
