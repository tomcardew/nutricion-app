import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {IndexPath} from '@ui-kitten/components';
import {
  DatePicker,
  Selector,
  TextInput,
} from '../../../../../../components/Inputs';
import Separator from '../../../../../../components/Separator';
import {ActionButton} from '../../../../../../components/Buttons';
import {PLACES} from '../../../../../store/ScheduleStore';

interface Props {
  patients: string[];
  date: Date;
  place?: string;
  selectedPlaceIndex?: IndexPath | IndexPath[] | undefined;
  canSave?: boolean;

  selectedPatientValue?: string;
  selectedPatient?: IndexPath;

  didChangePatient?: (path: IndexPath | IndexPath[]) => void;
  didPressChangeDate?: () => void;
  didChangePlace?: (path: IndexPath | IndexPath[]) => void;

  onSaveDate?: () => void;
}

const AddScheduleView = ({
  patients,
  date,
  place,
  selectedPlaceIndex,
  canSave = false,
  selectedPatient,
  selectedPatientValue,
  didChangePatient = () => {},
  didPressChangeDate = () => {},
  didChangePlace = () => {},
  onSaveDate = () => {},
}: Props) => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Selector
          label="Paciente"
          placeholder="Selecciona una opción"
          selectedIndex={selectedPatient}
          onSelect={didChangePatient}
          keys={patients}
          value={selectedPatientValue}
        />
        <Separator style={{marginTop: 10}} />
        <DatePicker date={date} label="Fecha" onPress={didPressChangeDate} />
        <Selector
          label="Lugar"
          placeholder="Selecciona una opción"
          selectedIndex={selectedPlaceIndex}
          onSelect={didChangePlace}
          keys={PLACES}
          value={place}
        />
        <ActionButton
          style={styles.button}
          title="Guardar"
          disabled={!canSave}
          onPress={onSaveDate}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    width: Dimensions.get('window').width,
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    marginTop: 20,
  },
});

export default AddScheduleView;
