import moment from 'moment';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FontWeight} from '../../models/Common';
import {ScheduleDate} from '../../models/Schedule';
import Text from '../Text';

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
      <Text weight={FontWeight.SemiBold} style={styles.time}>
        {dateTime()}
      </Text>
      <Text weight={FontWeight.Medium} style={styles.person}>
        {data.Usuario?.nombre}
      </Text>
      <Text weight={FontWeight.SemiBold} style={styles.place}>
        {data.lugar}
      </Text>
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
    fontSize: 13,
    opacity: 0.5,
    color: 'black',
  },
  person: {
    fontSize: 17,
    color: 'black',
  },
  place: {
    fontSize: 15,
    bottom: 10,
    left: 10,
    position: 'absolute',
    color: 'black',
  },
});

export default CalendarItem;
