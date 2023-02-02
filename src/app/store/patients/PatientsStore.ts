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

export class PatientsStore {
  public alert: AlertMessage | null = null;
  public loading: boolean = true;
  public refreshing: boolean = false;
  public patients: Patient[] = [];
  public query: string = '';

  public selectedPatient: Patient | null = null;
  public selectedPatientId: string | null = null;

  public patientProgress: PatientProgress | null = null;
  public rawPictures: PatientPicture[] = [];

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
}
