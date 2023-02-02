import React from 'react';
import {StyleSheet, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import {Image} from './Images';

interface Props {
  url?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const Thumbnail = ({url, style, onPress = () => {}}: Props) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image style={styles.image} source={{uri: url}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default Thumbnail;
