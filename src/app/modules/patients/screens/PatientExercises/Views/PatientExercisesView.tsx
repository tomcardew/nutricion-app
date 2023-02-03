import {IndexPath} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ActionButton} from '../../../../../../components/Buttons';
import {Selector} from '../../../../../../components/Inputs';

interface Props {
  categories?: string[];
  exercises?: string[];
  series?: string[];
  repetitions?: string[];
  rest?: string[];

  selectedCategoryValue?: string;
  selectedCategory?: IndexPath;
  selectedExerciseValue?: string;
  selectedExercise?: IndexPath;
  selectedSerieValue?: string;
  selectedSerie?: IndexPath;
  selectedRepetitionValue?: string;
  selectedRepetition?: IndexPath;
  selectedRestValue?: string;
  selectedRest?: IndexPath;

  didChangeCategory?: (path: IndexPath | IndexPath[]) => void;
  didChangeExercise?: (path: IndexPath | IndexPath[]) => void;
  didChangeSerie?: (path: IndexPath | IndexPath[]) => void;
  didChangeRepetition?: (path: IndexPath | IndexPath[]) => void;
  didChangeRest?: (path: IndexPath | IndexPath[]) => void;
}

const PatientExercisesView = ({
  categories,
  exercises,
  series,
  repetitions,
  rest,
  selectedCategory,
  selectedCategoryValue,
  selectedExercise,
  selectedExerciseValue,
  selectedSerie,
  selectedSerieValue,
  selectedRepetition,
  selectedRepetitionValue,
  selectedRest,
  selectedRestValue,
  didChangeCategory = () => {},
  didChangeExercise = () => {},
  didChangeSerie = () => {},
  didChangeRepetition = () => {},
  didChangeRest = () => {},
}: Props) => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        {categories && (
          <Selector
            label="Categoría"
            placeholder="Selecciona una opción"
            selectedIndex={selectedCategory}
            onSelect={didChangeCategory}
            keys={categories}
            value={selectedCategoryValue}
          />
        )}
        {exercises && (
          <Selector
            label="Ejercicio"
            placeholder="Selecciona una opción"
            selectedIndex={selectedExercise}
            onSelect={didChangeExercise}
            keys={exercises}
            value={selectedExerciseValue}
          />
        )}
        {series && selectedExerciseValue && (
          <Selector
            label="Series"
            placeholder="Selecciona una opción"
            selectedIndex={selectedSerie}
            onSelect={didChangeSerie}
            keys={series}
            value={selectedSerieValue}
          />
        )}
        {repetitions && selectedExerciseValue && (
          <Selector
            label="Repeticiones"
            placeholder="Selecciona una opción"
            selectedIndex={selectedRepetition}
            onSelect={didChangeRepetition}
            keys={repetitions}
            value={selectedRepetitionValue}
          />
        )}
        {rest && selectedExerciseValue && (
          <Selector
            label="Descanso"
            placeholder="Selecciona una opción"
            selectedIndex={selectedRest}
            onSelect={didChangeRest}
            keys={rest}
            value={selectedRestValue}
          />
        )}
        <ActionButton
          style={styles.button}
          title="Guardar"
          // onPress={onRegisterPress}
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

export default PatientExercisesView;
