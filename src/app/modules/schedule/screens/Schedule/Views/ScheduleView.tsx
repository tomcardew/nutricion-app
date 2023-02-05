import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import CalendarDay from '../../../../../../components/Calendar/CalendarDay';
import HorizontalDateSelector from '../../../../../../components/HorizontalDateSelector';
import {ScheduleDate} from '../../../../../../models/Schedule';

interface Props {
  data: ScheduleDate[];
  date: Date;
  didChangeDate?: (date: Date) => void;
}

const ScheduleView = ({data, date, didChangeDate = () => {}}: Props) => {
  return (
    <View style={styles.container}>
      <HorizontalDateSelector
        style={styles.dateContainer}
        value={date}
        didChangeDate={didChangeDate}
      />
      <ScrollView
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
