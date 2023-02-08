import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ActionButton} from '../../../../../../components/Buttons';
import {TextInput} from '../../../../../../components/Inputs';

interface Props {
  weight?: string;
  imc?: string;
  bodyFat?: string;
  waist?: string;
  abdomen?: string;
  hip?: string;
  canSave?: boolean;

  didChangeWeight?: (value: string) => void;
  didChangeImc?: (value: string) => void;
  didChangeBodyFat?: (value: string) => void;
  didChangeWaist?: (value: string) => void;
  didChangeAbdomen?: (value: string) => void;
  didChangeHip?: (value: string) => void;

  onSaveProgress?: () => void;
}

const PatientDataEditorView = ({
  weight,
  imc,
  bodyFat,
  waist,
  abdomen,
  hip,
  canSave = false,
  didChangeWeight = () => {},
  didChangeImc = () => {},
  didChangeBodyFat = () => {},
  didChangeWaist = () => {},
  didChangeAbdomen = () => {},
  didChangeHip = () => {},
  onSaveProgress = () => {},
}: Props) => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <TextInput
          label="Peso (Kg)"
          value={weight ?? ''}
          keyboardType="decimal-pad"
          onChangeText={didChangeWeight}
        />
        <TextInput
          label="IMC"
          value={imc ?? ''}
          keyboardType="decimal-pad"
          onChangeText={didChangeImc}
        />
        <TextInput
          label="Grasa corporal (Porcentaje %)"
          value={bodyFat ?? ''}
          keyboardType="decimal-pad"
          onChangeText={didChangeBodyFat}
        />
        <TextInput
          label="Cintura"
          value={waist ?? ''}
          keyboardType="decimal-pad"
          onChangeText={didChangeWaist}
        />
        <TextInput
          label="Abdomen"
          value={abdomen ?? ''}
          keyboardType="decimal-pad"
          onChangeText={didChangeAbdomen}
        />
        <TextInput
          label="Cadera"
          value={hip ?? ''}
          keyboardType="decimal-pad"
          onChangeText={didChangeHip}
        />
        <ActionButton
          style={styles.button}
          disabled={!canSave}
          title="Guardar"
          onPress={onSaveProgress}
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

export default PatientDataEditorView;
