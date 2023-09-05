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
      loading={viewModel.patientsStore.loading}
      loadingMessage="Cargando..."
      disableScrollBar
      alert={viewModel.patientsStore.alert}
      onAlertDismiss={viewModel.dismiss}
      onBackAction={viewModel.goBack}>
      <PatientExerciseCommentsView
        notes={viewModel.patientsStore.selectedAdminExerciseNotes}
        username={viewModel.authStore.user?.nombre}
        commentTextPrompt={viewModel.patientsStore.commentTextPrompt}
        onChangeText={viewModel.onChangeText}
        didPressSend={viewModel.didPressSend}
      />
    </BaseLayoutView>
  );
});

export default PatientExerciseCommentsController;
