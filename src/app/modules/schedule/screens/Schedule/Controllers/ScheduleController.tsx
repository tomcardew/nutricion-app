import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import ScheduleViewModel from '../ViewModels/ScheduleViewModel';
import ScheduleView from '../Views/ScheduleView';
import {Icon} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';

interface Props {
  viewModel: ScheduleViewModel;
}

const ScheduleController = observer(({viewModel}: Props) => {
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
        <TouchableOpacity style={{marginRight: 10}} onPress={viewModel.load}>
          <Icon
            style={{width: 24, height: 24}}
            fill="#FFF"
            name="sync-outline"
          />
        </TouchableOpacity>
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
