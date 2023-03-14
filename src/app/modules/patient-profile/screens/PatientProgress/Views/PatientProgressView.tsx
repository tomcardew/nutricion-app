import React from 'react';
import {StyleSheet, View, Dimensions, FlatList} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import SimpleCard from '../../../../../../components/Cards/SimpleCard';
import EmptyView from '../../../../../../components/EmptyView';
import PatientProgressGraphView, {GraphData} from './PatientProgressGraphView';

export interface ProgressDataSetElement {
  title: string;
  data: GraphData;
}

interface Props {
  data: ProgressDataSetElement[];
  refreshing?: boolean;
  onRefresh?: () => void;
}

const PatientProgressView = ({
  data,
  refreshing = false,
  onRefresh = () => {},
}: Props) => {
  const renderItem = ({item}: any) => (
    <SimpleCard
      title={item.title.split('_').join(' ')}
      style={{marginBottom: 10, padding: 0}}
      contentStyle={{padding: 0}}>
      <PatientProgressGraphView
        bezier
        data={item.data}
        type={item.title == 'pasos' ? 'column' : 'line'}
      />
    </SimpleCard>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={data.slice()}
        renderItem={renderItem}
        ListEmptyComponent={EmptyView}
        contentContainerStyle={styles.content}
        keyExtractor={item => `patient-progress-graph-${item.title}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width,
    backgroundColor: '#FAFAFA',
  },
  content: {
    padding: 20,
    paddingBottom: 70,
  },
});

export default PatientProgressView;
