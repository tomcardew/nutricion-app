import {AlertMessage} from '../../../components/Layout/BaseLayoutView';
import {makeAutoObservable} from 'mobx';
import {AlertType} from '../../../components/Alert/AlertPopup';
import {AlertActionType} from '../../../components/Alert/AlertAction';

export class ProfileStore {
  public alert: AlertMessage | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public showAlert = (onLogout: () => void = () => {}) => {
    this.alert = {
      title: 'Editar perfil',
      message: 'Selecciona qué acción deseas tomar',
      showIcon: false,
      type: AlertType.Info,
      actions: [
        {
          label: 'Cambiar foto de perfil',
        },
        {
          label: 'Cerrar sesión',
          type: AlertActionType.Destructive,
          onClick: () => this.showLogoutAlert(onLogout),
        },
        {
          label: 'Cancelar',
        },
      ],
    };
  };

  public showLogoutAlert = (onContinue: () => void = () => {}) => {
    this.alert = null;
    this.alert = {
      title: 'Cerrar sesión',
      message: '¿Estás seguro de cerrar la sesión?',
      showIcon: true,
      type: AlertType.Warning,
      actions: [
        {
          label: 'Continuar',
          type: AlertActionType.Action,
          onClick: onContinue,
        },
        {
          label: 'Cancelar',
        },
      ],
    };
  };

  public dismiss = () => {
    this.alert = null;
  };
}
