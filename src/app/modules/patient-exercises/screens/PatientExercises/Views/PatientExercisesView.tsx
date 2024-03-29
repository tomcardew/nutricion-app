import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {PatientExerciseListItem} from '../../../../../../models/Patients';
import HorizontalDateSelector from '../../../../../../components/HorizontalDateSelector';
import EmptyView from '../../../../../../components/EmptyView';
import PatientExerciseItemView from '../../../../patients/screens/AdminExercisesList/Views/PatientExerciseItemView';

interface Props {
  data: PatientExerciseListItem[];
  currentDate: Date;
  didChangeDate: (date: Date) => void;
  didSelectExercise: (exercise: PatientExerciseListItem) => void;
}

const PatientExercisesView = ({
  data,
  currentDate,
  didChangeDate = () => {},
  didSelectExercise = () => {},
}: Props) => {
  const renderItem = (item: PatientExerciseListItem) => (
    <PatientExerciseItemView
      item={item}
      onPress={() => didSelectExercise(item)}
    />
  );

  return (
    <View style={styles.container}>
      <HorizontalDateSelector
        style={styles.dateContainer}
        value={currentDate}
        didChangeDate={didChangeDate}
      />
      <FlatList
        style={{width: '100%', marginTop: 10}}
        contentContainerStyle={{
          paddingLeft: 10,
          paddingVertical: 20,
          paddingBottom: 150,
        }}
        ListEmptyComponent={
          <EmptyView
            style={styles.emptyView}
            message="No tienes ejercicios para este día"
          />
        }
        data={data.slice()}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => `patient-exercises-item-${item.id}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    width: Dimensions.get('window').width,
  },
  dateContainer: {
    marginTop: 10,
    width: Dimensions.get('window').width - 40,
  },
  emptyView: {
    marginTop: 30,
  },
});

export default PatientExercisesView;
