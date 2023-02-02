import {KeyValue} from '../utils/Utils';

export interface Patient {
  idUsuario: string;
  nombre: string;
  fechaNacimiento: Date;
  email: string;
  urlFoto?: any;
  genero: string;
  esAdministrador: boolean;
  tempToken?: any;
  activo: boolean;
  seccion_ejercicios: boolean;
}

export interface PatientProgress {
  id: number;
  peso: string;
  imc: string;
  grasa_corporal: string;
  cintura: string;
  abdomen: string;
  cadera: string;
  pasos: number;
  fecha_registro: string;
}

export function patientProgressToKeyValues(data: any) {
  if (!data) {
    return [];
  }
  let ignoreKeys = ['id', 'fecha_registro'];
  let results: KeyValue[] = [];
  Object.keys(data).forEach(key => {
    if (!ignoreKeys.includes(key)) {
      results.push({key: key.split('_').join(' '), value: data[key]});
    }
  });

  return results;
}

export interface GalleryItems {
  date: Date;
  data: PatientPicture[];
}

export interface PatientPicture {
  id: number;
  url: string;
  fecha_foto: string;
}
