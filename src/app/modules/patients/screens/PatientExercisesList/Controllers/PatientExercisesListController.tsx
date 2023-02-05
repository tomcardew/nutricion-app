import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientExercisesListViewModel from '../ViewModels/PatientExercisesListViewModel';
import PatientExercisesListView from '../Views/PatientExercisesListView';
import {Text} from 'react-native';
import {Icon} from '@ui-kitten/components';

interface Props {
  viewModel: PatientExercisesListViewModel;
}

const PatientExercisesListController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.load();

    return () => {
      viewModel.patientsStore.cleanExercises();
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
      <PatientExercisesListView
        data={viewModel.patientsStore.patientExercises}
        currentDate={viewModel.patientsStore.currentDate}
      />
    </BaseLayoutView>
  );
});

export default PatientExercisesListController;
