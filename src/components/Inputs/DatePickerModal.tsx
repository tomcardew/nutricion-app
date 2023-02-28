import moment from 'moment';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import ReactNativeModernDatepicker from 'react-native-modern-datepicker';
import {DAYS, DAYS_SHORT, MONTHS, theme} from '../../utils/Utils';
import {ActionButton} from '../Buttons';

interface Props {
  mode?: 'datepicker' | 'calendar' | 'monthYear' | 'time';
  onSelectedDate?: (dateString: string) => void;
  onClose?: () => void;
}

const options = {
  textHeaderColor: theme['color-primary-600'],
  mainColor: theme['color-primary-500'],
};

const config = {
  dayNames: DAYS,
  dayNamesShort: DAYS_SHORT,
  monthNames: MONTHS,
  hour: 'Hora',
  minute: 'Minuto',
  timeSelect: 'Seleccionar',
  timeClose: 'Cerrar',
};

const DatePickerModal = ({
  mode,
  onSelectedDate = () => {},
  onClose = () => {},
}: Props) => {
  return (
    <View style={styles.container}>
      <ReactNativeModernDatepicker
        mode={mode}
        style={{borderRadius: 10}}
        options={options}
        configs={config}
        current={moment().format('YYYY/MM/DD')}
        selected={moment().format('YYYY/MM/DD')}
        onSelectedChange={onSelectedDate}
      />
      <ActionButton
        style={styles.button}
        title="Guardar y cerrar"
        onPress={onClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000CC',
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});

export default DatePickerModal;
