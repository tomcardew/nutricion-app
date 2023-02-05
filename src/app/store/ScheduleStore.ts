import {makeAutoObservable} from 'mobx';
import moment from 'moment';
import {AlertMessage} from '../../models/Common';
import {ScheduleDate} from '../../models/Schedule';
import AdministratorServices from '../../services/administrator';

export class ScheduleStore {
  public alert: AlertMessage | null = null;
  public loading: boolean = false;

  // Schedule
  public currentDate: Date = new Date();
  public dates_raw: ScheduleDate[] = [];

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

  get dates() {
    const date = moment(this.currentDate);
    const dates = this.dates_raw.filter(item => {
      const scheduleTime = moment(item.fecha_cita);
      return scheduleTime.isSame(date, 'day') && item.Usuario;
    });
    return dates;
  }
}
