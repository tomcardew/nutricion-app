import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import GalleryViewModel from '../ViewModels/GalleryViewModel';
import GalleryView from '../Views/GalleryView';
import PreviewImage from '../../../../patients/screens/PatientGallery/Views/PreviewImage';
import {Icon} from '@ui-kitten/components';

interface Props {
  viewModel: GalleryViewModel;
}

const GalleryController = observer(({viewModel}: Props) => {
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    viewModel.load();

    return () => {
      viewModel.patientsStore.clearPictures();
    };
  }, []);

  return (
    <BaseLayoutView
      title="Galería"
      loading={viewModel.patientsStore.loading}
      disableScrollBar
      loadingMessage="Cargando..."
      showBackButton={false}
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
      <GalleryView
        data={viewModel.patientsStore.preparedPictures}
        onRefresh={() => viewModel.load(true)}
        onShowPreview={url => setPreviewUrl(url)}
        refreshing={viewModel.patientsStore.refreshing}
        didChangeCategory={viewModel.didChangeCategory}
        category={viewModel.patientsStore.selectedGalleryCategory}
      />
    </BaseLayoutView>
  );
});

export default GalleryController;
