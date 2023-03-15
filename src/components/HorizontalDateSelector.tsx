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
  didPress?: () => void;
  didChangeDate?: (date: Date) => void;
}

const HorizontalDateSelector = ({
  value,
  style,
  didPress,
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
      <TouchableOpacity disabled={didPress == null} onPress={didPress}>
        <Text weight={FontWeight.SemiBold} style={styles.date}>
          {dateToDayMonth(value)}
        </Text>
      </TouchableOpacity>
      <ForwardIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme['color-primary-500'],
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
