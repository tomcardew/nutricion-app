import {Icon} from '@ui-kitten/components';
import moment from 'moment';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {FontWeight} from '../models/Common';
import {dateToDayMonth, theme} from '../utils/Utils';
import Text from './Text';

interface Props {
  value: Date;
  style?: StyleProp<ViewStyle>;
  didChangeDate?: (date: Date) => void;
}

const HorizontalDateSelector = ({
  value,
  style,
  didChangeDate = () => {},
}: Props) => {
  const BackIcon = () => (
    <TouchableOpacity onPress={subOneDay}>
      <Icon
        style={styles.icon}
        name="arrow-ios-back-outline"
        fill={theme['color-primary-700']}
      />
    </TouchableOpacity>
  );
  const ForwardIcon = () => (
    <TouchableOpacity onPress={addOneDay}>
      <Icon
        style={styles.icon}
        name="arrow-ios-forward-outline"
        fill={theme['color-primary-700']}
      />
    </TouchableOpacity>
  );

  const addOneDay = () => {
    const date = moment(value).add(1, 'days');
    didChangeDate(date.toDate());
  };

  const subOneDay = () => {
    const date = moment(value).subtract(1, 'days');
    didChangeDate(date.toDate());
  };

  return (
    <View style={[styles.container, style]}>
      <BackIcon />
      <Text weight={FontWeight.SemiBold} style={styles.date}>
        {dateToDayMonth(value)}
      </Text>
      <ForwardIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 100,
  },
  date: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: theme['color-primary-700'],
    fontWeight: '600',
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default HorizontalDateSelector;
