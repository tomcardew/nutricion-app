import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import CalendarDay from '../../../../../../components/Calendar/CalendarDay';
import HorizontalDateSelector from '../../../../../../components/HorizontalDateSelector';
import {ScheduleDate} from '../../../../../../models/Schedule';
import {dateToScrollHeight} from '../../../../../../utils/Utils';

interface Props {
  data: ScheduleDate[];
  date: Date;
  didChangeDate?: (date: Date) => void;
}

const ScheduleView = ({data, date, didChangeDate = () => {}}: Props) => {
  const [ref, setRef] = useState<ScrollView | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      ref?.scrollTo({
        x: 0,
        y: dateToScrollHeight(new Date()),
        animated: true,
      });
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <View style={styles.container}>
      <HorizontalDateSelector
        style={styles.dateContainer}
        value={date}
        didChangeDate={didChangeDate}
      />
      <ScrollView
        ref={ref => setRef(ref)}
        style={{width: Dimensions.get('window').width, marginTop: 10}}
        contentContainerStyle={{paddingBottom: 150}}>
        <CalendarDay data={data} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#FAFAFA',
    width: Dimensions.get('window').width,
  },
  dateContainer: {
    marginTop: 10,
    width: Dimensions.get('window').width - 40,
  },
  text: {
    fontSize: 42,
  },
});

export default ScheduleView;
