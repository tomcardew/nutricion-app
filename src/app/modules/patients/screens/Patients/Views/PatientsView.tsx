import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SearchBar} from '../../../../../../components/Inputs';
import MyPatient from './MyPatient';
import EmptyView from '../../../../../../components/EmptyView';
import {Patient} from '../../../../../../models/Patients';

interface Props {
  query: string;
  data: Patient[];
  onPatientPress?: (id: string) => void;
  didChangeQuery?: () => void;
  onReload?: () => void;
}

const PatientsView = ({
  data,
  query,
  didChangeQuery = () => {},
  onPatientPress = () => {},
  onReload = () => {},
}: Props) => {
  const renderItem = ({item}: any) => (
    <MyPatient data={item} onPress={onPatientPress} />
  );

  return (
    <View style={styles.content}>
      {data.length > 0 && (
        <SearchBar value={query} onChangeText={didChangeQuery} />
      )}
      {data.length == 0 && (
        <EmptyView
          relodable
          message="No hay pacientes registrados"
          onReload={onReload}
        />
      )}
      <FlatList
        data={data.slice()}
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
});

export default PatientsView;
