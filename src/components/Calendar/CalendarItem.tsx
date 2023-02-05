import {Text} from '@ui-kitten/components';
import moment from 'moment';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScheduleDate} from '../../models/Schedule';

interface Props {
  data: ScheduleDate;
}

const CalendarItem = ({data}: Props) => {
  const dateTime = () => {
    const date = moment.utc(data.fecha_cita);
    const hour24 = date.hour();
    const isAM = hour24 < 12;
    const hour = `${hour24 < 13 ? hour24 : hour24 - 12}`.padStart(2, '0');
    const minute = `${date.minute()}`.padStart(2, '0');
    return `${hour}:${minute} ${isAM ? 'AM' : 'PM'}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{dateTime()}</Text>
      <Text style={styles.person}>{data.Usuario?.nombre}</Text>
      <Text style={styles.place}>{data.lugar}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  time: {
    fontSize: 12,
    opacity: 0.5,
    fontWeight: '700',
  },
  person: {
    fontSize: 16,
    fontWeight: '500',
  },
  place: {
    fontSize: 14,
    fontWeight: '700',
    bottom: 10,
    left: 10,
    position: 'absolute',
  },
});

export default CalendarItem;
