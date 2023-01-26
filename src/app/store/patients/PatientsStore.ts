import {AlertMessage} from '../../../components/Layout/BaseLayoutView';
import {makeAutoObservable} from 'mobx';
import AdministratorServices from '../../../services/administrator';
import {Patient, PatientProgress} from '../../../models/Patients';

export class PatientsStore {
  public alert: AlertMessage | null = null;
  public loading: boolean = true;
  public patients: Patient[] = [];
  public query: string = '';

  public selectedPatient: Patient | null = null;
  public selectedPatientId: string | null = null;

  public patientProgress: PatientProgress | null = null;

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

  public setSelectedPatientWith(id: string) {
    this.selectedPatientId = id;
  }
}
