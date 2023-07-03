import React from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientGoalsViewModel from '../ViewModels/PatientGoalsViewModel';
import PatientGoalsView from '../Views/PatientGoalsView';

interface Props {
  viewModel: PatientGoalsViewModel;
}

const PatientGoalsController = observer(({viewModel}: Props) => {
  return (
    <BaseLayoutView
      title="PatientGoals"
      loading={false}
      loadingMessage="Cargando..."
      onBackAction={viewModel.goBack}>
      <PatientGoalsView />
    </BaseLayoutView>
  );
});

export default PatientGoalsController;
