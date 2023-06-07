import React from 'react';
import {Button} from '@ui-kitten/components';
import {
  ViewStyle,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  TextStyle,
} from 'react-native';
import Text from '../Text';
import {FontWeight} from '../../models/Common';
import {theme} from '../../utils/Utils';

interface Props {
  title: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const PrimaryButton = ({
  title,
  disabled = false,
  style,
  textStyle,
  onPress = () => {},
}: Props) => {
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <View
        style={[
          styles.container,
          style,
          disabled && {backgroundColor: '#ddd'},
        ]}>
        <Text weight={FontWeight.SemiBold} style={[styles.text, textStyle]}>
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
    borderRadius: 10,
    backgroundColor: theme['color-primary-500'],
  },
  text: {
    color: 'white',
  },
});

export default PrimaryButton;
