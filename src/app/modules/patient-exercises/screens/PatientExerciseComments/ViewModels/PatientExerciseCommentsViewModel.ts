class PatientExerciseCommentsViewModel {
  navigation: any;

  constructor(navigation: any) {
    this.navigation = navigation;
  }

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientExerciseCommentsViewModel;
