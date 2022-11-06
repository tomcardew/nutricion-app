import React from 'react';
import {Button} from '@ui-kitten/components';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

interface Props {
  title: string;

  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const PlainButton = ({title, style, onPress = () => {}}: Props) => {
  return (
    <Button style={style} appearance="ghost" onPress={onPress}>
      {title}
    </Button>
  );
};

export default PlainButton;
