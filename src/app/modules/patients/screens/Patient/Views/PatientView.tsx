import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import {Patient} from '../../Patients/Views/MyPatient';

interface Props {
  data: Patient | null;
}

const PatientView = ({data}: Props) => {
  return (
    <View style={styles.container}>
      {data?.image && (
        <Image style={styles.image} source={{uri: data?.image}} />
      )}
      <View style={styles.content}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  image: {
    width: Dimensions.get('screen').width,
    height: 250,
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default PatientView;
