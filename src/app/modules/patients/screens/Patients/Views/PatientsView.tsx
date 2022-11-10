import React from 'react';
import {StyleSheet, View, Dimensions, Image, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import MyPatient from './MyPatient';

interface Props {}

const PatientsView = ({}: Props) => {
  const renderItem = ({item}: any) => <MyPatient {...item} />;

  return (
    <View style={styles.content}>
      <FlatList
        data={['0', '1', '2']}
        renderItem={renderItem}
        keyExtractor={item => item}
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
});

export default PatientsView;
