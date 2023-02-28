import {KeyValue} from '../utils/Utils';
import {Category, ExerciseName, Serie, Repetition, Rest} from './Catalogues';

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

export interface PatientProgressBody {
  peso: string;
  imc: string;
  grasa_corporal: string;
  cintura: string;
  abdomen: string;
  cadera: string;
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

export interface PatientExerciseBody {
  nombre_ejercicio: number;
  categoria_ejercicio: number;
  series: number;
  peso: string;
  repeticiones: number;
  descansos: number;
  notas: string;
}

export interface PatientExerciseListItem {
  id: number;
  fecha_ejercicio: string;
  completado: boolean;
  Peso: string;
  Notas: string;
  Categoria_ejercicio: Category;
  Nombre_ejercicio: ExerciseName;
  Series: Serie;
  Repeticiones: Repetition;
  Descansos: Rest;
}
