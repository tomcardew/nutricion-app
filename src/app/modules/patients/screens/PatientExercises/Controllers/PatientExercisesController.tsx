import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientExercisesViewModel from '../ViewModels/PatientExercisesViewModel';
import PatientExercisesView from '../Views/PatientExercisesView';

interface Props {
  viewModel: PatientExercisesViewModel;
}

const PatientExercisesController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.load();
  }, []);

  return (
    <BaseLayoutView
      title="Programar ejercicios"
      subtitle={viewModel.patientsStore.selectedPatient?.nombre}
      loading={viewModel.patientsStore.loading}
      loadingMessage="Cargando..."
      onBackAction={viewModel.goBack}>
      <PatientExercisesView
        categories={viewModel.patientsStore.categories}
        exercises={viewModel.patientsStore.exercises}
        series={viewModel.patientsStore.series}
        repetitions={viewModel.patientsStore.repetitions}
        rest={viewModel.patientsStore.rest}
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
      />
    </BaseLayoutView>
  );
});

export default PatientExercisesController;
