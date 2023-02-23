import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {FontWeight} from '../models/Common';
import {theme} from '../utils/Utils';
import Text from './Text';
import {Icon} from '@ui-kitten/components';

interface Props {
  text: string;
  type?: 'danger' | 'info' | 'warning' | 'primary' | 'success';
  hideIndicator?: boolean;
}

const CommonBanner = ({text, type = 'primary', hideIndicator}: Props) => {
  const indicator = () => (
    <Icon style={styles.icon} name="alert-circle-outline" fill="#fff" />
  );

  return (
    <View
      style={[styles.container, {backgroundColor: theme[`color-${type}-600`]}]}>
      <View style={styles.content}>
        {!hideIndicator && indicator()}
        <Text weight={FontWeight.Medium} style={styles.text}>
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: Dimensions.get('window').width,
  },
  content: {
    flexDirection: 'row',
  },
  text: {
    color: 'white',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default CommonBanner;
