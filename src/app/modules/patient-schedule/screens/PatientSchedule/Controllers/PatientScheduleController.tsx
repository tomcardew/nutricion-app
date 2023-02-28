import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientScheduleViewModel from '../ViewModels/PatientScheduleViewModel';
import PatientScheduleView from '../Views/PatientScheduleView';
import {TouchableOpacity} from 'react-native';
import {Icon} from '@ui-kitten/components';

interface Props {
  viewModel: PatientScheduleViewModel;
}

const PatientScheduleController = observer(({viewModel}: Props) => {
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
        <TouchableOpacity style={{marginRight: 10}} onPress={viewModel.load}>
          <Icon
            style={{width: 24, height: 24}}
            fill="#FFF"
            name="sync-outline"
          />
        </TouchableOpacity>
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
