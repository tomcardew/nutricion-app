import moment from 'moment';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {FontWeight} from '../../models/Common';
import {theme} from '../../utils/Utils';
import Text from '../Text';

interface Props {
  date?: Date;
  label?: string;
  hideTime?: boolean;

  onPress?: () => void;
}

const DatePicker = ({date, hideTime, label, onPress = () => {}}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <Text weight={FontWeight.SemiBold} style={styles.text}>
          {moment(date).format(hideTime ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 43,
    backgroundColor: '#f6f6f6',
    borderColor: '#ddd',
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginBottom: 5,
    marginTop: 10,
    color: '#000',
    fontSize: 15,
  },
  text: {
    color: theme['color-primary-600'],
    fontWeight: '600',
    fontSize: 16,
  },
});

export default DatePicker;
