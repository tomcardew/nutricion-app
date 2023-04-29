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
  selected?: boolean;

  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftDecorator?: JSX.Element;
  onPress?: () => void;
}

const PillButton = ({
  title,
  selected,
  style,
  textStyle,
  leftDecorator,
  onPress = () => {},
}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[styles.container, selected && styles.selectedContainer, style]}>
        {leftDecorator}
        <Text
          weight={FontWeight.SemiBold}
          style={[styles.text, selected && styles.selectedText, textStyle]}>
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
    backgroundColor: theme['color-primary-100'],
  },
  selectedContainer: {
    backgroundColor: theme['color-primary-700'],
  },
  text: {
    color: theme['color-primary-700'],
  },
  selectedText: {
    color: 'white',
  },
});

export default PillButton;
