import { PatientProgress } from "./Patients";
import { dateToDayMonthSmall, getRandomInt } from "../utils/Utils";
import moment from "moment";
import "moment/locale/es";

export interface Profile {
  idUsuario: string;
  nombre: string;
  fechaNacimiento: Date;
  email: string;
  contrasena?: string;
  urlFoto?: string;
  genero: string;
  esAdministrador: boolean;
  tempToken?: string;
  activo: boolean;
  seccion_ejercicios: boolean;
  Datos?: PatientProgress[];
}

export function profileDataToGraphData(profile: Profile, key: string) {
  if (profile.Datos && profile.Datos.length > 0) {
    const labels = profile.Datos.map((item) =>
      dateToDayMonthSmall(moment(item.fecha_registro).toDate())
    );
    const values = profile.Datos.map((item) =>
      key === "pasos"
        ? getRandomInt(2000, 5000)
        : parseFloat(`${item[key as keyof PatientProgress]}`)
    );
    return {
      data: [0, ...values],
      labels: labels,
    };
  }
  return undefined;
}

export interface PendingDate {
  label: string;
  hours: string[];
  date: Date;
}

export function pendingDatesToList(list: string[]) {
  let dates = list.map((item) => moment(item));
  dates = dates.sort((a, b) => a.diff(b));
  let items: PendingDate[] = [];
  for (var i = 0; i < dates.length; i += 2) {
    const date = dates[i];
    const place = list[i + 1] ?? "";
    let added = false;
    for (var j = 0; j < items.length; j++) {
      let item = items[j];
      if (moment(item.date).isSame(date, "day")) {
        const hour =
          date.format("hh:mm A") +
          " - " +
          place.replace("Consultorio", "").trim();
        items[j].hours.push(hour);
        added = true;
        break;
      }
    }
    if (!added) {
      const hour =
        date.format("hh:mm A") +
        " - " +
        place.replace("Consultorio", "").trim();
      items.push({
        label: setDateLabel(date.toDate()),
        hours: [hour],
        date: date.toDate(),
      });
    }
  }
  return items;
}

export function setDateLabel(date: Date) {
  moment.locale("es");
  let _date = moment(date);
  if (_date.isSame(new Date(), "day")) return "Hoy";
  if (_date.isSame(moment().add(1, "day"), "day")) return "Mañana";
  return _date.format("DD [de] MMMM");
}
