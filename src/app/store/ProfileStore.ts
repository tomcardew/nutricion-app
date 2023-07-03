import { makeAutoObservable } from "mobx";
import { Asset } from "react-native-image-picker";
import {
  AlertActionType,
  AlertMessage,
  AlertType,
  UserType,
} from "../../models/Common";
import CommonServices from "../../services/common";
import PatientServices from "../../services/patient";
import AdministratorServices from "../../services/administrator";
import { pendingDatesToList } from "../../models/Profile";
import { PatientObjective } from "../../models/Patients";

export class ProfileStore {
  public alert: AlertMessage | null = null;
  public loading: boolean = false;

  public dietUrl: string | undefined = undefined;

  public isGoogleFitAuthorized: boolean = false;
  public stepCount: number = 0;

  public pendingDates: any[] = []; // used for patient and admin
  public pendingExercies: any[] = []; // used only for patient

  public objectives: PatientObjective[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public showAlert = (
    onLogout: () => void = () => {},
    onChangeProfilePicture: (source: "camera" | "library") => void = () => {}
  ) => {
    this.alert = {
      title: "Editar perfil",
      message: "Selecciona qué acción deseas tomar",
      showIcon: false,
      type: AlertType.Info,
      actions: [
        {
          label: "Cambiar foto de perfil",
          onClick: () => this.showChangeProfilePicture(onChangeProfilePicture),
        },
        {
          label: "Cerrar sesión",
          type: AlertActionType.Destructive,
          onClick: () => this.showLogoutAlert(onLogout),
        },
        {
          label: "Cancelar",
          type: AlertActionType.Cancel,
        },
      ],
      autoClose: false,
    };
  };

  public showLogoutAlert = (onContinue: () => void = () => {}) => {
    this.alert = null;
    this.alert = {
      title: "Cerrar sesión",
      message: "¿Estás seguro(a) de cerrar la sesión?",
      showIcon: true,
      type: AlertType.Warning,
      actions: [
        {
          label: "Continuar",
          type: AlertActionType.Action,
          onClick: onContinue,
        },
        {
          label: "Cancelar",
          type: AlertActionType.Cancel,
        },
      ],
      autoClose: false,
    };
  };

  public showChangeProfilePicture = (
    onChooseSource: (source: "camera" | "library") => void = () => {}
  ) => {
    this.alert = null;
    this.alert = {
      title: "Cambiar foto de perfil",
      message: "Elige la foto que deseas utilizar",
      showIcon: false,
      type: AlertType.Info,
      actions: [
        {
          label: "Tomar una foto",
          type: AlertActionType.Action,
          onClick: () => onChooseSource("camera"),
        },
        {
          label: "Elegir una foto de tu biblioteca",
          type: AlertActionType.Action,
          onClick: () => onChooseSource("library"),
        },
        {
          label: "Cancelar",
          type: AlertActionType.Cancel,
        },
      ],
      autoClose: false,
    };
  };

  public changeProfilePicture = async (
    token: string,
    asset: Asset,
    type: UserType
  ) => {
    this.loading = true;
    const data = await CommonServices.changeProfilePicture(token, asset, type);
    this.loading = false;
    return data;
  };

  public postStepCount = async (token: string, count: number) => {
    await PatientServices.postSteps(token, `${count}`);
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

  public getDiet = async (token: string) => {
    this.dietUrl = undefined;
    this.loading = true;
    const data = await PatientServices.getDiet(token);
    this.loading = false;
    if (data.success) {
      this.dietUrl = data.data[0].url;
    }
  };

  public showDietError = (onRetry?: () => void) => {
    this.alert = {
      title: "No se pudo abrir el documento",
      message:
        "Intenta más tarde y, si el problema persite, contacta con soporte.",
      type: AlertType.Error,
      showIcon: true,
      actions: [
        {
          label: "Reintentar",
          type: AlertActionType.Normal,
          onClick: onRetry,
        },
      ],
      autoClose: false,
    };
  };

  public getPendingDates = async (token: string) => {
    this.loading = true;
    const data = await AdministratorServices.getPendingDates(token);
    this.loading = false;
    if (data.success) {
      this.pendingDates = pendingDatesToList(data.data.days);
    }
  };

  public getPatientPendingDates = async (token: string) => {
    this.loading = true;
    const data = await PatientServices.getPendingDates(token);
    this.loading = false;
    if (data.success) {
      this.pendingDates = pendingDatesToList(data.data.days);
    }
  };

  public getPatientPendingExercises = async (token: string) => {
    this.loading = true;
    const data = await PatientServices.getPendingExercises(token);
    this.loading = false;
    if (data.success) {
      this.pendingExercies = pendingDatesToList(data.data.days);
    }
  };

  public getObjectives = async (token: string) => {
    this.loading = true;
    const data = await PatientServices.getObjectives(token);
    this.loading = false;
    if (data.success) {
      this.objectives = data.data;
    }
  };

  public dismiss = () => {
    this.alert = null;
  };

  get orderedObjectives() {
    return this.objectives
      .slice()
      .sort((a: any, b: any) => a.completado - b.completado);
  }
}
