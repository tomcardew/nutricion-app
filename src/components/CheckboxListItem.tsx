import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Text from './Text';
import {CheckBox} from '@ui-kitten/components';
import {FontWeight} from '../models/Common';

interface Props {
  title: string;
  date: string;
  completed?: boolean;

  onChange?: (checked: boolean, indeterminate: boolean) => void;
}

const CheckboxListItem = ({
  title,
  date,
  completed,
  onChange = () => {},
}: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title} weight={FontWeight.Medium}>
          {title}
        </Text>
        <Text style={styles.date} weight={FontWeight.Light}>
          {date}
        </Text>
      </View>
      <CheckBox checked={completed} onChange={onChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width - 40,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  title: {
    color: 'black',
    fontSize: 16,
    maxWidth: Dimensions.get('window').width - 70,
  },
  date: {
    color: 'black',
    fontSize: 12,
  },
});

export default CheckboxListItem;
