import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {}

const PatientProgressView = ({}: Props) => {
  return (
    <View style={styles.container}>
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

export default PatientProgressView;
