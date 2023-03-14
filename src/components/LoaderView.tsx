import {Spinner} from '@ui-kitten/components';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Animated, StyleProp, ViewStyle} from 'react-native';
import {default as theme} from '../../custom-theme.json';
import {FontWeight} from '../models/Common';
import Text from './Text';

interface Props {
  animating?: boolean;
  message?: string;
  style?: StyleProp<ViewStyle>;
}

const LoaderView = ({message, animating, style}: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (animating) {
      setShow(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setShow(false);
      });
    }
  }, [animating]);

  if (show)
    return (
      <Animated.View style={[styles.container, style, {opacity: fadeAnim}]}>
        <Spinner size="giant" />
        <Text weight={FontWeight.Medium} style={styles.text}>
          {message}
        </Text>
      </Animated.View>
    );

  return null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFFE0',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  text: {
    color: theme['color-primary-500'],
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
});

export default LoaderView;
