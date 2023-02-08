import {makeAutoObservable} from 'mobx';
import AdministratorServices from '../../../services/administrator';
import {
  GalleryItems,
  Patient,
  PatientExerciseListItem,
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
import {AlertActionType, AlertMessage, AlertType} from '../../../models/Common';
import {Asset} from 'react-native-image-picker';

export class PatientsStore {
  public alert: AlertMessage | null = null;
  public loading: boolean = true;
  public refreshing: boolean = false;
  public patients_raw: Patient[] = [];
  public query: string = '';

  public selectedPatient: Patient | null = null;
  public selectedPatientId: string | null = null;

  // PatientGallery
  public patientProgress: PatientProgress | null = null;
  public rawPictures: PatientPicture[] = [];

  // PatientExercisesList
  public currentDate: Date = new Date();
  public patientExercises: PatientExerciseListItem[] = [];

  // PatientExercises
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
  public weight: string = '';
  public note: string = '';

  // PatientDataEditor
  public data_weight: string = '';
  public data_imc: string = '';
  public data_bodyFat: string = '';
  public data_waist: string = '';
  public data_abdomen: string = '';
  public data_hip: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  public getPatients = async (token: string | null) => {
    this.loading = true;
    const patients = await AdministratorServices.getPatients(token ?? '');
    this.loading = false;
    if (patients.success) {
      this.patients_raw = patients.data;
    }
  };

  public setQuery = (query: string) => {
    this.query = query;
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

  public savePatientProgress = async (token: string) => {
    if (this.selectedPatientId) {
      this.loading = true;
      const data = await AdministratorServices.postPatientProgress(
        this.selectedPatientId,
        token,
        {
          peso: this.data_weight + ' kg',
          imc: this.data_imc,
          abdomen: this.data_abdomen,
          cadera: this.data_hip,
          cintura: this.data_waist,
          grasa_corporal: this.data_bodyFat + ' %',
        },
      );
      this.loading = false;
      console.log(data);
      if (data.success) {
        this.alert = {
          type: AlertType.Success,
          title: 'Operación exitosa',
          message: 'El progreso ha sido guardado correctamente',
          showIcon: true,
          actions: [{label: 'Cerrar'}],
        };
      } else {
        this.alert = {
          type: AlertType.Error,
          title: 'Ocurrió un error',
          message: 'El preogreso no pudo ser guardado correctamente',
          showIcon: true,
          actions: [{label: 'Cerrar'}],
          error: data.error,
        };
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

  public clearPictures = () => {
    this.rawPictures = [];
  };

  public getPatientExercises = async (token: string) => {
    if (this.selectedPatientId) {
      this.loading = true;
      const data = await AdministratorServices.getPatientExercises(
        this.selectedPatientId,
        token,
        this.currentDate,
      );
      this.loading = false;
      if (data.succes) {
        this.patientExercises = data.data;
      }
    }
  };

  public cleanExercises = () => {
    this.patientExercises = [];
    this.currentDate = new Date();
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
    this.resetCurrentExercises();
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
    this.resetCurrentExercises();
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

  private resetCurrentExercises() {
    this.currentSeries = undefined;
    this.currentRepetitions = undefined;
    this.currentRest = undefined;
    this.weight = '';
    this.note = '';
  }

  public setWeight(value: string) {
    this.weight = value;
  }

  public setNote(value: string) {
    this.note = value;
  }

  public saveExercise = async (token: string) => {
    if (this.selectedPatientId && this.canSaveExercise) {
      this.loading = true;
      const data = await AdministratorServices.postPatientExercise(
        this.selectedPatientId,
        token,
        {
          nombre_ejercicio: this.selectedExercise ?? 0,
          categoria_ejercicio: this.selectedCategory ?? 0,
          series: this.selectedSerie ?? 0,
          peso: this.weight + 'kg',
          repeticiones: this.selectedRepetition ?? 0,
          descansos: this.selectedRest ?? 0,
          notas: this.note,
        },
      );
      this.loading = false;
      if (data.success) {
        this.alert = {
          type: AlertType.Success,
          title: 'Operación exitosa',
          message: 'El ejercicio ha sido guardado correctamente',
          showIcon: true,
          actions: [{label: 'Cerrar'}],
        };
      } else {
        this.alert = {
          type: AlertType.Error,
          title: 'Ocurrió un error',
          message: 'El ejercicio no pudo ser guardado correctamente',
          showIcon: true,
          actions: [{label: 'Cerrar'}],
          error: data.error,
        };
      }
    }
  };

  public clearExercises() {
    this.categories_raw = [];
    this.currentCategory = undefined;
    this.exercisesByCurrentCategory_raw = null;
    this.currentExercise = undefined;
    this.series_raw = [];
    this.currentSeries = undefined;
    this.repetitions_raw = [];
    this.currentRepetitions = undefined;
    this.rest_raw = [];
    this.currentRest = undefined;
    this.weight = '';
    this.note = '';
  }

  public setSelectedPatientWith(id: string) {
    this.selectedPatientId = id;
  }

  public postPatientActivityPicture = async (token: string, asset: Asset) => {
    if (this.selectedPatientId) {
      this.loading = true;
      const data = await AdministratorServices.postPatientActivityPicture(
        this.selectedPatientId,
        token,
        asset,
      );
      this.loading = false;
      if (data.success) {
        return data;
      } else {
        this.alert = {
          type: AlertType.Error,
          title: 'Ocurrió un error',
          message: 'No se pudo subir la imagen correctamente',
          showIcon: true,
          actions: [{label: 'Cerrar'}],
          error: data.error,
        };
      }
    }
    return null;
  };

  public showPostActivityPicture = (
    onChooseSource: (source: 'camera' | 'library') => void = () => {},
  ) => {
    this.alert = null;
    this.alert = {
      title: 'Subir fotografía',
      message: 'Elige la foto que deseas utilizar',
      showIcon: false,
      type: AlertType.Info,
      actions: [
        {
          label: 'Tomar una foto',
          type: AlertActionType.Action,
          onClick: () => onChooseSource('camera'),
        },
        {
          label: 'Elegir una foto de tu biblioteca',
          type: AlertActionType.Action,
          onClick: () => onChooseSource('library'),
        },
        {
          label: 'Cancelar',
        },
      ],
    };
  };

  get patients() {
    return this.patients_raw.filter(patient =>
      patient.nombre.includes(this.query),
    );
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

  get selectedCategory() {
    if (this.currentCategory) {
      return this.categories_raw[this.currentCategory.row].id;
    }
    return undefined;
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

  get selectedExercise() {
    if (this.currentExercise && this.exercisesByCurrentCategory_raw) {
      return this.exercisesByCurrentCategory_raw[this.currentExercise.row]
        .NombreEjercicio.id;
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

  get selectedSerie() {
    if (this.currentSeries) {
      return this.series_raw[this.currentSeries.row].id;
    }
    return undefined;
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

  get selectedRepetition() {
    if (this.currentRepetitions) {
      return this.repetitions_raw[this.currentRepetitions.row].id;
    }
    return undefined;
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

  get selectedRest() {
    if (this.currentRest) {
      return this.rest_raw[this.currentRest.row].id;
    }
    return undefined;
  }

  get selectedRestValue() {
    if (this.currentRest) {
      return this.rest_raw[this.currentRest.row].descansos;
    }
    return undefined;
  }

  get canSaveExercise() {
    if (
      this.currentCategory &&
      this.currentExercise &&
      this.currentSeries &&
      this.currentRepetitions &&
      this.currentRest &&
      this.weight &&
      this.note
    ) {
      return true;
    }
    return false;
  }

  get canSavePatientProgress() {
    if (
      this.data_weight &&
      this.data_imc &&
      this.data_bodyFat &&
      this.data_waist &&
      this.data_abdomen &&
      this.data_hip
    ) {
      return true;
    }
    return false;
  }
}
