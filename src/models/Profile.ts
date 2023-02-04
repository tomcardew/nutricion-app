export interface Profile {
  idUsuario: string;
  nombre: string;
  fechaNacimiento: Date;
  email: string;
  urlFoto?: string;
  genero: string;
  esAdministrador: boolean;
  tempToken?: string;
  activo: boolean;
  seccion_ejercicios: boolean;
}
