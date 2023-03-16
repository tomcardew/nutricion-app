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

interface RightAccessoriesProps {
  onReloadPress?: () => void;
  onCalendarPress?: () => void;
}

const RightAccessories = ({
  onReloadPress = () => {},
  onCalendarPress = () => {},
}: RightAccessoriesProps) => (
  <View style={{flexDirection: 'row'}}>
    <TouchableOpacity style={{marginRight: 20}} onPress={onCalendarPress}>
      <Icon
        style={{width: 24, height: 24}}
        fill="#FFF"
        name="calendar-outline"
      />
    </TouchableOpacity>
    <TouchableOpacity style={{marginRight: 10}} onPress={onReloadPress}>
      <Icon style={{width: 24, height: 24}} fill="#FFF" name="sync-outline" />
    </TouchableOpacity>
  </View>
);

const ScheduleController = observer(({viewModel}: Props) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    viewModel.load();
  }, []);

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
      rightAccessory={
        <RightAccessories
          onReloadPress={viewModel.load}
          onCalendarPress={() => setShowDatePicker(true)}
        />
      }
      overlay={
        showDatePicker ? (
          <DatePickerModal
            mode="datepicker"
            onSelectedDate={viewModel.didChangeSelectedDate}
            onClose={() => setShowDatePicker(false)}
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
