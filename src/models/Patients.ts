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

export const patientProgresCategoriesLabels = [
  'Pliegues',
  'Perimetros',
  'Resultados',
];

export interface PatientProgress {
  id: number;
  pliegues_Tricipital: any;
  pliegues_Subescapular: any;
  pliegues_Bicipital: any;
  pliegues_Cresta_ilíaca: any;
  pliegues_Supraespinal: any;
  pliegues_Abdominal: any;
  pliegues_Muslo: any;
  pliegues_Pantorrilla: any;
  perimetros_cintura: any;
  perimetros_abdomen: any;
  perimetros_cadera: any;
  perimetros_brazo_contraido: any;
  perimetros_muslo: any;
  perimetros_pantorrilla: any;
  resultados_peso: any;
  resultados_grasa_corporal: any;
  resultados_kg_grasa: any;
  resultados_kg_musculo: any;
  resultados_suma_pliegues: any;
  fecha_registro: string;
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
      results.push({
        name: key.split('_').join(' '),
        key,
        value: data[key],
        properties: {isNumeric: usingCategory === 'pliegues'},
      });
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
