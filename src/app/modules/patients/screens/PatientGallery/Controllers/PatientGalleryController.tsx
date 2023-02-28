import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientGalleryViewModel from '../ViewModels/PatientGalleryViewModel';
import PatientGalleryView from '../Views/PatientGalleryView';
import PreviewImage from '../Views/PreviewImage';
import {Icon} from '@ui-kitten/components';

interface Props {
  viewModel: PatientGalleryViewModel;
}

const PatientGalleryController = observer(({viewModel}: Props) => {
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    viewModel.load();

    return () => {
      viewModel.patientsStore.clearPictures();
    };
  }, []);

  const onRefresh = () => {
    viewModel.load(true);
  };

  return (
    <BaseLayoutView
      title="Galería"
      subtitle={viewModel.patientsStore.selectedPatient?.nombre}
      loading={viewModel.patientsStore.loading}
      disableScrollBar
      loadingMessage="Cargando..."
      overlay={
        previewUrl ? (
          <PreviewImage url={previewUrl} onClose={() => setPreviewUrl('')} />
        ) : undefined
      }
      actionButtonView={
        <Icon
          style={{width: 30, height: 30}}
          fill="#FFF"
          name="cloud-upload-outline"
        />
      }
      alert={viewModel.patientsStore.alert}
      onAlertDismiss={viewModel.dismissAlert}
      onActionButtonPress={viewModel.didPressAddPicture}
      onBackAction={viewModel.goBack}>
      <PatientGalleryView
        refreshing={viewModel.patientsStore.refreshing}
        onRefresh={onRefresh}
        data={viewModel.patientsStore.preparedPictures}
        onShowPreview={url => setPreviewUrl(url)}
      />
    </BaseLayoutView>
  );
});

export default PatientGalleryController;
