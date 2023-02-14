import {makeAutoObservable} from 'mobx';
import {Asset} from 'react-native-image-picker';
import {
  AlertActionType,
  AlertMessage,
  AlertType,
  UserType,
} from '../../models/Common';
import {profileDataToGraphData} from '../../models/Profile';
import CommonServices from '../../services/common';

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

  public changeProfilePicture = async (
    token: string,
    asset: Asset,
    type: UserType,
  ) => {
    this.loading = true;
    const data = await CommonServices.changeProfilePicture(token, asset, type);
    this.loading = false;
    return data;
  };

  public getProfile = async (token: string, type: UserType) => {
    this.loading = true;
    const data = await CommonServices.getProfile(token, type);
    this.loading = false;
    if (data.success) {
      return data;
    } else {
      return null;
    }
  };

  public dismiss = () => {
    this.alert = null;
  };
}