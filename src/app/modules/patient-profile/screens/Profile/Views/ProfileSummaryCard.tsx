import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import SimpleCard from '../../../../../../components/Cards/SimpleCard';
import Separator from '../../../../../../components/Separator';
import Text from '../../../../../../components/Text';
import {FontWeight} from '../../../../../../models/Common';
import {theme} from '../../../../../../utils/Utils';

interface Props {
  weight?: string;
  bodyFat?: string;
  muscle?: string;
  style?: StyleProp<ViewStyle>;
  onSeeAllPress?: () => void;
}

interface DataItemProps {
  name: string;
  value?: string;
  unit?: string;
}

const DataItem = ({name, value, unit}: DataItemProps) => (
  <View style={styles.itemContainer}>
    <Text weight={FontWeight.SemiBold} style={styles.value}>
      {value ?? '--'} {unit}
    </Text>
    <Text style={styles.key}>{name}</Text>
  </View>
);

const ProfileSummaryCard = ({
  weight,
  bodyFat,
  muscle,
  style,
  onSeeAllPress = () => {},
}: Props) => {
  return (
    <SimpleCard
      title="Progreso"
      actionTitle="Ver todo"
      onActionPress={onSeeAllPress}
      style={[style, {justifyContent: 'center', alignItems: 'center'}]}>
      <View style={styles.container}>
        <View style={styles.column}>
          <DataItem name="Peso" value={weight} unit="Kg" />
        </View>
        <Separator orientation="vertical" style={{height: '120%'}} />
        <View style={styles.column}>
          <DataItem name="Grasa" value={bodyFat} unit="%" />
        </View>
        <Separator orientation="vertical" style={{height: '120%'}} />
        <View style={styles.column}>
          <DataItem name="Músculo" value={muscle} unit="Kg" />
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
  },
  key: {
    color: 'black',
    textAlign: 'center',
  },
});

export default ProfileSummaryCard;
