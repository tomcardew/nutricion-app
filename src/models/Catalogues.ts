export interface Category {
  id: number;
  categoria: string;
}

export interface Exercise {
  id: number;
  CategoriaEjercicio: Category;
  NombreEjercicio: ExerciseName;
}

export interface ExerciseName {
  id: number;
  nombre_ejercicio: string;
  url_gif?: string;
}

export interface Serie {
  id: number;
  series: number;
}

export interface Repetition {
  id: number;
  repeticiones: string;
}

export interface Rest {
  id: number;
  descansos: string;
}
