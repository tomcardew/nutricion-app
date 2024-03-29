import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import ScheduleViewModel from '../ViewModels/ScheduleViewModel';
import ScheduleView from '../Views/ScheduleView';
import {Icon} from '@ui-kitten/components';
import {TouchableOpacity, View} from 'react-native';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import {DatePickerModal} from '../../../../../../components/Inputs';

interface Props {
  viewModel: ScheduleViewModel;
}

const ScheduleController = observer(({viewModel}: Props) => {
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
      loadingMessage="Cargando..."
      disableScrollBar
      actionButtonView={
        <Icon style={{width: 30, height: 30}} fill="#FFF" name="plus-outline" />
      }
      onActionButtonPress={viewModel.goToAddSchedule}
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
      showBackButton={false}>
      <ScheduleView
        data={viewModel.scheduleStore.dates}
        date={viewModel.scheduleStore.currentDate}
        didChangeDate={viewModel.didChangeDate}
      />
    </BaseLayoutView>
  );
});

export default ScheduleController;
