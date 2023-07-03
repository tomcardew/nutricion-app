import React from 'react';
import {StyleSheet, View} from 'react-native';
import CheckboxListItem from '../../../../../../components/CheckboxListItem';
import {PatientObjective} from '../../../../../../models/Patients';
import moment from 'moment';
import {FlatList} from 'react-native-gesture-handler';
import EmptyView from '../../../../../../components/EmptyView';

interface Props {
  data: PatientObjective[];
}

const SinglePatientGoalsView = ({data}: Props) => {
  const renderItem = (item: PatientObjective) => (
    <CheckboxListItem
      title={item.Descripcion}
      date={moment(item.fecha_registro).format('DD/MM/YY')}
      completed={item.completado}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={data.slice()}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
        ListEmptyComponent={
          <EmptyView message="No hay objetivos registrados" />
        }
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => `patient-objetive-${item.id}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SinglePatientGoalsView;
