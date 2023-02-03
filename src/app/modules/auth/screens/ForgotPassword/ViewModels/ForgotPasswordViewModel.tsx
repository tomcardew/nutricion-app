import {useNavigation} from '@react-navigation/native';
import {LoginStore} from '../../../../../store/LoginStore';

class ForgotPasswordViewModel {
  store: LoginStore;
  navigation: any;

  constructor(store: LoginStore) {
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
