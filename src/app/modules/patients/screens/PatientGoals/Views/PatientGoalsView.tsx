import React from 'react';
import {StyleSheet, View} from 'react-native';
import CheckboxListItem from '../../../../../../components/CheckboxListItem';
import {FlatList} from 'react-native-gesture-handler';
import EmptyView from '../../../../../../components/EmptyView';
import {PatientObjective} from '../../../../../../models/Patients';
import moment from 'moment';

interface Props {
  data: PatientObjective[];

  onMarkCompleted?: (id: number) => void;
}

const PatientGoalsView = ({data, onMarkCompleted = () => {}}: Props) => {
  const renderItem = (item: PatientObjective) => (
    <CheckboxListItem
      title={item.Descripcion}
      date={moment(item.fecha_registro).format('DD/MM/YY')}
      completed={item.completado}
      onChange={() => !item.completado && onMarkCompleted(item.id)}
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

export default PatientGoalsView;
