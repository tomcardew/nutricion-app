import React from 'react';
import {Text as RNText, StyleProp, TextStyle} from 'react-native';
import {FontWeight} from '../models/Common';

interface Props {
  children?: any;
  numberOfLines?: number;
  weight?: FontWeight;
  style?: StyleProp<TextStyle>;
}

const Text = ({
  children,
  numberOfLines = 0,
  weight = FontWeight.Regular,
  style,
}: Props) => {
  return (
    <RNText
      numberOfLines={numberOfLines}
      style={[{fontFamily: `Poppins-${weight.toString()}`}, style]}>
      {children}
    </RNText>
  );
};

export default Text;
