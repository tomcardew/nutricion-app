import moment from 'moment';
import {Logger} from '../../../../../../utils/Utils';
import {AuthStore} from '../../../../../store/AuthStore';
import {ScheduleStore} from '../../../../../store/ScheduleStore';

class PatientScheduleViewModel {
  navigation: any;
  authStore: AuthStore;
  scheduleStore: ScheduleStore;

  constructor(
    navigation: any,
    authStore: AuthStore,
    scheduleStore: ScheduleStore,
  ) {
    this.navigation = navigation;
    this.authStore = authStore;
    this.scheduleStore = scheduleStore;
  }

  load = async () => {
    await this.scheduleStore.getDates(this.authStore.token ?? '');
  };

  didChangeDate = async (date: Date) => {
    this.scheduleStore.currentDate = date;
  };

  didChangeDateString = (dateString: string) => {
    this.scheduleStore.currentDate = moment(dateString, 'YYYY/MM/DD').toDate();
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientScheduleViewModel;
