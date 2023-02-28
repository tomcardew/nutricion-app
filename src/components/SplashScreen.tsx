import {Spinner} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {FontWeight} from '../models/Common';
import {theme} from '../utils/Utils';
import {Image} from './Images';
import Text from './Text';

interface Props {}

const SplashScreen = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../public/assets/splashscreen.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
  },
});

export default SplashScreen;
