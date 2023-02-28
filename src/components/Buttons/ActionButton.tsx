import React from 'react';
import {Button} from '@ui-kitten/components';
import {
  ViewStyle,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Text from '../Text';
import {FontWeight} from '../../models/Common';
import {theme} from '../../utils/Utils';

interface Props {
  title: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const PrimaryButton = ({
  title,
  disabled = false,
  style,
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
    borderRadius: 10,
    backgroundColor: theme['color-primary-500'],
  },
  text: {
    color: 'white',
  },
});

export default PrimaryButton;
