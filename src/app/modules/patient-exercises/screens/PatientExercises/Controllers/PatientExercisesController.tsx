import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientExercisesViewModel from '../ViewModels/PatientExercisesViewModel';
import PatientExercisesView from '../Views/PatientExercisesView';

interface Props {
  viewModel: PatientExercisesViewModel;
}

const PatientExercisesController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.load();
  }, []);

  return (
    <BaseLayoutView
      title="Tus ejercicios"
      loading={false}
      showBackButton={false}
      loadingMessage="Cargando..."
      disableScrollBar
      alert={viewModel.patientsStore.alert}
      onAlertDismiss={viewModel.dismissAlert}
      onBackAction={viewModel.goBack}>
      <PatientExercisesView
        currentDate={viewModel.patientsStore.currentDate}
        data={viewModel.patientsStore.AdminExercises}
        didChangeDate={viewModel.didChangeDate}
        didSelectExercise={viewModel.didSelectExercise}
      />
    </BaseLayoutView>
  );
});

export default PatientExercisesController;
