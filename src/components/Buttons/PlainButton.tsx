import React from 'react';
import {Button} from '@ui-kitten/components';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {FontWeight} from '../../models/Common';
import Text from '../Text';
import {theme} from '../../utils/Utils';

interface Props {
  title: string;
  bordered?: boolean;

  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftDecorator?: JSX.Element;
  onPress?: () => void;
}

const PlainButton = ({
  title,
  bordered,
  style,
  textStyle,
  leftDecorator,
  onPress = () => {},
}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style, {borderWidth: bordered ? 1 : 0}]}>
        {leftDecorator}
        <Text
          weight={FontWeight.SemiBold}
          style={[
            styles.text,
            {color: bordered ? 'black' : styles.text.color},
            textStyle,
          ]}>
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
    flexDirection: 'row',
    height: 40,
    borderColor: 'black',
    borderRadius: 100,
    paddingHorizontal: 20,
  },
  text: {
    color: theme['color-primary-500'],
  },
});

export default PlainButton;
