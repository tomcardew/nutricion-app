import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientExercisesViewModel from '../ViewModels/PatientExercisesViewModel';
import PatientExercisesView from '../Views/PatientExercisesView';
import ScreenNames from '../../../../../../constants/Screens';

interface Props {
  viewModel: PatientExercisesViewModel;
}

const PatientExercisesController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.load();

    return () => {
      viewModel.patientsStore.clearExercises();
    };
  }, []);

  return (
    <BaseLayoutView
      title="Programar ejercicios"
      subtitle={viewModel.patientsStore.selectedPatient?.nombre}
      loading={viewModel.patientsStore.loading}
      loadingMessage="Cargando..."
      alert={viewModel.patientsStore.alert}
      onAlertDismiss={viewModel.dismissAlert}
      onBackAction={viewModel.goBack}>
      <PatientExercisesView
        categories={viewModel.patientsStore.categories}
        exercises={viewModel.patientsStore.exercises}
        series={viewModel.patientsStore.series}
        repetitions={viewModel.patientsStore.repetitions}
        rest={viewModel.patientsStore.rest}
        weight={viewModel.patientsStore.weight}
        note={viewModel.patientsStore.note}
        canSave={viewModel.patientsStore.canSaveExercise ?? false}
        selectedCategory={viewModel.patientsStore.currentCategory}
        selectedCategoryValue={viewModel.patientsStore.selectedCategoryValue}
        didChangeCategory={viewModel.didChangeCategory}
        selectedExercise={viewModel.patientsStore.currentExercise}
        selectedExerciseValue={viewModel.patientsStore.selectedExerciseValue}
        didChangeExercise={viewModel.didChangeExercise}
        selectedSerie={viewModel.patientsStore.currentSeries}
        selectedSerieValue={viewModel.patientsStore.selectedSerieValue}
        didChangeSerie={viewModel.didChangeSerie}
        selectedRepetition={viewModel.patientsStore.currentRepetitions}
        selectedRepetitionValue={
          viewModel.patientsStore.selectedRepetitionValue
        }
        didChangeRepetition={viewModel.didChangeRepetition}
        selectedRest={viewModel.patientsStore.currentRest}
        selectedRestValue={viewModel.patientsStore.selectedRestValue}
        didChangeRest={viewModel.didChangeRest}
        didChangeWeight={viewModel.didChangeWeight}
        didChangeNote={viewModel.didChangeNote}
        onSaveExercise={viewModel.onSaveExercise}
      />
    </BaseLayoutView>
  );
});

export default PatientExercisesController;
