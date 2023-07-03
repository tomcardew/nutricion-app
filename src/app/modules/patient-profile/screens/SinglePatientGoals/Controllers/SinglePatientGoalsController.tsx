import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import SinglePatientGoalsViewModel from '../ViewModels/SinglePatientGoalsViewModel';
import SinglePatientGoalsView from '../Views/SinglePatientGoalsView';

interface Props {
  viewModel: SinglePatientGoalsViewModel;
}

const SinglePatientGoalsController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.load();
  }, []);
  return (
    <BaseLayoutView
      title="Mis objetivos"
      loading={viewModel.profileStore.loading}
      loadingMessage="Cargando..."
      disableScrollBar
      onBackAction={viewModel.goBack}>
      <SinglePatientGoalsView data={viewModel.profileStore.orderedObjectives} />
    </BaseLayoutView>
  );
});

export default SinglePatientGoalsController;
