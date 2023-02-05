import moment from 'moment';
import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {PatientExerciseListItem} from '../../../../../../models/Patients';
import {dateToDayMonth} from '../../../../../../utils/Utils';
import {default as theme} from '../../../../../../../custom-theme.json';
import PatientExerciseItemView from './PatientExerciseItemView';

interface Props {
  data: PatientExerciseListItem[];
  currentDate: Date;
}

const PatientExercisesListView = ({data, currentDate}: Props) => {
  const renderItem = (item: PatientExerciseListItem) => (
    <PatientExerciseItemView item={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{dateToDayMonth(currentDate)}</Text>
      <FlatList
        style={{width: '100%'}}
        contentContainerStyle={{paddingLeft: 10, paddingVertical: 20}}
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
  title: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: theme['color-primary-700'],
    fontWeight: '600',
    marginTop: 15,
  },
});

export default PatientExercisesListView;
