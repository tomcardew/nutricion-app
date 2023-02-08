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
      title="Editar datos del paciente"
      subtitle={viewModel.patientsStore.selectedPatient?.nombre}
      loading={viewModel.patientsStore.loading}
      loadingMessage="Cargando..."
      alert={viewModel.patientsStore.alert}
      onAlertDismiss={viewModel.dismissAlert}
      onBackAction={viewModel.goBack}>
      <PatientDataEditorView
        weight={viewModel.patientsStore.data_weight}
        imc={viewModel.patientsStore.data_imc}
        bodyFat={viewModel.patientsStore.data_bodyFat}
        abdomen={viewModel.patientsStore.data_abdomen}
        hip={viewModel.patientsStore.data_hip}
        waist={viewModel.patientsStore.data_waist}
        canSave={viewModel.patientsStore.canSavePatientProgress}
        didChangeWeight={viewModel.didChangeWeight}
        didChangeAbdomen={viewModel.didChangeAbdomen}
        didChangeBodyFat={viewModel.didChangeBodyFat}
        didChangeHip={viewModel.didChangeHip}
        didChangeImc={viewModel.didChangeImc}
        didChangeWaist={viewModel.didChangeWaist}
        onSaveProgress={viewModel.didPressSaveProgress}
      />
    </BaseLayoutView>
  );
});

export default PatientDataEditorController;
