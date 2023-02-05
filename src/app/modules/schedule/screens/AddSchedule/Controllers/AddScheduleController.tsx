import React from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import AddScheduleViewModel from '../ViewModels/AddScheduleViewModel';
import AddScheduleView from '../Views/AddScheduleView';

interface Props {
  viewModel: AddScheduleViewModel;
}

const AddScheduleController = observer(({viewModel}: Props) => {
  return (
    <BaseLayoutView
      title="Nueva cita"
      loading={false}
      loadingMessage="Cargando..."
      onBackAction={viewModel.goBack}>
      <AddScheduleView />
    </BaseLayoutView>
  );
});

export default AddScheduleController;
