import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientDataViewModel from '../ViewModels/PatientDataViewModel';
import PatientDataView from '../Views/PatientDataView';
import {Icon} from '@ui-kitten/components';

interface Props {
  viewModel: PatientDataViewModel;
}

const PatientDataController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.load();
  }, []);

  return (
    <BaseLayoutView
      title="Progreso del paciente"
      subtitle={viewModel.patientsStore.selectedPatient?.nombre}
      loadingMessage="Cargando..."
      loading={viewModel.patientsStore.loading}
      disableScrollBar
      actionButtonView={
        <Icon style={{width: 30, height: 30}} fill="#FFF" name="edit-outline" />
      }
      onActionButtonPress={viewModel.didPressEditData}
      onBackAction={viewModel.goBack}
      onAlertDismiss={() => {}}>
      <PatientDataView
        data={viewModel.patientsStore.patientProgress}
        selectedCategory={viewModel.patientsStore.selectedProgressCategory}
        stepCount={viewModel.patientsStore.patientStepCount}
        didChangeCategory={viewModel.didChangeProgressCategory}
      />
    </BaseLayoutView>
  );
});

export default PatientDataController;
