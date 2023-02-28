import {makeAutoObservable} from 'mobx';
import {AlertMessage} from '../../models/Common';

export class PatientExercisesStore {
  public alert: AlertMessage | null = null;
  public loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public dismiss = () => {
    this.alert = null;
  };
}
