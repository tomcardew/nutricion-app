import moment from 'moment';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {FontWeight} from '../../models/Common';
import {ScheduleDate} from '../../models/Schedule';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from '../Text';
import {Image} from '../Images';
import {theme} from '../../utils/Utils';

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
      {data.Usuario && (
        <View style={styles.flexCenteredRow}>
          <Image
            style={styles.image}
            source={{
              uri: data.Usuario?.urlFoto
                ? data.Usuario?.urlFoto
                : `https://ui-avatars.com/api/?name=${data.Usuario?.nombre}&size=200&background=8BC34A`,
            }}
            resizeMode="cover"
          />
          <Text weight={FontWeight.Medium} style={styles.person}>
            {data.Usuario?.nombre}
          </Text>
        </View>
      )}
      <View style={styles.flexCenteredRow}>
        <Icon
          name="location"
          color="black"
          size={14}
          style={styles.placeIcon}
        />
        <Text weight={FontWeight.SemiBold} style={styles.place}>
          {data.lugar}
        </Text>
      </View>
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
  },
  flexCenteredRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  person: {
    fontSize: 16,
    color: 'black',
  },
  place: {
    fontSize: 14,
    color: 'black',
  },
  placeIcon: {
    marginBottom: 3,
    marginRight: 4,
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 4,
    marginBottom: 3,
  },
});

export default CalendarItem;
