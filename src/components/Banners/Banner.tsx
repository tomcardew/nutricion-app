import React from 'react';
import {
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
  Dimensions,
  View,
} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {default as theme} from '../../../custom-theme.json';

interface Props {
  imageUrl?: string;
  title?: string;

  style?: StyleProp<ViewStyle>;
}

const Banner = ({imageUrl = '', title = '', style}: Props) => {
  return (
    <Layout style={[styles.container, style]} level="3">
      <Image style={styles.image} source={{uri: imageUrl}} />
      <Text style={styles.text}>{title}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'relative',
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.5,
  },
  text: {
    fontWeight: '700',
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    padding: 20,
  },
});

export default Banner;
