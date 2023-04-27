import React from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import AdminExerciseDetailsViewModel from '../ViewModels/AdminExerciseDetailsViewModel';
import AdminExerciseDetailsView from '../Views/AdminExerciseDetailsView';
import {dateToDayMonth} from '../../../../../../utils/Utils';

interface Props {
  viewModel: AdminExerciseDetailsViewModel;
}

const AdminExerciseDetailsController = observer(({viewModel}: Props) => {
  const exercise = viewModel.patientsStore.selectedAdminExercise;

  return (
    <BaseLayoutView
      title={exercise?.Nombre_ejercicio.nombre_ejercicio}
      subtitle={dateToDayMonth(new Date(exercise?.fecha_ejercicio ?? ''))}
      loading={false}
      loadingMessage="Cargando..."
      // disableScrollBar
      onBackAction={viewModel.goBack}>
      <AdminExerciseDetailsView
        demoUrl={exercise?.Nombre_ejercicio.url_gif}
        name={exercise?.Nombre_ejercicio.nombre_ejercicio ?? '--'}
        category={exercise?.Categoria_ejercicio.categoria ?? '--'}
        series={exercise?.Series.series.toString() ?? '--'}
        repetitions={exercise?.Repeticiones.repeticiones ?? '--'}
        rest={exercise?.Descansos.descansos ?? '--'}
        weight={exercise?.Peso ?? '--'}
        notes={exercise?.Notas ?? '--'}
        completed={exercise?.completado ?? false}
        onGetExerciseImage={viewModel.getExerciseImage}
      />
    </BaseLayoutView>
  );
});

export default AdminExerciseDetailsController;
