import moment from 'moment';
import ScreenNames from '../../../../../../constants/Screens';
import {AuthStore} from '../../../../../store/AuthStore';
import {ScheduleStore} from '../../../../../store/ScheduleStore';

class ScheduleViewModel {
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
    await this.scheduleStore.getAllDates(this.authStore.token ?? '');
  };

  didChangeDate = async (date: Date) => {
    this.scheduleStore.currentDate = date;
  };

  goToAddSchedule = () => {
    this.navigation.navigate(ScreenNames.AddSchedule.toString());
  };

  didChangeDateString = (dateString: string) => {
    this.scheduleStore.currentDate = moment(dateString, 'YYYY/MM/DD').toDate();
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default ScheduleViewModel;
