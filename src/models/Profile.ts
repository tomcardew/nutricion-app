import {PatientProgress} from './Patients';
import {dateToDayMonthSmall} from '../utils/Utils';
import moment from 'moment';

export interface Profile {
  idUsuario: string;
  nombre: string;
  fechaNacimiento: Date;
  email: string;
  contrasena?: string;
  urlFoto?: string;
  genero: string;
  esAdministrador: boolean;
  tempToken?: string;
  activo: boolean;
  seccion_ejercicios: boolean;
  Datos?: PatientProgress[];
}

export function profileDataToGraphData(profile: Profile, key: string) {
  if (profile.Datos && profile.Datos.length > 0) {
    const labels = profile.Datos.map(item =>
      dateToDayMonthSmall(moment(item.fecha_registro).toDate()),
    );
    const values = profile.Datos.map(item =>
      parseFloat(`${item[key as keyof PatientProgress]}`),
    );
    return {
      data: values,
      labels: labels,
    };
  }
  return undefined;
}
