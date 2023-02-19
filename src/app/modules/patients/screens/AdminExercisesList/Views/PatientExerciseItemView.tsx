import {Icon} from '@ui-kitten/components';
import React from 'react';
import {default as theme} from '../../../../../../../custom-theme.json';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {PatientExerciseListItem} from '../../../../../../models/Patients';
import Text from '../../../../../../components/Text';
import {FontWeight} from '../../../../../../models/Common';

interface Props {
  item: PatientExerciseListItem;
  onPress?: () => void;
}

const PatientExerciseItemView = ({item, onPress = () => {}}: Props) => {
  const completed = item.completado;

  return (
    <TouchableOpacity
      disabled={item.completado}
      style={styles.container}
      onPress={onPress}>
      <View style={styles.dataContainer}>
        <View style={styles.categoryContainer}>
          <Text
            weight={FontWeight.SemiBold}
            style={styles.categoryLabel}
            numberOfLines={1}>
            {item.Categoria_ejercicio.categoria}
          </Text>
        </View>
        <Text weight={FontWeight.Bold} numberOfLines={2} style={styles.text}>
          {item.Nombre_ejercicio.nombre_ejercicio}
        </Text>
        <Text numberOfLines={1} style={styles.dataText}>
          {item.Peso} - {item.Series.series} Series -{' '}
          {item.Repeticiones.repeticiones} - {item.Descansos.descansos} desc.
        </Text>
        <Text
          weight={FontWeight.Light}
          numberOfLines={1}
          style={styles.noteText}>
          Nota: {item.Notas}
        </Text>
      </View>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: completed
              ? theme['color-success-600']
              : theme['color-info-500'],
          },
        ]}>
        <Icon
          style={styles.icon}
          fill="#fff"
          name={completed ? 'checkmark-outline' : 'clock-outline'}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('window').width - 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
  },
  dataContainer: {
    width: '90%',
  },
  text: {
    fontSize: 15,
    color: 'black',
    fontWeight: '600',
    flex: 1,
  },
  dataText: {
    color: 'black',
  },
  noteText: {
    opacity: 0.75,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    height: 32,
    width: 32,
  },
  icon: {
    height: 22,
    width: 22,
  },
  categoryContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 0,
    marginBottom: 5,
  },
  categoryLabel: {
    backgroundColor: theme['color-primary-100'],
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 100,
    color: theme['color-primary-600'],
    fontWeight: '500',
  },
});

export default PatientExerciseItemView;
