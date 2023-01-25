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
