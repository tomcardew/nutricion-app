import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ActionButton} from '../../../../../../components/Buttons';
import {Selector, TextInput} from '../../../../../../components/Inputs';
import {
  PatientProgresCategories,
  patientProgresCategoriesLabels,
  PatientProgress,
  patientProgressToKeyValues,
} from '../../../../../../models/Patients';
import {IndexPath} from '@ui-kitten/components';
import Separator from '../../../../../../components/Separator';

interface Props {
  data: PatientProgress;
  category: PatientProgresCategories;
  selectedCategory?: IndexPath;
  canSave?: boolean;
  reloader?: boolean;
  didChangeValue?: (value: string, key: string) => void;
  didChangeCategory?: (path: IndexPath | IndexPath[]) => void;
  onSaveProgress?: () => void;
}

const PatientDataEditorView = ({
  data,
  selectedCategory,
  category = PatientProgresCategories.PLIEGUES,
  didChangeValue = () => {},
  onSaveProgress = () => {},
  didChangeCategory = () => {},
}: Props) => {
  const items = patientProgressToKeyValues(data, category);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Selector
          label="CATEGORIA"
          placeholder="Selecciona una opción"
          selectedIndex={selectedCategory}
          onSelect={didChangeCategory}
          keys={patientProgresCategoriesLabels}
          value={patientProgresCategoriesLabels[selectedCategory?.row ?? 0]}
        />
        <Separator style={styles.separator} />
        {items.slice().map(item => (
          <TextInput
            label={item.name?.toUpperCase()}
            value={`${item.value}`}
            keyboardType={item.properties.isNumeric ? 'numeric' : 'default'}
            disabled={item.properties.disabled}
            key={`patient-data-editor-item-${item.key}`}
            onChangeText={value => {
              didChangeValue(value, item.key);
            }}
          />
        ))}
        <ActionButton
          style={styles.button}
          title="Guardar cambios"
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
  separator: {
    marginVertical: 10,
  },
});

export default PatientDataEditorView;
