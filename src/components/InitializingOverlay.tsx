import {Spinner} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FontWeight} from '../models/Common';
import {theme} from '../utils/Utils';
import LoaderView from './LoaderView';
import Text from './Text';

interface Props {}

const InitializingOverlay = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Spinner size="large" status="basic" />
      <Text style={styles.title} weight={FontWeight.Bold}>
        Inicializando aplicación
      </Text>
      <Text style={styles.subtitle} weight={FontWeight.Medium}>
        Espera un momento...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme['color-primary-600'],
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
  },
  subtitle: {
    color: 'white',
    opacity: 0.75,
  },
});

export default InitializingOverlay;
