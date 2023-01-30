import React from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientGalleryViewModel from '../ViewModels/PatientGalleryViewModel';
import PatientGalleryView from '../Views/PatientGalleryView';

interface Props {
  viewModel: PatientGalleryViewModel;
}

const PatientGalleryController = observer(({viewModel}: Props) => {
  return (
    <BaseLayoutView
      title="PatientGallery"
      loading={false}
      loadingMessage="Cargando..."
      onBackAction={viewModel.goBack}>
      <PatientGalleryView />
    </BaseLayoutView>
  );
});

export default PatientGalleryController;
