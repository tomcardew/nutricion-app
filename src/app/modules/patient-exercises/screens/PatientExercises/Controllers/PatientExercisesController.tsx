import React from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientExercisesViewModel from '../ViewModels/PatientExercisesViewModel';
import PatientExercisesView from '../Views/PatientExercisesView';

interface Props {
  viewModel: PatientExercisesViewModel;
}

const PatientExercisesController = observer(({viewModel}: Props) => {
  return (
    <BaseLayoutView
      title="Tus ejercicios"
      loading={false}
      showBackButton={false}
      loadingMessage="Cargando..."
      onBackAction={viewModel.goBack}>
      <PatientExercisesView />
    </BaseLayoutView>
  );
});

export default PatientExercisesController;
