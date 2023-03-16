import React, {useEffect, useRef} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import CalendarDay from '../../../../../../components/Calendar/CalendarDay';
import HorizontalDateSelector from '../../../../../../components/HorizontalDateSelector';
import {ScheduleDate} from '../../../../../../models/Schedule';
import {dateToScrollHeight, Logger} from '../../../../../../utils/Utils';

interface Props {
  data: ScheduleDate[];
  date: Date;
  didChangeDate?: (date: Date) => void;
}

const PatientScheduleView = ({data, date, didChangeDate = () => {}}: Props) => {
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    scrollToNow();
  }, []);

  const scrollToNow = () => {
    scrollViewRef?.current?.scrollTo({
      x: 0,
      y: dateToScrollHeight(new Date()),
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <HorizontalDateSelector
        style={styles.dateContainer}
        value={date}
        didChangeDate={didChangeDate}
        didPress={() => {
          didChangeDate(new Date());
          scrollToNow();
        }}
      />
      <ScrollView
        ref={scrollViewRef}
        style={{width: Dimensions.get('window').width, marginTop: 10}}
        contentContainerStyle={{paddingBottom: 5}}>
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

export default PatientScheduleView;
