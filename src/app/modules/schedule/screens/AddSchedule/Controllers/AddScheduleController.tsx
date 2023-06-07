import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import AddScheduleViewModel from '../ViewModels/AddScheduleViewModel';
import AddScheduleView from '../Views/AddScheduleView';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import {DatePickerModal} from '../../../../../../components/Inputs';

interface Props {
  viewModel: AddScheduleViewModel;
}

const AddScheduleController = observer(({viewModel}: Props) => {
  const [showDatepicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    viewModel.load();
  }, []);

  return (
    <BaseLayoutView
      title="Nueva cita"
      loading={viewModel.scheduleStore.loading}
      loadingMessage="Cargando..."
      alert={viewModel.scheduleStore.alert}
      onAlertDismiss={viewModel.dismissAlert}
      overlay={
        showDatepicker ? (
          <DatePickerModal
            mode="datepicker"
            onSelectedDate={viewModel.didChangeDate}
            onClose={() => setShowDatePicker(false)}
          />
        ) : undefined
      }
      onBackAction={viewModel.goBack}>
      <AddScheduleView
        patients={viewModel.scheduleStore.patients}
        date={viewModel.scheduleStore.selectedDate}
        place={viewModel.scheduleStore.place}
        selectedPlaceIndex={viewModel.scheduleStore.currentPlace}
        selectedPatient={viewModel.scheduleStore.currentPatient}
        selectedPatientValue={viewModel.scheduleStore.selectedPatientValue}
        didChangePatient={viewModel.didChangePatient}
        didPressChangeDate={() => setShowDatePicker(true)}
        didChangePlace={viewModel.didChangePlace}
        onSaveDate={viewModel.save}
        canSave={viewModel.scheduleStore.canSaveDate}
      />
    </BaseLayoutView>
  );
});

export default AddScheduleController;
