import React from 'react';
import {StyleSheet, Text, View, StyleProp, ViewStyle} from 'react-native';
import SimpleCard from '../../../../../../components/Cards/SimpleCard';
import {theme} from '../../../../../../utils/Utils';

interface Props {
  weight?: string;
  style?: StyleProp<ViewStyle>;
}

const ProfileWeightCard = ({weight, style}: Props) => {
  return (
    <SimpleCard
      title="Peso"
      style={[style, {justifyContent: 'center', alignItems: 'center'}]}>
      <View style={styles.circleOutside}>
        <View style={styles.circleInside}>
          <Text style={styles.title}>{weight ?? '--'}</Text>
          <Text style={styles.indicator}>kg</Text>
        </View>
      </View>
    </SimpleCard>
  );
};

const styles = StyleSheet.create({
  circleOutside: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: theme['color-primary-500'],
    borderWidth: 4,
    marginVertical: 10,
  },
  circleInside: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 185,
    height: 185,
    borderRadius: 100,
    borderColor: theme['color-primary-500'],
    borderWidth: 1.5,
    borderStyle: 'dashed',
    marginVertical: 10,
  },
  title: {
    fontSize: 65,
    color: theme['color-primary-700'],
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: 20,
    fontSize: 18,
    color: theme['color-primary-500'],
    fontWeight: '600',
  },
});

export default ProfileWeightCard;
