import moment from 'moment';
import {PatientPicture} from '../models/Patients';
import Environment from '../constants/Environment';

export const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const parseDate = (date: Date) => {
  let month_number = date.getMonth();
  let month = MONTHS[month_number];
  return month;
};

export const nameToFirstLetters = (fullname: string) => {
  const names = fullname.split(' ');
  const initialLetters = names.map(item => {
    return item[0];
  });
  return initialLetters.join('');
};

export interface KeyValue {
  key: string;
  value: any;
}

export const dateToMonthYear = (date: Date) => {
  const _date = moment(date);
  return `${MONTHS[_date.month()]} ${_date.year()}`;
};

export const distributeItems = (data: PatientPicture[]) => {
  let listA: PatientPicture[] = [];
  let listB: PatientPicture[] = [];
  let listC: PatientPicture[] = [];

  data.forEach((item, index) => {
    if (index % 3 == 0) {
      listA.push(item);
    } else if (index % 3 == 1) {
      listB.push(item);
    } else {
      listC.push(item);
    }
  });
  return [listA, listB, listC];
};

export const replaceLocalhost = (url: string) => {
  const host = Environment.URL + ':' + Environment.PORT;
  return url.replace('http://localhost:4000', host);
};
