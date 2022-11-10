import React from 'react';
import {observer} from 'mobx-react';
import BaseLayoutView from '../../../../../../components/Layout/BaseLayoutView';
import PatientsView from '../Views/PatientsView';

interface Props {}

const PatientsController = observer(({}: Props) => {
  return (
    <BaseLayoutView
      title="Mis Pacientes"
      loadingMessage="Iniciando sesión..."
      loading={false}
      alert={null}
      showBackButton={false}
      onAlertDismiss={() => {}}>
      <PatientsView />
    </BaseLayoutView>
  );
});

export default PatientsController;
