import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextInput} from './Inputs';
import {Icon} from '@ui-kitten/components';
import {theme} from '../utils/Utils';

interface Props {
  value: string;

  onChangeText?: (nextValue: string) => void;
  didPressSend?: () => void;
}

const CommentTextBox = ({
  value,
  onChangeText = () => {},
  didPressSend = () => {},
}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          width: Dimensions.get('window').width - 40 - 32 - 10,
          marginRight: 10,
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder="Escribe tu comentario"
      />
      <TouchableOpacity
        style={{
          backgroundColor: theme['color-primary-700'],
          borderRadius: 100,
          padding: 8,
        }}
        onPress={didPressSend}>
        <Icon
          style={{width: 24, height: 24}}
          fill="#FFF"
          name="arrow-upward-outline"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme['color-primary-100'],
    width: Dimensions.get('window').width,
    height: 60,
    paddingHorizontal: 20,
  },
});

export default CommentTextBox;
