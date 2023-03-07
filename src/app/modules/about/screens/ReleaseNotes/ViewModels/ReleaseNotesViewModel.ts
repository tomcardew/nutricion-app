import {Logger} from '../../../../../../utils/Utils';
import {AuthStore} from '../../../../../store/AuthStore';

class ReleaseNotesViewModel {
  navigation: any;
  authStore: AuthStore;

  constructor(navigation: any, authStore: AuthStore) {
    this.navigation = navigation;
    this.authStore = authStore;
  }

  getReleaseNotes = async () => {
    this.authStore.loading = true;
    const response = await fetch(
      'https://raw.githubusercontent.com/tomcardew/nutricion-app/develop/release_notes.md',
    );
    const text = await response.text();
    this.authStore.releaseNotes = text;
    this.authStore.loading = false;
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default ReleaseNotesViewModel;
