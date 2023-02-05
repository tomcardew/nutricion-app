import React from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientExercisesListViewModel from '../ViewModels/PatientExercisesListViewModel';
import PatientExercisesListView from '../Views/PatientExercisesListView';

interface Props {
  viewModel: PatientExercisesListViewModel;
}

const PatientExercisesListController = observer(({viewModel}: Props) => {
  return (
    <BaseLayoutView
      title="Ejercicios"
      subtitle={viewModel.patientsStore.selectedPatient?.nombre}
      loading={viewModel.patientsStore.loading}
      loadingMessage="Cargando..."
      onBackAction={viewModel.goBack}>
      <PatientExercisesListView />
    </BaseLayoutView>
  );
});

export default PatientExercisesListController;
