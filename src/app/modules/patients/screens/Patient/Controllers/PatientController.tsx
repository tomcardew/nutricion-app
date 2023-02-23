import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientViewModel from '../ViewModels/PatientViewModel';
import PatientView from '../Views/PatientView';
import {Logger} from '../../../../../../utils/Utils';

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

  useEffect(() => {
    if (!viewModel.patientsStore.selectedPatientId) {
      viewModel.goBack();
    }
  }, [viewModel.patientsStore.selectedPatientId]);

  return (
    <BaseLayoutView
      title=""
      loadingMessage="Cargando..."
      loading={viewModel.patientsStore.loading}
      alert={viewModel.patientsStore.alert}
      disableScrollBar
      contentUnderHeader
      backgroundColor="transparent"
      onAlertDismiss={viewModel.dismissAlert}
      onBackAction={viewModel.goBack}>
      <PatientView
        data={viewModel.patientsStore.selectedPatient}
        onToggleExercises={viewModel.toggleExercises}
        onToggleAccess={viewModel.toggleAccess}
        onNavigateTo={viewModel.navigateTo}
      />
    </BaseLayoutView>
  );
});

export default PatientController;
