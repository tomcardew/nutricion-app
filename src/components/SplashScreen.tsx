import {Spinner} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {FontWeight} from '../models/Common';
import {getRandomQuote, theme} from '../utils/Utils';
import {Image} from './Images';
import Text from './Text';
import Environment from '../constants/Environment';

interface Props {}

const SplashScreen = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../public/assets/icon.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text} weight={FontWeight.Bold}>
        {getRandomQuote()}
      </Text>
      <Text weight={FontWeight.Bold} style={styles.textBottom}>
        - Mi Nutri Plan -
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    height: 150,
    width: Dimensions.get('window').width - 40,
    marginTop: 150,
    marginBottom: 60,
  },
  text: {
    textAlign: 'center',
    color: theme['color-primary-700'],
    fontSize: 18,
    marginHorizontal: 20,
  },
  textBottom: {
    bottom: 40,
    position: 'absolute',
    color: 'black',
  },
});

export default SplashScreen;
