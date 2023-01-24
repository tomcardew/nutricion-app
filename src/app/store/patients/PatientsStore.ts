import {AlertMessage} from '../../../components/Layout/BaseLayoutView';
import {makeAutoObservable} from 'mobx';
import {Patient} from '../../modules/patients/screens/Patients/Views/MyPatient';

export class PatientsStore {
  public alert: AlertMessage | null = null;
  public loading: boolean = true;
  public patients: Patient[] = [];
  public query: string = '';
  public selectedPatient: Patient | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public load() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.patients = [
        {
          id: 0,
          name: 'Juan Antonio',
          image:
            'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
        },
        {
          id: 1,
          name: 'Luisa Mariana de Jesus',
          image:
            'https://i.pinimg.com/280x280_RS/e4/86/86/e4868681b6e2cc4ce83c3b9a5d010b6c.jpg',
        },
        {
          id: 2,
          name: 'Ramiro Jesús',
          image:
            'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        },
        {
          id: 3,
          name: 'Elizabeth',
          image:
            'https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg',
        },
      ];
    }, 3000);
  }

  public setSelectedPatientWith(id: number) {
    let patient = this.patients.find(patient => patient.id == id);
    if (patient) {
      this.selectedPatient = patient;
    }
  }
}
