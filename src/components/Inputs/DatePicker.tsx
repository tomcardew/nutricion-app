import React from 'react';
import {CalendarViewModes, Datepicker} from '@ui-kitten/components';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  date?: Date;
  label?: string;

  onSelect?: (date?: Date) => void;
}

const DatePicker = ({date, label, onSelect = () => {}}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <Datepicker
        startView={CalendarViewModes.YEAR}
        date={date}
        size="large"
        onSelect={onSelect}
        max={new Date()}
        min={new Date('1900-01-01')}
        controlStyle={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  input: {
    backgroundColor: '#f6f6f6',
    borderColor: '#ddd',
    borderRadius: 10,
  },
  text: {
    marginBottom: 5,
    marginTop: 10,
    color: '#000',
    fontSize: 15,
  },
});

export default DatePicker;
