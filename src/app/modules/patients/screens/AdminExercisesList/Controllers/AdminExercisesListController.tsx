import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import AdminExercisesListViewModel from '../ViewModels/AdminExercisesListViewModel';
import AdminExercisesListView from '../Views/AdminExercisesListView';
import {Icon} from '@ui-kitten/components';

interface Props {
  viewModel: AdminExercisesListViewModel;
}

const AdminExercisesListController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.load();

    return () => {
      // viewModel.patientsStore.cleanExercises();
    };
  }, []);

  return (
    <BaseLayoutView
      title="Ejercicios"
      subtitle={viewModel.patientsStore.selectedPatient?.nombre}
      loading={viewModel.patientsStore.loading}
      loadingMessage="Cargando..."
      disableScrollBar
      actionButtonView={
        <Icon style={{width: 30, height: 30}} fill="#FFF" name="plus-outline" />
      }
      onActionButtonPress={viewModel.goToAddExercise}
      onBackAction={viewModel.goBack}>
      <AdminExercisesListView
        data={viewModel.patientsStore.AdminExercises}
        currentDate={viewModel.patientsStore.currentDate}
        didChangeDate={viewModel.didChangeDate}
        onPress={viewModel.goToExerciseDetails}
      />
    </BaseLayoutView>
  );
});

export default AdminExercisesListController;
