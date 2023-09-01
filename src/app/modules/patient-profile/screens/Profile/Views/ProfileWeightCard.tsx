import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import SimpleCard from '../../../../../../components/Cards/SimpleCard';
import Text from '../../../../../../components/Text';
import {FontWeight} from '../../../../../../models/Common';
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
          <Text weight={FontWeight.Bold} style={styles.title}>
            {weight ?? '--'}
          </Text>
          <Text weight={FontWeight.SemiBold} style={styles.indicator}>
            kg
          </Text>
        </View>
      </View>
    </SimpleCard>
  );
};

const styles = StyleSheet.create({
  circleOutside: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: theme['color-primary-500'],
    borderWidth: 4,
    marginVertical: 10,
  },
  circleInside: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 130,
    borderRadius: 100,
    borderColor: theme['color-primary-500'],
    borderWidth: 1.5,
    borderStyle: 'dashed',
    marginVertical: 10,
  },
  title: {
    fontSize: 55,
    color: theme['color-primary-700'],
  },
  indicator: {
    position: 'absolute',
    bottom: 16,
    fontSize: 16,
    color: theme['color-primary-500'],
  },
});

export default ProfileWeightCard;
