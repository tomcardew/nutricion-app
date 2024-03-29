import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import AdminExerciseDetailsViewModel from '../ViewModels/AdminExerciseDetailsViewModel';
import AdminExerciseDetailsView from '../Views/AdminExerciseDetailsView';
import {dateToDayMonth} from '../../../../../../utils/Utils';
import {Icon} from '@ui-kitten/components';
import moment from 'moment';

interface Props {
  viewModel: AdminExerciseDetailsViewModel;
}

const AdminExerciseDetailsController = observer(({viewModel}: Props) => {
  const exercise = viewModel.patientsStore.selectedAdminExercise;
  const firstNote = exercise?.Notas[0].nota;
  const isAdmin = viewModel.authStore.user?.esAdministrador ?? false;
  const isCompleted = exercise?.completado ?? false;

  useEffect(() => {
    if (viewModel.patientsStore.selectedAdminExercise == null) {
      viewModel.goBack();
    }
  }, [viewModel.patientsStore.selectedAdminExercise]);

  const date = dateToDayMonth(
    moment(exercise?.fecha_ejercicio ?? '')
      .toDate(),
  );

  return (
    <BaseLayoutView
      title={exercise?.Nombre_ejercicio.nombre_ejercicio}
      subtitle={date}
      loading={false}
      alert={viewModel.patientsStore.alert}
      loadingMessage="Cargando..."
      actionButtonView={
        !isAdmin && !isCompleted ? (
          <Icon
            style={{width: 30, height: 30}}
            fill="#FFF"
            name="checkmark-outline"
          />
        ) : undefined
      }
      onActionButtonPress={isAdmin ? undefined : viewModel.didPressComplete}
      onAlertDismiss={viewModel.dismissAlert}
      onBackAction={viewModel.goBack}>
      <AdminExerciseDetailsView
        demoUrl={exercise?.Nombre_ejercicio.url_gif}
        name={exercise?.Nombre_ejercicio.nombre_ejercicio ?? '--'}
        category={exercise?.Categoria_ejercicio.categoria ?? '--'}
        series={exercise?.Series.series.toString() ?? '--'}
        repetitions={exercise?.Repeticiones.repeticiones ?? '--'}
        rest={exercise?.Descansos.descansos ?? '--'}
        weight={exercise?.Peso ?? '--'}
        notes={firstNote ?? '--'}
        isAdmin={viewModel.authStore.user?.esAdministrador}
        goToComments={viewModel.goToComments}
        completed={exercise?.completado ?? false}
        onGetExerciseImage={viewModel.getExerciseImage}
        didPressDelete={viewModel.didPressDelete}
      />
    </BaseLayoutView>
  );
});

export default AdminExerciseDetailsController;
