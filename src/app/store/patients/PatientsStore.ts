import {AlertMessage} from '../../../components/Layout/BaseLayoutView';
import {makeAutoObservable} from 'mobx';
import {Patient} from '../../modules/patients/screens/Patients/Views/MyPatient';
import AdministratorServices from '../../../services/administrator';

export class PatientsStore {
  public alert: AlertMessage | null = null;
  public loading: boolean = true;
  public patients: Patient[] = [];
  public query: string = '';
  public selectedPatient: Patient | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public load = async (token: string | null) => {
    this.loading = true;
    const patients = await AdministratorServices.getPatients(token ?? '');
    this.loading = false;
    this.patients = patients.data;
  };

  public setSelectedPatientWith(id: number) {
    let patient = this.patients.find(patient => patient.idUsuario == id);
    if (patient) {
      this.selectedPatient = patient;
    }
  }
}
