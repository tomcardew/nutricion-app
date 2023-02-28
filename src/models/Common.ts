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
  Cancel,
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

export enum FontWeight {
  Black = 'Black',
  BlackItalic = 'BlackItalic',
  Bold = 'Bold',
  BoldItalic = 'BoldItalic',
  ExtraBold = 'ExtraBold',
  ExtraBoldItalic = 'ExtraBoldItalic',
  ExtraLight = 'ExtraLight',
  ExtraLightItalic = 'ExtraLightItalic',
  Italic = 'Italic',
  Light = 'Light',
  LightItalic = 'LightItalic',
  Medium = 'Medium',
  MediumItalic = 'MediumItalic',
  Regular = 'Regular',
  SemiBold = 'SemiBold',
  SemiBoldItalic = 'SemiBoldItalic',
  Thin = 'Thin',
  ThinItalic = 'ThinItalic',
}
