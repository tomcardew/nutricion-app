import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientExercisesViewModel from '../ViewModels/PatientExercisesViewModel';
import PatientExercisesView from '../Views/PatientExercisesView';
import {Icon} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native';

interface Props {
  viewModel: PatientExercisesViewModel;
}

const PatientExercisesController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.load();
  }, []);

  return (
    <BaseLayoutView
      title="Tus ejercicios"
      loading={false}
      showBackButton={false}
      loadingMessage="Cargando..."
      disableScrollBar
      alert={viewModel.patientsStore.alert}
      rightAccessory={
        <TouchableOpacity style={{marginRight: 10}} onPress={viewModel.load}>
          <Icon
            style={{width: 24, height: 24}}
            fill="#FFF"
            name="sync-outline"
          />
        </TouchableOpacity>
      }
      onAlertDismiss={viewModel.dismissAlert}
      onBackAction={viewModel.goBack}>
      <PatientExercisesView
        currentDate={viewModel.patientsStore.currentDate}
        data={viewModel.patientsStore.AdminExercises}
        didChangeDate={viewModel.didChangeDate}
        didSelectExercise={viewModel.didSelectExercise}
      />
    </BaseLayoutView>
  );
});

export default PatientExercisesController;
