import {IndexPath} from '@ui-kitten/components';
import {makeAutoObservable} from 'mobx';
import moment from 'moment';
import {AlertMessage, AlertType} from '../../models/Common';
import {Profile} from '../../models/Profile';
import {ScheduleDate} from '../../models/Schedule';
import AdministratorServices from '../../services/administrator';
import PatientServices from '../../services/patient';

export class ScheduleStore {
  public alert: AlertMessage | null = null;
  public loading: boolean = false;

  // Schedule
  public currentDate: Date = new Date();
  public dates_raw: ScheduleDate[] = [];

  // Add schedule
  public patients_raw: Profile[] = [];
  public currentPatient: IndexPath | undefined = undefined;
  public selectedDate: Date = new Date();
  public place: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  public getAllDates = async (token: string) => {
    this.loading = true;
    const data = await AdministratorServices.getAllDates(token);
    this.loading = false;
    if (data.success) {
      this.dates_raw = data.data;
    }
  };

  public getDates = async (token: string) => {
    this.loading = true;
    const data = await PatientServices.getDates(token);
    this.loading = false;
    if (data.success) {
      this.dates_raw = data.data;
    }
  };

  public setCurrentPatient(path: IndexPath | undefined) {
    this.currentPatient = path;
  }

  public getPatients = async (token: string) => {
    this.loading = true;
    const data = await AdministratorServices.getPatients(token);
    this.loading = false;
    if (data.success) {
      this.patients_raw = data.data;
    }
  };

  public saveDate = async (token: string) => {
    const body = {
      fecha_cita: moment(this.selectedDate).format('YYYY-MM-DD HH:mm:00'),
      lugar: this.place,
    };
    if (this.selectedPatient) {
      this.loading = true;
      const data = await AdministratorServices.postPatientDate(
        this.selectedPatient.idUsuario,
        token,
        body,
      );
      this.loading = false;
      if (data.success) {
        this.alert = {
          type: AlertType.Success,
          title: 'Operación exitosa',
          message: 'La cita ha sido guardada correctamente',
          showIcon: true,
          actions: [],
          autoClose: true,
        };
      } else {
        this.alert = {
          type: AlertType.Error,
          title: 'Ocurrió un error',
          message: 'La cita no pudo ser guardada correctamente',
          showIcon: true,
          actions: [],
          error: data.error,
          autoClose: true,
        };
      }
    }
  };

  public clearDateData() {
    this.currentPatient = undefined;
    this.currentDate = new Date();
    this.place = '';
  }

  get dates() {
    const date = moment(this.currentDate);
    const dates = this.dates_raw.filter(item => {
      const scheduleTime = moment.utc(item.fecha_cita);
      return scheduleTime.isSame(date, 'day');
    });
    return dates;
  }

  get patients() {
    return this.patients_raw.map(patient => patient.nombre);
  }

  get selectedPatient() {
    if (this.currentPatient) {
      return this.patients_raw[this.currentPatient.row];
    }
    return undefined;
  }

  get selectedPatientValue() {
    if (this.currentPatient) {
      return `${this.patients_raw[this.currentPatient.row].nombre}`;
    }
    return undefined;
  }

  get canSaveDate() {
    if (this.currentPatient && this.currentDate && this.place) {
      return true;
    }
    return false;
  }
}
