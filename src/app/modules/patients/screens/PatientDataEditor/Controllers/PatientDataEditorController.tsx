import React from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientDataEditorViewModel from '../ViewModels/PatientDataEditorViewModel';
import PatientDataEditorView from '../Views/PatientDataEditorView';

interface Props {
  viewModel: PatientDataEditorViewModel;
}

const PatientDataEditorController = observer(({viewModel}: Props) => {
  return (
    <BaseLayoutView
      title="Actualizar progreso"
      subtitle={viewModel.patientsStore.selectedPatient?.nombre}
      loading={viewModel.patientsStore.loading}
      loadingMessage="Cargando..."
      alert={viewModel.patientsStore.alert}
      onAlertDismiss={viewModel.dismissAlert}
      onBackAction={viewModel.goBack}>
      <PatientDataEditorView
        canSave={viewModel.patientsStore.canSavePatientProgress}
        category={viewModel.patientsStore.selectedProgressCategory}
        reloader={viewModel.patientsStore.reloader}
        selectedCategory={viewModel.patientsStore.currentProgressCategory}
        data={viewModel.patientsStore.dataPatientProgress}
        didChangeCategory={viewModel.didChangeCategory}
        didChangeValue={viewModel.didChangeValue}
        onSaveProgress={viewModel.didPressSaveProgress}
      />
    </BaseLayoutView>
  );
});

export default PatientDataEditorController;
