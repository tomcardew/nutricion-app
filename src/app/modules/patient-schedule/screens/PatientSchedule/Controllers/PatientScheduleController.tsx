import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientScheduleViewModel from '../ViewModels/PatientScheduleViewModel';
import PatientScheduleView from '../Views/PatientScheduleView';
import {TouchableOpacity, View} from 'react-native';
import {Icon} from '@ui-kitten/components';
import {DatePickerModal} from '../../../../../../components/Inputs';

interface Props {
  viewModel: PatientScheduleViewModel;
}

const PatientScheduleController = observer(({viewModel}: Props) => {
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
      title="Citas"
      loading={viewModel.scheduleStore.loading}
      showBackButton={false}
      loadingMessage="Cargando..."
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
      onBackAction={viewModel.goBack}>
      <PatientScheduleView
        data={viewModel.scheduleStore.dates}
        date={viewModel.scheduleStore.currentDate}
        didChangeDate={viewModel.didChangeDate}
      />
    </BaseLayoutView>
  );
});

export default PatientScheduleController;
