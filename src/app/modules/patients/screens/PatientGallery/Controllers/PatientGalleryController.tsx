import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientGalleryViewModel from '../ViewModels/PatientGalleryViewModel';
import PatientGalleryView from '../Views/PatientGalleryView';
import {GalleryItems} from '../../../../../../models/Patients';
import PreviewImage from '../Views/PreviewImage';
import Environment from '../../../../../../constants/Environment';

interface Props {
  viewModel: PatientGalleryViewModel;
}

const PatientGalleryController = observer(({viewModel}: Props) => {
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    viewModel.load();
  }, []);

  const onRefresh = () => {
    viewModel.load(true);
  };

  return (
    <BaseLayoutView
      title="Galería"
      loading={viewModel.patientsStore.loading}
      disableScrollBar
      loadingMessage="Cargando..."
      overlay={
        previewUrl ? (
          <PreviewImage url={previewUrl} onClose={() => setPreviewUrl('')} />
        ) : undefined
      }
      onBackAction={viewModel.goBack}>
      <PatientGalleryView
        refreshing={viewModel.patientsStore.refreshing}
        onRefresh={onRefresh}
        data={viewModel.patientsStore.preparedPictures}
        onShowPreview={url =>
          setPreviewUrl(
            url.replace(
              'http://localhost:4000',
              Environment.URL + ':' + Environment.PORT,
            ),
          )
        }
      />
    </BaseLayoutView>
  );
});

export default PatientGalleryController;
