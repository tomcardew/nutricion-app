import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';

interface Props {
  thickness?: number;
  color?: string;
  orientation?: 'vertical' | 'horizontal';
  style?: StyleProp<ViewStyle>;
}

const Separator = ({
  thickness = 1,
  color = '#F0F0F0',
  orientation = 'horizontal',
  style,
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        orientation == 'horizontal'
          ? {
              width: '100%',
              height: thickness,
            }
          : {
              width: thickness,
              height: '100%',
            },
        {
          backgroundColor: color,
        },
        style,
      ]}></View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
});

export default Separator;
