import React from 'react';
import {Button} from '@ui-kitten/components';
import {ViewStyle, StyleProp, StyleSheet} from 'react-native';

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
    <Button
      disabled={disabled}
      style={[styles.container, style]}
      onPress={onPress}>
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    // elevation: 2,
  },
});

export default PrimaryButton;
