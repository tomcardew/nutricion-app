import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {ScheduleDate} from '../../models/Schedule';
import {theme} from '../../utils/Utils';
import CalendarItem from './CalendarItem';

interface Props {
  data: ScheduleDate[];
}

const CalendarDay = ({data}: Props) => {
  const [current, setCurrent] = useState(moment());

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent(moment());
    }, 60000);

    return () => {
      clearTimeout(timer);
    };
  }, [current]);

  const renderHours = () => {
    let views = [];
    for (var i = 0; i < 24; i++) {
      const isAm = i < 12;
      views.push(
        <Text style={styles.hourItem} key={`schedule-dates-hour-${i}`}>
          {`${i < 13 ? i : i - 12}`.padStart(2, '0') +
            `:00 ${isAm ? 'AM' : 'PM'}`}
        </Text>,
      );
    }
    return views;
  };

  const renderItems = () => {
    const views = [];
    for (var i in data) {
      const item = data[i];
      const date = moment(item.fecha_cita);
      const startTime = date.hour();
      const startMinute = date.minute();
      views.push(
        <View
          key={`schedule-dates-item-${item.id}`}
          style={[
            styles.dateContainer,
            {top: 100 * startTime + (startMinute * 100) / 60},
          ]}>
          <CalendarItem data={item} />
        </View>,
      );
    }
    return views;
  };

  const CurrentTimeView = () => {
    const currentTime = current;
    const hour = currentTime.hour();
    const minute = currentTime.minute();

    const top = hour * 100 + (minute * 100) / 60;

    return (
      <View style={[styles.currentTimeContainer, {top}]}>
        <View style={styles.triangle} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CurrentTimeView />
      <View style={styles.hourContainer}>{renderHours()}</View>
      {renderItems()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    height: 2400,
  },
  hourContainer: {
    flex: 1,
  },
  dateContainer: {
    position: 'absolute',
    left: 80,
    backgroundColor: theme['color-primary-100'],
    width: Dimensions.get('window').width - 100,
    height: 100,
    borderRadius: 10,
    borderColor: theme['color-primary-200'],
    borderWidth: 1,
  },
  hourItem: {
    height: 100,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  currentTimeContainer: {
    width: '100%',
    height: 2,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 7,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    transform: [{rotate: '90deg'}],
    position: 'absolute',
    left: -5,
    top: -3,
  },
});

export default CalendarDay;
