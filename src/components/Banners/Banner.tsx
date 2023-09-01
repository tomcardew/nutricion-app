import React from 'react';
import {StyleSheet, StyleProp, ViewStyle, Dimensions} from 'react-native';
import {Layout} from '@ui-kitten/components';
import Image from '../Images/Image';
import Text from '../Text';
import {FontWeight} from '../../models/Common';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../../utils/Utils';

interface Props {
  imageUrl?: string;
  title?: string;

  style?: StyleProp<ViewStyle>;
}

const Banner = ({imageUrl = '', title = '', style}: Props) => {
  const dimmedColor = theme['color-primary-600'] + '00';

  return (
    <Layout style={[styles.container, style]} level="3">
      <Image
        style={styles.image}
        source={require('../../../public/assets/images/pattern.png')}
      />
      <Text weight={FontWeight.SemiBold} style={styles.text}>
        {title}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    fontSize: 32,
    color: theme['color-primary-900'],
    textAlign: 'center',
    padding: 20,
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default Banner;
