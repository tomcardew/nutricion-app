import React from 'react';
import {StyleSheet, View, Dimensions, FlatList} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import SimpleCard from '../../../../../../components/Cards/SimpleCard';
import EmptyView from '../../../../../../components/EmptyView';
import PatientProgressGraphView, {GraphData} from './PatientProgressGraphView';
import {PillButton} from '../../../../../../components/Buttons';
import {PatientProgresCategories} from '../../../../../../models/Patients';
import HorizontalScroller from '../../../../../../components/HorizontalScroller';

export interface ProgressDataSetElement {
  title: string;
  data: GraphData;
}

interface Props {
  data: ProgressDataSetElement[];
  category: PatientProgresCategories;
  refreshing?: boolean;
  onRefresh?: () => void;
  didChangeCategory?: (category: PatientProgresCategories) => void;
}

const PatientProgressView = ({
  data,
  category,
  refreshing = false,
  onRefresh = () => {},
  didChangeCategory = () => {},
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
      <HorizontalScroller>
        <PillButton
          title="Pliegues"
          style={{marginRight: 10}}
          selected={category === PatientProgresCategories.PLIEGUES}
          onPress={() => didChangeCategory(PatientProgresCategories.PLIEGUES)}
        />
        <PillButton
          title="Perimetros"
          style={{marginRight: 10}}
          selected={category === PatientProgresCategories.PERIMETROS}
          onPress={() => didChangeCategory(PatientProgresCategories.PERIMETROS)}
        />
        <PillButton
          title="Resultados"
          selected={category === PatientProgresCategories.RESULTADOS}
          onPress={() => didChangeCategory(PatientProgresCategories.RESULTADOS)}
        />
      </HorizontalScroller>
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
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: '#00000010',
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default PatientProgressView;
