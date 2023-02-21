import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {VerticalInfoCard} from '../../../../../../components/Cards';
import {
  PatientProgress,
  patientProgressToKeyValues,
} from '../../../../../../models/Patients';
import EmptyView from '../../../../../../components/EmptyView';
import Text from '../../../../../../components/Text';
import {FontWeight} from '../../../../../../models/Common';

interface Props {
  data: PatientProgress | null;
}

const PatientDataView = ({data}: Props) => {
  const items = patientProgressToKeyValues(data);

  return (
    <View style={styles.container}>
      {data && (
        <View style={styles.lastUpdateContainer}>
          <Text weight={FontWeight.Medium}>Última actualización</Text>
          <Text style={styles.lastUpdateContent}>
            {new Date(data.fecha_registro).toLocaleString('es')}
          </Text>
        </View>
      )}
      <FlatList
        data={items.slice()}
        ListEmptyComponent={<EmptyView message="No hay datos registrados" />}
        renderItem={item => (
          <VerticalInfoCard title={item.item.key} content={item.item.value} />
        )}
        keyExtractor={item => `patient-data-item-${item.key}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // minHeight: Dimensions.get('window').height,
  },
  lastUpdateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  lastUpdateContent: {
    fontSize: 14,
    color: 'black',
  },
});

export default PatientDataView;
