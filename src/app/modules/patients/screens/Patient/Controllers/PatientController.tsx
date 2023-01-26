import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientViewModel from '../ViewModels/PatientViewModel';
import PatientView from '../Views/PatientView';
import {Patient} from '../../../../../../models/Patients';

interface Props {
  viewModel: PatientViewModel;
}

const PatientController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.load();
  }, []);

  return (
    <BaseLayoutView
      title={
        viewModel.patientsStore.selectedPatient
          ? viewModel.patientsStore.selectedPatient.nombre
          : 'Paciente'
      }
      loadingMessage="Cargando..."
      loading={viewModel.patientsStore.loading}
      alert={null}
      disableScrollBar
      onAlertDismiss={() => {}}
      onBackAction={viewModel.goBack}>
      <PatientView
        data={viewModel.patientsStore.selectedPatient}
        onToggleExercises={viewModel.toggleExercises}
        onNavigateTo={viewModel.navigateTo}
      />
    </BaseLayoutView>
  );
});

export default PatientController;
