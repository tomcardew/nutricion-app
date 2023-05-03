import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientExercisesViewModel from '../ViewModels/PatientExercisesViewModel';
import PatientExercisesView from '../Views/PatientExercisesView';
import {Icon} from '@ui-kitten/components';
import {TouchableOpacity, View} from 'react-native';
import {DatePickerModal} from '../../../../../../components/Inputs';

interface Props {
  viewModel: PatientExercisesViewModel;
}

const PatientExercisesController = observer(({viewModel}: Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    viewModel.load();
  }, []);

  const rightAccessories = () => (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={{marginRight: 20}}
        onPress={() => setShowDatePicker(true)}>
        <Icon style={{width: 24, height: 24}} fill="#FFF" name="calendar" />
      </TouchableOpacity>
      <TouchableOpacity style={{marginRight: 10}} onPress={viewModel.load}>
        <Icon style={{width: 24, height: 24}} fill="#FFF" name="sync-outline" />
      </TouchableOpacity>
    </View>
  );

  return (
    <BaseLayoutView
      title="Tus ejercicios"
      loading={false}
      showBackButton={false}
      loadingMessage="Cargando..."
      disableScrollBar
      alert={viewModel.patientsStore.alert}
      rightAccessory={rightAccessories()}
      overlay={
        showDatePicker ? (
          <DatePickerModal
            mode="calendar"
            onClose={() => setShowDatePicker(false)}
            onSelectedDate={viewModel.didChangeDateString}
          />
        ) : undefined
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
