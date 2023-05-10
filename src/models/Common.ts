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
  autoClose: boolean;
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

export enum MediaType {
  Image,
  Video,
  Audio,
  Document,
  None,
}

export enum GalleryCategory {
  Activities = 'Activities',
  Progress = 'Progress',
  Other = 'Other',
}

export enum PatientsCategory {
  All,
  Active,
  Inactive,
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

export interface GoogleImageResults {
  meta: GoogleImageMeta;
  image_results: GoogleImageItem[];
}

export interface GoogleImageMeta {
  api_key: string;
  q: string;
  gl?: string;
  hl?: string;
  safe?: string;
}

export interface GoogleImageItem {
  title: string;
  link: string;
  source: string;
  thumbnail: string;
  original: string;
  rank: number;
}

export interface StepCountRecord {
  id: number;
  fecha_registro: string;
  cantidad: number;
}
