import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  DatePicker,
  Selector,
  TextInput,
} from '../../../../../../components/Inputs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ActionButton} from '../../../../../../components/Buttons';
import Separator from '../../../../../../components/Separator';
import {IndexPath} from '@ui-kitten/components';

interface Props {
  patients: string[];
  date: Date;
  place: string;
  canSave?: boolean;

  selectedPatientValue?: string;
  selectedPatient?: IndexPath;

  didChangePatient?: (path: IndexPath | IndexPath[]) => void;
  didPressChangeDate?: () => void;
  didChangePlace?: (value: string) => void;

  onSaveDate?: () => void;
}

const AddScheduleView = ({
  patients,
  date,
  place,
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
        <TextInput label="Lugar" value={place} onChangeText={didChangePlace} />
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