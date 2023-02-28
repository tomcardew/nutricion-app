import React from 'react';
import {Button} from '@ui-kitten/components';
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {FontWeight} from '../../models/Common';
import Text from '../Text';
import {theme} from '../../utils/Utils';

interface Props {
  title: string;

  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const PlainButton = ({title, style, onPress = () => {}}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]}>
        <Text weight={FontWeight.SemiBold} style={styles.text}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  text: {
    color: theme['color-primary-500'],
  },
});

export default PlainButton;
