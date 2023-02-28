import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientDietViewModel from '../ViewModels/PatientDietViewModel';
import PatientDietView from '../Views/PatientDietView';

interface Props {
  viewModel: PatientDietViewModel;
}

const PatientDietController = observer(({viewModel}: Props) => {
  useEffect(() => {
    viewModel.load();
    return () => {
      viewModel.profileStore.dismiss();
    };
  }, []);

  return (
    <BaseLayoutView
      title="Dieta"
      loading={viewModel.profileStore.loading}
      loadingMessage="Cargando..."
      alert={viewModel.profileStore.alert}
      onAlertDismiss={viewModel.profileStore.dismiss}
      onBackAction={viewModel.goBack}>
      <PatientDietView
        onError={viewModel.onError}
        source={viewModel.profileStore.dietUrl}
      />
    </BaseLayoutView>
  );
});

export default PatientDietController;
