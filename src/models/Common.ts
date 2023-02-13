export interface ErrorMessage {
  code: number;
  message: string;
}

export interface AlertMessage {
  title: string;
  message: string;
  error?: ErrorMessage;
  type: AlertType;
  showIcon: boolean;
  actions: AlertAction[];
}

export enum AlertType {
  Error,
  Warning,
  Info,
  Success,
}

export enum AlertActionType {
  Normal,
  Destructive,
  Action,
}

export enum UserType {
  Admin,
  Patient,
}

export interface AlertAction {
  label: string;
  type?: AlertActionType;
  isFirstTwo?: boolean | null;

  onClick?: () => void;
}
