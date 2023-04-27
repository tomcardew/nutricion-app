import moment from 'moment';
import { PatientPicture } from '../models/Patients';
import Environment from '../constants/Environment';
import { default as theme } from '../../custom-theme.json';
import { consoleTransport, logger } from 'react-native-logs';
import quotes from '../constants/Quotes';
import { MediaType } from '../models/Common';

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

export const DAYS = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export const DAYS_SHORT = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

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

export const dateToDayMonth = (date: Date) => {
  const _date = moment(date);
  return `${_date.date()} de ${MONTHS[_date.month()]}`;
};

export const dateToDayMonthSmall = (date: Date) => {
  const _date = moment(date);
  const day = _date.date();
  const month = `${_date.month() + 1}`.padStart(2, '0');
  return `${day}/${month}`;
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

export const uriToFileType = (uri: string) => {
  const parts = uri.split('.');
  if (parts.length > 0) {
    return parts[parts.length - 1];
  }
  return null;
};

export const dateToScrollHeight = (date: Date) => {
  const _date = moment(date);
  const hours = _date.hour() * 100;
  const minutes = (_date.minutes() * 100) / 60;
  return hours + minutes - 10;
};

const loggerConfig = {
  levels: {
    debug: 0,
    success: 1,
    info: 2,
    warn: 3,
    error: 4,
  },
  severity: 'debug',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      success: 'greenBright',
      info: 'blueBright',
      warn: 'yellow',
      error: 'redBright',
    },
    fileName: `log_{date-today}`,
  },
  async: true,
  dateFormat: 'time',
  printLevel: false,
  printDate: true,
  enabled: true,
};

export const Logger = logger.createLogger<
  'debug' | 'success' | 'info' | 'warn' | 'error'
>(loggerConfig);

export { theme };

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomQuote = (): string => {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export const typeOfAsset = (url: string): MediaType => {
  const extension = url.split(".").pop()?.toLowerCase()
  switch (extension) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
      return MediaType.Image;
    case "mp4":
      return MediaType.Video;
    case "pdf":
    case "docx":
      return MediaType.Document;
    case "mp3":
      return MediaType.Audio;
    default:
      return MediaType.None
  }
}