import React from 'react';
import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import {VerticalInfoCard} from '../../../../../../components/Cards';
import {
  PatientProgresCategories,
  PatientProgress,
  patientProgressToKeyValues,
} from '../../../../../../models/Patients';
import EmptyView from '../../../../../../components/EmptyView';
import {PillButton} from '../../../../../../components/Buttons';
import ProfileStepsCard from '../../../../patient-profile/screens/Profile/Views/ProfileStepsCard';
import HorizontalScroller from '../../../../../../components/HorizontalScroller';

interface Props {
  data: PatientProgress | null;
  selectedCategory: PatientProgresCategories;
  stepCount?: number;

  didChangeCategory?: (category: PatientProgresCategories) => void;
}

const PatientDataView = ({
  data,
  selectedCategory,
  stepCount = 0,
  didChangeCategory = () => {},
}: Props) => {
  const items = patientProgressToKeyValues(data, selectedCategory);

  return (
    <View style={styles.container}>
      <ProfileStepsCard
        simple
        style={{
          marginTop: 20,
          width: Dimensions.get('window').width,
        }}
        goal={5000}
        count={stepCount}
      />
      <HorizontalScroller>
        <PillButton
          title="Pliegues"
          style={{marginRight: 10}}
          selected={selectedCategory === PatientProgresCategories.PLIEGUES}
          onPress={() => didChangeCategory(PatientProgresCategories.PLIEGUES)}
        />
        <PillButton
          title="Perimetros"
          style={{marginRight: 10}}
          selected={selectedCategory === PatientProgresCategories.PERIMETROS}
          onPress={() => didChangeCategory(PatientProgresCategories.PERIMETROS)}
        />
        <PillButton
          title="Resultados"
          selected={selectedCategory === PatientProgresCategories.RESULTADOS}
          onPress={() => didChangeCategory(PatientProgresCategories.RESULTADOS)}
        />
      </HorizontalScroller>
      <FlatList
        data={items.slice()}
        contentContainerStyle={{paddingBottom: 50}}
        ListEmptyComponent={<EmptyView message="No hay datos registrados" />}
        renderItem={item => (
          <VerticalInfoCard
            title={item.item.name ?? ''}
            content={item.item.value}
          />
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

export default PatientDataView;
