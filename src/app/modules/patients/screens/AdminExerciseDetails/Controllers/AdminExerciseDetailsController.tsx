import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import AdminExerciseDetailsViewModel from '../ViewModels/AdminExerciseDetailsViewModel';
import AdminExerciseDetailsView from '../Views/AdminExerciseDetailsView';
import {Logger, dateToDayMonth} from '../../../../../../utils/Utils';
import {Icon} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native';

interface Props {
  viewModel: AdminExerciseDetailsViewModel;
}

const AdminExerciseDetailsController = observer(({viewModel}: Props) => {
  const exercise = viewModel.patientsStore.selectedAdminExercise;
  const isAdmin = viewModel.authStore.user?.esAdministrador ?? false;
  const isCompleted = exercise?.completado ?? false;

  useEffect(() => {
    if (viewModel.patientsStore.selectedAdminExercise == null) {
      viewModel.goBack();
    }
  }, [viewModel.patientsStore.selectedAdminExercise]);

  return (
    <BaseLayoutView
      title={exercise?.Nombre_ejercicio.nombre_ejercicio}
      subtitle={dateToDayMonth(new Date(exercise?.fecha_ejercicio ?? ''))}
      loading={false}
      alert={viewModel.patientsStore.alert}
      loadingMessage="Cargando..."
      rightAccessory={
        <TouchableOpacity
          style={{marginRight: 20}}
          onPress={viewModel.goToComments}>
          <Icon
            style={{width: 24, height: 24}}
            fill="#FFF"
            name="message-circle-outline"
          />
        </TouchableOpacity>
      }
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
        notes={exercise?.Notas ?? '--'}
        completed={exercise?.completado ?? false}
        onGetExerciseImage={viewModel.getExerciseImage}
      />
    </BaseLayoutView>
  );
});

export default AdminExerciseDetailsController;
