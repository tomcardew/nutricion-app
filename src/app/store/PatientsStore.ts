import { makeAutoObservable } from "mobx";
import AdministratorServices from "../../services/administrator";
import {
  GalleryItems,
  PatientProgresCategories,
  Patient,
  PatientExerciseListItem,
  PatientPicture,
  PatientProgress,
} from "../../models/Patients";
import moment from "moment";
import {
  Category,
  Exercise,
  Repetition,
  Rest,
  Serie,
} from "../../models/Catalogues";
import CataloguesServices from "../../services/catalogues";
import { IndexPath } from "@ui-kitten/components";
import {
  AlertActionType,
  AlertMessage,
  AlertType,
  GalleryCategory,
  GoogleImageItem,
  GoogleImageResults,
  MediaType,
  PatientsCategory,
  UserType,
} from "../../models/Common";
import { Asset } from "react-native-image-picker";
import PatientServices from "../../services/patient";
import { Logger, toGalleryCategory, typeOfAsset } from "../../utils/Utils";
import CommonServices from "../../services/common";

export class PatientsStore {
  public alert: AlertMessage | null = null;
  public loaded = false;
  public loading = true;
  public refreshing = false;
  public patients_raw: Patient[] = [];
  public query = "";
  public selectedPatientsList: PatientsCategory = PatientsCategory.All;

  public loadingSelectedPatient = true;
  public selectedPatient: Patient | null = null;
  public selectedPatientId: string | null = null;

  // PatientGallery
  public patientProgress: PatientProgress | null = null;
  public rawPictures: PatientPicture[] = [];
  public selectedGalleryCategory: GalleryCategory = GalleryCategory.Activities;
  public patientStepCount = 0;

  // AdminExercisesList
  public currentDate: Date = new Date();
  public selectedAdminExercise: PatientExerciseListItem | null = null;
  public AdminExercises: PatientExerciseListItem[] = [];

  // Comments
  public commentTextPrompt = "";

  // AdminExercises
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
  public weight = "";
  public note = "";

  // PatientDataEditor
  public reloader = false;
  public selectedProgressCategory: PatientProgresCategories =
    PatientProgresCategories.PLIEGUES;
  public currentProgressCategory: IndexPath | undefined = undefined;
  public dataPatientProgress: PatientProgress = {
    id: 0,
    pliegues_Tricipital: 0,
    pliegues_Subescapular: 0,
    pliegues_Bicipital: 0,
    pliegues_Cresta_ilíaca: 0,
    pliegues_Supraespinal: 0,
    pliegues_Abdominal: 0,
    pliegues_Muslo: 0,
    pliegues_Pantorrilla: 0,
    perimetros_cintura: "",
    perimetros_abdomen: "",
    perimetros_cadera: "",
    perimetros_brazo_contraido: "",
    perimetros_muslo: "",
    perimetros_pantorrilla: "",
    resultados_peso: "",
    resultados_grasa_corporal: "",
    resultados_kg_grasa: "",
    resultados_kg_musculo: "",
    resultados_suma_pliegues: 0,
    fecha_registro: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  public getPatients = async (token: string | null) => {
    this.loading = true;
    const patients = await AdministratorServices.getPatients(token ?? "");
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
      this.loadingSelectedPatient = true;
      const data = await AdministratorServices.getPatientById(
        this.selectedPatientId,
        token
      );
      this.loadingSelectedPatient = false;
      if (data.success) {
        this.selectedPatient = data.data;
        this.loaded = true;
      } else {
        this.selectedPatient = null;
        this.selectedPatientId = null;
        Logger.error("Error getting patient by Id", data);
      }
    }
  };

  public getExerciseImage = async () => {
    if (this.selectedAdminExercise) {
      const data: GoogleImageResults =
        await CataloguesServices.getExerciseImage(
          this.selectedAdminExercise.Nombre_ejercicio.nombre_ejercicio
        );
      data.image_results.every((asset: GoogleImageItem) => {
        if (
          [MediaType.Image, MediaType.Video].includes(
            typeOfAsset(asset.original)
          ) &&
          this.selectedAdminExercise
        ) {
          this.selectedAdminExercise.Nombre_ejercicio.url_gif = asset.original;
          return false;
        }
        return true;
      });
    }
  };

  public getPatientProgress = async (token: string) => {
    if (this.selectedPatientId) {
      this.loading = true;
      const data = await AdministratorServices.getPatientProgress(
        this.selectedPatientId,
        token
      );
      this.loading = false;
      if (data.success && data.data) {
        this.patientProgress = data.data;
        this.dataPatientProgress = data.data;
      } else {
        this.patientProgress = null;
        // TODO: Show error alert
      }
    }
  };

  public getPatientSteps = async (token: string) => {
    if (this.selectedPatientId) {
      const data = await AdministratorServices.getSteps(
        token,
        this.selectedPatientId,
        new Date()
      );
      if (data.succes && data.data) {
        const lastValue = data.data.pop();
        this.patientStepCount = lastValue?.cantidad ?? 0;
      }
    }
  };

  public savePatientProgress = async (token: string) => {
    if (this.selectedPatientId) {
      this.loading = true;
      const body: any = { ...this.dataPatientProgress };
      delete body.id;
      delete body.fecha_registro;
      const data = await AdministratorServices.postPatientProgress(
        this.selectedPatientId,
        token,
        body
      );
      this.loading = false;
      if (data.success) {
        this.alert = {
          type: AlertType.Success,
          title: "Operación exitosa",
          message: "El progreso ha sido guardado correctamente",
          showIcon: true,
          actions: [],
          autoClose: true,
        };
      } else {
        this.alert = {
          type: AlertType.Error,
          title: "Ocurrió un error",
          message: "El progreso no pudo ser guardado correctamente",
          showIcon: true,
          actions: [],
          autoClose: true,
          error: data.error,
        };
      }
    }
  };

  public cleanPatientProgress = () => {
    this.dataPatientProgress = {
      id: 0,
      pliegues_Tricipital: 0,
      pliegues_Subescapular: 0,
      pliegues_Bicipital: 0,
      pliegues_Cresta_ilíaca: 0,
      pliegues_Supraespinal: 0,
      pliegues_Abdominal: 0,
      pliegues_Muslo: 0,
      pliegues_Pantorrilla: 0,
      perimetros_cintura: "",
      perimetros_abdomen: "",
      perimetros_cadera: "",
      perimetros_brazo_contraido: "",
      perimetros_muslo: "",
      perimetros_pantorrilla: "",
      resultados_peso: "",
      resultados_grasa_corporal: "",
      resultados_kg_grasa: "",
      resultados_kg_musculo: "",
      resultados_suma_pliegues: 0,
      fecha_registro: "",
    };
  };

  public toggleExercises = async (token: string) => {
    if (this.selectedPatientId) {
      this.loading = true;
      const data = await AdministratorServices.toggleExercises(
        this.selectedPatientId,
        token
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
        token
      );
      refreshing ? (this.refreshing = false) : (this.loading = false);
      if (data.success) {
        const values: PatientPicture[] = data.data;
        values.forEach((item, index) => {
          item.global_index = index;
        });
        this.rawPictures = values;
      }
    }
  };

  public getActivityPictures = async (token: string, refreshing: boolean) => {
    refreshing ? (this.refreshing = true) : (this.loading = true);
    const data = await PatientServices.getActivityPictures(token);
    refreshing ? (this.refreshing = false) : (this.loading = false);
    if (data.success) {
      const values: PatientPicture[] = data.data;
      values.forEach((item, index) => {
        item.global_index = index;
      });
      this.rawPictures = values;
    }
  };

  public clearPictures = () => {
    this.rawPictures = [];
  };

  public getAdminExercises = async (token: string) => {
    if (this.selectedPatientId) {
      this.loading = true;
      const data = await AdministratorServices.getAdminExercises(
        this.selectedPatientId,
        token,
        this.currentDate
      );
      this.loading = false;
      if (data.succes) {
        this.AdminExercises = data.data;
      }
    }
  };

  public getPatientExercises = async (token: string, date: Date) => {
    this.loading = true;
    this.currentDate = date;
    const data = await PatientServices.getPatientExercises(token);
    this.loading = false;
    if (data.success) {
      this.AdminExercises = data.data.filter((item: any) =>
        moment
          .utc(item.fecha_ejercicio)
          .isSame(moment.utc(this.currentDate), "day")
      );
    }
  };

  public addComment = async (token: string, isAdmin: boolean) => {
    this.loading = true;
    const data = await CommonServices.addComment(
      token,
      this.commentTextPrompt.trim(),
      isAdmin ? UserType.Admin : UserType.Patient,
      this.selectedPatientId ?? undefined,
      this.selectedAdminExercise
        ? `${this.selectedAdminExercise.id}`
        : undefined
    );
    this.loading = false;

    if (data.success) {
      this.alert = {
        type: AlertType.Success,
        title: "Operación exitosa",
        message: "El comentario ha sido enviado",
        showIcon: true,
        actions: [],
        autoClose: true,
      };
      await this.refreshExerciseDetails(token, isAdmin);
      this.commentTextPrompt = "";
    } else {
      this.alert = {
        type: AlertType.Error,
        title: "Ocurrió un error",
        message: "El comentario no se pudo enviar",
        showIcon: true,
        actions: [],
        autoClose: true,
        error: data.error,
      };
    }
  };

  public refreshExerciseDetails = async (token: string, isAdmin: boolean) => {
    if (isAdmin) {
      await this.getAdminExercises(token);
    } else {
      await this.getPatientExercises(token, this.currentDate);
    }
    const newElement = this.AdminExercises.find(
      (item) => item.id === this.selectedAdminExercise?.id
    );
    if (newElement) {
      this.selectedAdminExercise = newElement;
    }
  };

  public showExerciseCompletionAlert = (token: string, id: number) => {
    this.alert = {
      title: "Completar ejercicio",
      message: "¿Deseas marcar este ejercicio como completado?",
      showIcon: true,
      type: AlertType.Warning,
      actions: [
        {
          label: "Si, completar",
          onClick: async () => {
            const success = await this.markExerciseAsCompleted(token, id);
            if (success) {
              this.alert = null;
              this.getPatientExercises(token, this.currentDate);
              this.selectedAdminExercise = null;
            }
          },
          type: AlertActionType.Action,
        },
        {
          label: "Cancelar",
          type: AlertActionType.Cancel,
        },
      ],
      autoClose: false,
    };
  };

  public markExerciseAsCompleted = async (token: string, id: number) => {
    this.loading = true;
    const data = await PatientServices.markExerciseAsCompleted(id, token);
    this.loading = false;
    return data.success;
  };

  public showDeleteExerciseAlert = (onDelete = () => {}) => {
    this.alert = {
      title: "Eliminar ejercicio",
      message:
        "¿De verdad quieres eliminar el ejercicio? No podrá ser recuperado.",
      showIcon: true,
      type: AlertType.Warning,
      actions: [
        {
          label: "Si, eliminar",
          type: AlertActionType.Destructive,
          onClick: onDelete,
        },
        {
          label: "Cancelar",
          type: AlertActionType.Cancel,
        },
      ],
      autoClose: false,
    };
  };

  public deleteExercise = async (token: string) => {
    if (this.selectedPatientId) {
      this.loading = true;
      const data = await AdministratorServices.deleteExercise(
        token,
        this.selectedPatientId,
        this.selectedAdminExercise?.id ?? 0
      );
      this.loading = false;
      if (data.success) {
        this.selectedAdminExercise = null;
      } else {
        this.alert = {
          type: AlertType.Error,
          title: "Ocurrió un error",
          message: "El ejercicio no pudo ser eliminado correctamente",
          showIcon: true,
          actions: [],
          autoClose: true,
          error: data.error,
        };
      }
    }
  };

  public cleanExercises = () => {
    this.AdminExercises = [];
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
        this.categories_raw[this.currentCategory.row].id
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
    this.weight = "";
    this.note = "";
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
          peso: this.weight + "kg",
          repeticiones: this.selectedRepetition ?? 0,
          descansos: this.selectedRest ?? 0,
          notas: this.note,
        }
      );
      this.loading = false;
      if (data.success) {
        this.alert = {
          type: AlertType.Success,
          title: "Operación exitosa",
          message: "El ejercicio ha sido guardado correctamente",
          showIcon: true,
          actions: [],
          autoClose: true,
        };
      } else {
        this.alert = {
          type: AlertType.Error,
          title: "Ocurrió un error",
          message: "El ejercicio no pudo ser guardado correctamente",
          showIcon: true,
          actions: [],
          autoClose: true,
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
    this.weight = "";
    this.note = "";
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
        this.selectedGalleryCategory
      );
      this.loading = false;
      if (data.success) {
        return data;
      } else {
        this.alert = {
          type: AlertType.Error,
          title: "Ocurrió un error",
          message: "No se pudo subir la imagen correctamente",
          showIcon: true,
          actions: [],
          autoClose: true,
          error: data.error,
        };
      }
    }
    return null;
  };

  public postActivityPicture = async (
    token: string,
    asset: Asset,
    category: GalleryCategory
  ) => {
    this.loading = true;
    const data = await PatientServices.postActivityPicture(
      token,
      asset,
      category
    );
    this.loading = false;
    if (data.success) {
      return data;
    } else {
      this.alert = {
        type: AlertType.Error,
        title: "Ocurrió un error",
        message: "No se pudo subir la imagen correctamente",
        showIcon: true,
        actions: [],
        autoClose: true,
        error: data.error,
      };
      return null;
    }
  };

  public showPostActivityPicture = (
    isAdmin: boolean,
    onChooseSource: (source: "camera" | "library") => void = () => undefined
  ) => {
    this.alert = null;
    this.alert = {
      title: "Subir fotografía",
      message: `Elige la foto que deseas utilizar${
        isAdmin ? ". Se guardará en la categoría seleccionada." : ""
      }`,
      showIcon: false,
      type: AlertType.Info,
      actions: [
        {
          label: "Tomar una foto",
          type: AlertActionType.Action,
          onClick: () => onChooseSource("camera"),
        },
        {
          label: "Elegir una foto de tu biblioteca",
          type: AlertActionType.Action,
          onClick: () => onChooseSource("library"),
        },
        {
          label: "Cancelar",
          type: AlertActionType.Cancel,
        },
      ],
      autoClose: false,
    };
  };

  public showToggleDisableAccessAlert = (onContinue: () => void) => {
    this.alert = null;
    this.alert = {
      title: "Desactivar acceso",
      message:
        "¿Estás seguro? El usuario perderá acceso a la aplicación hasta que lo reactives.",
      showIcon: true,
      type: AlertType.Warning,
      actions: [
        {
          label: "Estoy seguro",
          type: AlertActionType.Destructive,
          onClick: onContinue,
        },
        {
          label: "Cancelar",
          type: AlertActionType.Cancel,
        },
      ],
      autoClose: false,
    };
  };

  public showToggleEnableAccessAlert = (onContinue: () => void) => {
    this.alert = null;
    this.alert = {
      title: "Activar acceso",
      message:
        "¿Estás seguro? El usuario podrá volver a iniciar sesión en su cuenta.",
      showIcon: true,
      type: AlertType.Warning,
      actions: [
        {
          label: "Estoy seguro",
          type: AlertActionType.Action,
          onClick: onContinue,
        },
        {
          label: "Cancelar",
          type: AlertActionType.Cancel,
        },
      ],
      autoClose: false,
    };
  };

  public toggleAccess = async (token: string) => {
    if (this.selectedPatient) {
      this.loading = true;
      const data = await AdministratorServices.toggleAccess(
        this.selectedPatient.idUsuario,
        token
      );
      this.loading = false;
      if (data.success) {
        return data;
      } else {
        this.alert = {
          type: AlertType.Error,
          title: "Ocurrió un error",
          message: "No se pudo completar la operación",
          showIcon: true,
          actions: [],
          autoClose: true,
          error: data.error,
        };
        return null;
      }
    }
  };

  public showSelectDietDocument = (onContinue: () => void) => {
    this.alert = null;
    this.alert = {
      title: "Actualizar dieta",
      message:
        "Seleccione de sus archivos el documento en formato PDF que desea asignar al paciente.",
      showIcon: true,
      type: AlertType.Info,
      actions: [
        {
          label: "Continuar",
          type: AlertActionType.Action,
          onClick: onContinue,
        },
        {
          label: "Cancelar",
          type: AlertActionType.Cancel,
        },
      ],
      autoClose: false,
    };
  };

  public uploadDiet = async (token: string, asset: Asset) => {
    if (this.selectedPatient) {
      this.loading = true;
      const data = await AdministratorServices.uploadPatientDiet(
        this.selectedPatient.idUsuario,
        token,
        asset
      );
      this.loading = false;
      if (data.success) {
        return data;
      } else {
        this.alert = {
          type: AlertType.Error,
          title: "Ocurrió un error",
          message: "No se pudo completar la operación",
          showIcon: true,
          actions: [],
          autoClose: true,
          error: data.error,
        };
        return null;
      }
    }
  };

  public showUploadDietSuccess = () => {
    this.alert = null;
    this.alert = {
      title: "Dieta actualizada",
      message: "Se ha actualizado la dieta con éxito",
      showIcon: true,
      type: AlertType.Success,
      actions: [],
      autoClose: true,
    };
  };

  get patients() {
    let filteredList = this.patients_raw;
    switch (this.selectedPatientsList) {
      case PatientsCategory.Inactive:
        filteredList = this.patients_raw.filter((patient) => !patient.activo);
        break;
      case PatientsCategory.Active:
        filteredList = this.patients_raw.filter((patient) => patient.activo);
        break;
      default:
        break;
    }
    return filteredList.filter((patient) =>
      patient.nombre.includes(this.query)
    );
  }

  get preparedPictures() {
    let lists: GalleryItems[] = []; // will contain a list of pictures list separated by month
    this.rawPictures.forEach((item) => {
      if (toGalleryCategory(item.categoria) == this.selectedGalleryCategory) {
        const date = moment.utc(item.fecha_foto);
        let dateExists = false;
        for (const j in lists) {
          const listItem = lists[j];
          const itemDate = moment.utc(listItem.date);
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
      }
    });
    lists = lists.reverse();
    lists.forEach((item) => {
      item.data = item.data.reverse();
    });
    return lists;
  }

  get preparedPicturesAssetList() {
    const originalList = this.rawPictures;
    const uriList = originalList.map((item) => {
      return { uri: item.url };
    });
    return uriList;
  }

  get categories() {
    return this.categories_raw.map((item) => item.categoria);
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
        (item) => item.NombreEjercicio.nombre_ejercicio
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
    return this.series_raw.map((item) => `${item.series}`);
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
    return this.repetitions_raw.map((item) => `${item.repeticiones}`);
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
    return this.rest_raw.map((item) => item.descansos);
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
    // if (
    //   this.data_weight &&
    //   this.data_imc &&
    //   this.data_bodyFat &&
    //   this.data_waist &&
    //   this.data_abdomen &&
    //   this.data_hip
    // ) {
    //   return true;
    // }
    return false;
  }
}
