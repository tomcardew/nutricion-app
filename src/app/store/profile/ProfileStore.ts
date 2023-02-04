import {makeAutoObservable} from 'mobx';
import {Asset} from 'react-native-image-picker';
import {AlertActionType, AlertMessage, AlertType} from '../../../models/Common';
import AdministratorServices from '../../../services/administrator';

export class ProfileStore {
  public alert: AlertMessage | null = null;
  public loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public showAlert = (
    onLogout: () => void = () => {},
    onChangeProfilePicture: (source: 'camera' | 'library') => void = () => {},
  ) => {
    this.alert = {
      title: 'Editar perfil',
      message: 'Selecciona qué acción deseas tomar',
      showIcon: false,
      type: AlertType.Info,
      actions: [
        {
          label: 'Cambiar foto de perfil',
          onClick: () => this.showChangeProfilePicture(onChangeProfilePicture),
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
      message: '¿Estás seguro(a) de cerrar la sesión?',
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

  public showChangeProfilePicture = (
    onChooseSource: (source: 'camera' | 'library') => void = () => {},
  ) => {
    this.alert = null;
    this.alert = {
      title: 'Cambiar foto de perfil',
      message: 'Elige la foto que deseas utilizar',
      showIcon: false,
      type: AlertType.Info,
      actions: [
        {
          label: 'Tomar una foto',
          type: AlertActionType.Action,
          onClick: () => onChooseSource('camera'),
        },
        {
          label: 'Elegir una foto de tu biblioteca',
          type: AlertActionType.Action,
          onClick: () => onChooseSource('library'),
        },
        {
          label: 'Cancelar',
        },
      ],
    };
  };

  public changeProfilePicture = async (token: string, asset: Asset) => {
    this.loading = true;
    const data = await AdministratorServices.changeProfilePicture(token, asset);
    this.loading = false;
    return data;
  };

  public getProfile = async (token: string) => {
    this.loading = true;
    const data = await AdministratorServices.getProfile(token);
    this.loading = false;
    return data;
  };

  public dismiss = () => {
    this.alert = null;
  };
}
