import React from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientExerciseCommentsViewModel from '../ViewModels/PatientExerciseCommentsViewModel';
import PatientExerciseCommentsView from '../Views/PatientExerciseCommentsView';

interface Props {
  viewModel: PatientExerciseCommentsViewModel;
}

const PatientExerciseCommentsController = observer(({viewModel}: Props) => {
  return (
    <BaseLayoutView
      title="Comentarios"
      loading={false}
      loadingMessage="Cargando..."
      onBackAction={viewModel.goBack}>
      <PatientExerciseCommentsView />
    </BaseLayoutView>
  );
});

export default PatientExerciseCommentsController;
