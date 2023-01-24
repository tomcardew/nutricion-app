import React from 'react';
import {StyleSheet, View, Dimensions, Image, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SearchBar} from '../../../../../../components/Inputs';
import MyPatient, {Patient} from './MyPatient';

interface Props {
  query: string;
  data: Patient[];
  onPatientPress?: (id: number) => void;
  didChangeQuery?: () => void;
}

const PatientsView = ({
  data,
  query,
  didChangeQuery = () => {},
  onPatientPress = () => {},
}: Props) => {
  const renderItem = ({item}: any) => (
    <MyPatient data={item} onPress={onPatientPress} />
  );

  return (
    <View style={styles.content}>
      <SearchBar value={query} onChangeText={didChangeQuery} />
      <FlatList
        data={data}
        numColumns={3}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => `patients-list-${item.id}`}
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
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  listContainer: {
    marginLeft: 0,
  },
});

export default PatientsView;
