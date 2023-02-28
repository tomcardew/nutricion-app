import {Profile} from './Profile';

export interface ScheduleDate {
  id: number;
  fecha_cita: string;
  lugar: string;
  Usuario?: Profile;
}

export interface ScheduleDateBody {
  fecha_cita: string;
  lugar: string;
}
