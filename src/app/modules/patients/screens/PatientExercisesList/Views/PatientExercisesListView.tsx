import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {PatientExerciseListItem} from '../../../../../../models/Patients';
import PatientExerciseItemView from './PatientExerciseItemView';
import HorizontalDateSelector from '../../../../../../components/HorizontalDateSelector';

interface Props {
  data: PatientExerciseListItem[];
  currentDate: Date;
  didChangeDate: (date: Date) => void;
}

const PatientExercisesListView = ({
  data,
  currentDate,
  didChangeDate = () => {},
}: Props) => {
  const renderItem = (item: PatientExerciseListItem) => (
    <PatientExerciseItemView item={item} />
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
});

export default PatientExercisesListView;
