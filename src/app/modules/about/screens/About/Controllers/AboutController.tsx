import React from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import AboutViewModel from '../ViewModels/AboutViewModel';
import AboutView from '../Views/AboutView';

interface Props {
  viewModel: AboutViewModel;
}

const AboutController = observer(({viewModel}: Props) => {
  return (
    <BaseLayoutView
      title="Acerca de"
      loading={false}
      loadingMessage="Cargando..."
      onBackAction={viewModel.goBack}>
      <AboutView didPressSeeReleaseNotes={viewModel.didPressSeeReleaseNotes} />
    </BaseLayoutView>
  );
});

export default AboutController;
