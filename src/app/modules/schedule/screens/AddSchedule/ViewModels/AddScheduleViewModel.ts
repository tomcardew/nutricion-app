import { IndexPath } from "@ui-kitten/components";
import moment from "moment";
import { AlertType } from "../../../../../../models/Common";
import { AuthStore } from "../../../../../store/AuthStore";
import { ScheduleStore } from "../../../../../store/ScheduleStore";

class AddScheduleViewModel {
  navigation: any;
  authStore: AuthStore;
  scheduleStore: ScheduleStore;

  constructor(
    navigation: any,
    authStore: AuthStore,
    scheduleStore: ScheduleStore
  ) {
    this.navigation = navigation;
    this.authStore = authStore;
    this.scheduleStore = scheduleStore;
  }

  load = async () => {
    await this.scheduleStore.getPatients(this.authStore.token ?? "");
  };

  save = async () => {
    await this.scheduleStore.saveDate(this.authStore.token ?? "");
  };

  didChangePatient = (path: IndexPath | IndexPath[]) => {
    if (Array.isArray(path)) {
      this.scheduleStore.setCurrentPatient(path[0]);
      return;
    }
    this.scheduleStore.setCurrentPatient(path);
  };

  didChangeDate = (date: Date | undefined | string) => {
    if (date) {
      const _date = moment(date, "YYYY/MM/DD HH:mm").toDate();
      this.scheduleStore.selectedDate = _date;
    }
  };

  didChangePlace = (path: IndexPath | IndexPath[]) => {
    if (Array.isArray(path)) {
      this.scheduleStore.setCurrentPlace(path[0]);
      return;
    }
    this.scheduleStore.setCurrentPlace(path);
  };

  dismissAlert = () => {
    if (this.scheduleStore.alert?.type == AlertType.Success) {
      this.scheduleStore.clearDateData();
      this.navigation.goBack();
    }
    this.scheduleStore.alert = null;
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default AddScheduleViewModel;
