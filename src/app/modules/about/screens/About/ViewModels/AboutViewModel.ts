import ScreenNames from '../../../../../../constants/Screens';

class AboutViewModel {
  navigation: any;

  constructor(navigation: any) {
    this.navigation = navigation;
  }

  didPressSeeReleaseNotes = () => {
    this.navigation.navigate(ScreenNames.ReleaseNotes.toString());
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default AboutViewModel;
