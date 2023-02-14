import React from 'react';
import {StyleSheet, Text, View, StyleProp, ViewStyle} from 'react-native';
import SimpleCard from '../../../../../../components/Cards/SimpleCard';
import Separator from '../../../../../../components/Separator';
import {theme} from '../../../../../../utils/Utils';

interface Props {
  weight?: string;
  bodyFat?: string;
  imc?: string;
  style?: StyleProp<ViewStyle>;
}

interface DataItemProps {
  name: string;
  value?: string;
}

const DataItem = ({name, value}: DataItemProps) => (
  <View style={styles.itemContainer}>
    <Text style={styles.value}>{value ?? '--'}</Text>
    <Text style={styles.key}>{name}</Text>
  </View>
);

const ProfileSummaryCard = ({weight, bodyFat, imc, style}: Props) => {
  return (
    <SimpleCard
      title="Resumen"
      style={[style, {justifyContent: 'center', alignItems: 'center'}]}>
      <View style={styles.container}>
        <View style={styles.column}>
          <DataItem name="Peso" value={weight} />
        </View>
        <Separator orientation="vertical" style={{height: '120%'}} />
        <View style={styles.column}>
          <DataItem name="Grasa" value={bodyFat} />
        </View>
        <Separator orientation="vertical" style={{height: '120%'}} />
        <View style={styles.column}>
          <DataItem name="IMC" value={imc} />
        </View>
      </View>
    </SimpleCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    color: theme['color-primary-600'],
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
  },
  key: {
    color: 'black',
    textAlign: 'center',
  },
});

export default ProfileSummaryCard;
