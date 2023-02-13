import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientViewModel from '../ViewModels/PatientViewModel';
import PatientView from '../Views/PatientView';

interface Props {
  viewModel: PatientViewModel;
}

const PatientController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.load();

    return () => {
      viewModel.unload();
    };
  }, []);

  return (
    <BaseLayoutView
      title={
        viewModel.patientsStore.selectedPatient
          ? viewModel.patientsStore.selectedPatient.nombre
          : 'Paciente'
      }
      subtitle={viewModel.patientsStore.selectedPatient?.email}
      loadingMessage="Cargando..."
      loading={viewModel.patientsStore.loading}
      alert={null}
      disableScrollBar
      showBackButton
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
