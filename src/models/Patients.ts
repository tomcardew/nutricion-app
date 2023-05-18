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

export enum PatientProgresCategories {
  PLIEGUES = 'pliegues',
  PERIMETROS = 'perimetros',
  RESULTADOS = 'resultados',
}

export interface PatientProgress {
  id: number;
  pliegues_Tricipital: number;
  pliegues_Subescapular: number;
  pliegues_Bicipital: number;
  pliegues_Cresta_ilíaca: number;
  pliegues_Supraespinal: number;
  pliegues_Abdominal: number;
  pliegues_Muslo: number;
  pliegues_Pantorrilla: number;
  perimetros_cintura: string;
  perimetros_abdomen: string;
  perimetros_cadera: string;
  perimetros_brazo_contraido: string;
  perimetros_muslo: string;
  perimetros_pantorrilla: string;
  resultados_peso: string;
  resultados_grasa_corporal: string;
  resultados_kg_grasa: string;
  resultados_kg_musculo: string;
  resultados_suma_pliegues: number;
  fecha_registro: string;
}

export interface PatientProgressBody {
  pliegues_Tricipital: number;
  pliegues_Subescapular: number;
  pliegues_Bicipital: number;
  pliegues_Cresta_ilíaca: number;
  pliegues_Supraespinal: number;
  pliegues_Abdominal: number;
  pliegues_Muslo: number;
  pliegues_Pantorrilla: number;
  perimetros_cintura: string;
  perimetros_abdomen: string;
  perimetros_cadera: string;
  perimetros_brazo_contraido: string;
  perimetros_muslo: string;
  perimetros_pantorrilla: string;
  resultados_peso: string;
  resultados_grasa_corporal: string;
  resultados_kg_grasa: string;
  resultados_kg_musculo: string;
  resultados_suma_pliegues: number;
}

export function patientProgressToBody(
  data: PatientProgress,
): PatientProgressBody {
  return {
    ...data,
  };
}

export function patientProgressToKeyValues(
  data: any,
  category: PatientProgresCategories,
) {
  if (!data) {
    return [];
  }
  let ignoreKeys = ['id', 'fecha_registro'];
  let results: KeyValue[] = [];
  let usingCategory: string = category.toString();

  Object.keys(data).forEach(key => {
    if (!ignoreKeys.includes(key) && key.startsWith(usingCategory)) {
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
  categoria: string;
  global_index?: number;
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
