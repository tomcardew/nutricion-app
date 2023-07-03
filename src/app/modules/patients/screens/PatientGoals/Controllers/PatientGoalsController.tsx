import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientGoalsViewModel from '../ViewModels/PatientGoalsViewModel';
import PatientGoalsView from '../Views/PatientGoalsView';
import {Icon} from '@ui-kitten/components';

interface Props {
  viewModel: PatientGoalsViewModel;
}

const PatientGoalsController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.load();
  }, []);

  return (
    <BaseLayoutView
      title="Objetivos"
      subtitle={viewModel.patientsStore.selectedPatient?.nombre}
      loading={viewModel.patientsStore.loading}
      loadingMessage="Cargando..."
      disableScrollBar
      alert={viewModel.patientsStore.alert}
      onAlertDismiss={viewModel.dismissAlert}
      actionButtonView={
        <Icon style={{width: 30, height: 30}} fill="#FFF" name="plus-outline" />
      }
      onActionButtonPress={viewModel.addNewObjective}
      onBackAction={viewModel.goBack}>
      <PatientGoalsView
        data={viewModel.patientsStore.orderedObjectives}
        onMarkCompleted={viewModel.onMarkCompleted}
      />
    </BaseLayoutView>
  );
});

export default PatientGoalsController;
