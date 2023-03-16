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

const PatientScheduleController = observer(({viewModel}: Props) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    viewModel.load();
  }, []);

  return (
    <BaseLayoutView
      title="Citas"
      loading={viewModel.scheduleStore.loading}
      showBackButton={false}
      loadingMessage="Cargando..."
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
