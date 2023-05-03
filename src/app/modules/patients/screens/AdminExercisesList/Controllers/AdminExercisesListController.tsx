import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import AdminExercisesListViewModel from '../ViewModels/AdminExercisesListViewModel';
import AdminExercisesListView from '../Views/AdminExercisesListView';
import {Icon} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native';
import {DatePickerModal} from '../../../../../../components/Inputs';

interface Props {
  viewModel: AdminExercisesListViewModel;
}

const AdminExercisesListController = observer(({viewModel}: Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      rightAccessory={
        <TouchableOpacity
          style={{marginRight: 20}}
          onPress={() => setShowDatePicker(true)}>
          <Icon style={{width: 24, height: 24}} fill="#FFF" name="calendar" />
        </TouchableOpacity>
      }
      overlay={
        showDatePicker ? (
          <DatePickerModal
            mode="calendar"
            onClose={() => setShowDatePicker(false)}
            onSelectedDate={viewModel.didChangeDateString}
          />
        ) : undefined
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
