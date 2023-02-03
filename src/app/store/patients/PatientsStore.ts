import {AlertMessage} from '../../../components/Layout/BaseLayoutView';
import {makeAutoObservable} from 'mobx';
import AdministratorServices from '../../../services/administrator';
import {
  GalleryItems,
  Patient,
  PatientPicture,
  PatientProgress,
} from '../../../models/Patients';
import moment from 'moment';
import {
  Category,
  Exercise,
  Repetition,
  Rest,
  Serie,
} from '../../../models/Catalogues';
import CataloguesServices from '../../../services/catalogues';
import {IndexPath} from '@ui-kitten/components';

export class PatientsStore {
  public alert: AlertMessage | null = null;
  public loading: boolean = true;
  public refreshing: boolean = false;
  public patients: Patient[] = [];
  public query: string = '';

  public selectedPatient: Patient | null = null;
  public selectedPatientId: string | null = null;

  // PatientGallery
  public patientProgress: PatientProgress | null = null;
  public rawPictures: PatientPicture[] = [];

  // PatientExercices
  public categories_raw: Category[] = [];
  public currentCategory: IndexPath | undefined = undefined;
  public exercisesByCurrentCategory_raw: Exercise[] | null = null;
  public currentExercise: IndexPath | undefined = undefined;
  public series_raw: Serie[] = [];
  public currentSeries: IndexPath | undefined = undefined;
  public repetitions_raw: Repetition[] = [];
  public currentRepetitions: IndexPath | undefined = undefined;
  public rest_raw: Rest[] = [];
  public currentRest: IndexPath | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  public getPatients = async (token: string | null) => {
    this.loading = true;
    const patients = await AdministratorServices.getPatients(token ?? '');
    this.loading = false;
    this.patients = patients.data;
  };

  public getPatientById = async (token: string) => {
    if (this.selectedPatientId) {
      this.loading = true;
      const data = await AdministratorServices.getPatientById(
        this.selectedPatientId,
        token,
      );
      this.loading = false;
      if (data.success) {
        this.selectedPatient = data.data;
      } else {
        this.selectedPatient = null;
        // TODO: Show error alert
      }
    }
  };

  public getPatientProgress = async (token: string) => {
    if (this.selectedPatientId) {
      this.loading = true;
      const data = await AdministratorServices.getPatientProgress(
        this.selectedPatientId,
        token,
      );
      this.loading = false;
      if (data.success && data.data) {
        this.patientProgress = data.data;
      } else {
        this.patientProgress = null;
        // TODO: Show error alert
      }
    }
  };

  public toggleExercises = async (token: string) => {
    if (this.selectedPatientId) {
      this.loading = true;
      const data = await AdministratorServices.toggleExercises(
        this.selectedPatientId,
        token,
      );
      this.loading = false;
      if (data.success && this.selectedPatient) {
        const newData: Patient = {
          ...this.selectedPatient,
          seccion_ejercicios: !this.selectedPatient.seccion_ejercicios,
        };
        this.selectedPatient = newData;
      }
    }
  };

  public getPatientPictures = async (token: string, refreshing: boolean) => {
    if (this.selectedPatientId) {
      refreshing ? (this.refreshing = true) : (this.loading = true);
      const data = await AdministratorServices.getPatientPictures(
        this.selectedPatientId,
        token,
      );
      refreshing ? (this.refreshing = false) : (this.loading = false);
      if (data.success) {
        this.rawPictures = data.data;
      }
    }
  };

  public getExerciseCategories = async (token: string) => {
    this.loading = true;
    const data = await CataloguesServices.getExerciseCategories(token);
    this.loading = false;
    if (data.success) {
      this.categories_raw = data.data;
      this.exercisesByCurrentCategory_raw = null;
    }
  };

  public setCurrentCategory(path: IndexPath | undefined) {
    this.currentCategory = path;
  }

  public getExercisesByCategory = async (token: string) => {
    if (this.currentCategory) {
      this.loading = true;
      const data = await CataloguesServices.getExercisesByCategory(
        token,
        this.categories_raw[this.currentCategory.row].id,
      );
      this.loading = false;
      if (data.success) {
        this.exercisesByCurrentCategory_raw = data.data;
        this.currentExercise = undefined;
      }
    }
  };

  public setCurrentExercise(path: IndexPath | undefined) {
    this.currentExercise = path;
  }

  public getSeries = async (token: string) => {
    this.loading = true;
    const data = await CataloguesServices.getSeries(token);
    this.loading = false;
    if (data.success) {
      this.series_raw = data.data;
      this.currentSeries = undefined;
    }
  };

  public setCurrentSerie(path: IndexPath | undefined) {
    this.currentSeries = path;
  }

  public getRepetitions = async (token: string) => {
    this.loading = true;
    const data = await CataloguesServices.getRepetitions(token);
    this.loading = false;
    if (data.success) {
      this.repetitions_raw = data.data;
      this.currentRepetitions = undefined;
    }
  };

  public setCurrentRepetition(path: IndexPath | undefined) {
    this.currentRepetitions = path;
  }

  public getRest = async (token: string) => {
    this.loading = true;
    const data = await CataloguesServices.getRest(token);
    this.loading = false;
    if (data.success) {
      this.rest_raw = data.data;
      this.currentRest = undefined;
    }
  };

  public setCurrentRest(path: IndexPath | undefined) {
    this.currentRest = path;
  }

  public setSelectedPatientWith(id: string) {
    this.selectedPatientId = id;
  }

  get preparedPictures() {
    var lists: GalleryItems[] = []; // will contain a list of pictures list separated by month
    this.rawPictures.forEach((item, index) => {
      const date = moment(item.fecha_foto);
      var dateExists = false;
      for (var j in lists) {
        const listItem = lists[j];
        const itemDate = moment(listItem.date);
        const year = itemDate.year();
        const month = itemDate.month();
        if (year === date.year() && month == date.month()) {
          dateExists = true;
          listItem.data.push(item);
          break;
        }
      }
      if (!dateExists) {
        lists.push({
          date: date.toDate(),
          data: [item],
        });
      }
    });
    lists = lists.reverse();
    return lists;
  }

  get categories() {
    return this.categories_raw.map(item => item.categoria);
  }

  get selectedCategoryValue() {
    if (this.currentCategory) {
      return this.categories_raw[this.currentCategory.row].categoria;
    }
    return undefined;
  }

  get exercises() {
    if (this.exercisesByCurrentCategory_raw) {
      return this.exercisesByCurrentCategory_raw.map(
        item => item.NombreEjercicio.nombre_ejercicio,
      );
    }
    return undefined;
  }

  get selectedExerciseValue() {
    if (this.currentExercise && this.exercisesByCurrentCategory_raw) {
      return this.exercisesByCurrentCategory_raw[this.currentExercise.row]
        .NombreEjercicio.nombre_ejercicio;
    }
    return undefined;
  }

  get series() {
    return this.series_raw.map(item => `${item.series}`);
  }

  get selectedSerieValue() {
    if (this.currentSeries) {
      return `${this.series_raw[this.currentSeries.row].series}`;
    }
    return undefined;
  }

  get repetitions() {
    return this.repetitions_raw.map(item => `${item.repeticiones}`);
  }

  get selectedRepetitionValue() {
    if (this.currentRepetitions) {
      return this.repetitions_raw[this.currentRepetitions.row].repeticiones;
    }
    return undefined;
  }

  get rest() {
    return this.rest_raw.map(item => item.descansos);
  }

  get selectedRestValue() {
    if (this.currentRest) {
      return this.rest_raw[this.currentRest.row].descansos;
    }
    return undefined;
  }
}
