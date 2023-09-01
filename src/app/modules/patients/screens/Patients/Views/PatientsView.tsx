import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SearchBar} from '../../../../../../components/Inputs';
import MyPatient from './MyPatient';
import EmptyView from '../../../../../../components/EmptyView';
import {Patient} from '../../../../../../models/Patients';
import {PillButton} from '../../../../../../components/Buttons';
import {PatientsCategory} from '../../../../../../models/Common';
import HorizontalScroller from '../../../../../../components/HorizontalScroller';

interface Props {
  query: string;
  data: Patient[];
  category: PatientsCategory;
  onPatientPress?: (id: string) => void;
  didChangeQuery?: (q: string) => void;
  didPressCategory?: (category: PatientsCategory) => void;
  onReload?: () => void;
}

const PatientsView = ({
  data,
  query,
  category = PatientsCategory.All,
  didChangeQuery = () => {},
  onPatientPress = () => {},
  didPressCategory = () => {},
  onReload = () => {},
}: Props) => {
  const renderItem = ({item}: any) => (
    <MyPatient data={item} onPress={onPatientPress} />
  );

  return (
    <View style={styles.content}>
      <HorizontalScroller style={{marginLeft: -20, marginTop: -10}}>
        <PillButton
          title="Todos"
          selected={category == PatientsCategory.All}
          style={styles.pill}
          onPress={() => didPressCategory(PatientsCategory.All)}
        />
        <PillButton
          title="Activos"
          selected={category == PatientsCategory.Active}
          style={styles.pill}
          onPress={() => didPressCategory(PatientsCategory.Active)}
        />
        <PillButton
          title="Inactivos"
          selected={category == PatientsCategory.Inactive}
          onPress={() => didPressCategory(PatientsCategory.Inactive)}
        />
      </HorizontalScroller>
      <SearchBar value={query} onChangeText={didChangeQuery} />
      <FlatList
        data={data.slice()}
        ListEmptyComponent={
          <EmptyView
            relodable
            message="No hay pacientes registrados"
            onReload={onReload}
          />
        }
        numColumns={3}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => `patients-list-${item.idUsuario}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    width: Dimensions.get('window').width,
    minHeight: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 10,
  },
  listContainer: {
    marginLeft: 0,
  },
  pillContainer: {
    flexDirection: 'row',
  },
  pill: {
    marginRight: 10,
  },
});

export default PatientsView;
