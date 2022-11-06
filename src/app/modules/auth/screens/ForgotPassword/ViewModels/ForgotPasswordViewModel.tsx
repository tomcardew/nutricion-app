import {useNavigation} from '@react-navigation/native';
import {RootStore} from '../../../../../store/LoginStore';

class ForgotPasswordViewModel {
  store: RootStore;
  navigation: any;

  constructor(store: RootStore) {
    this.store = store;
    this.navigation = useNavigation();
  }

  didChangeEmail = (newValue: string) => {
    this.store.setEmail(newValue);
  };

  sendEmail = () => {
    this.store.sendEmail();
  };

  goBack = () => {
    this.navigation.goBack();
  };

  dismissAlert = () => {
    this.store.alert = null;
  };
}

export default ForgotPasswordViewModel;
