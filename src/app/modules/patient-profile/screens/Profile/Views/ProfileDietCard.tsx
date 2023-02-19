import React from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import SimpleCard from '../../../../../../components/Cards/SimpleCard';
import {theme} from '../../../../../../utils/Utils';

interface Props {
  style?: StyleProp<ViewStyle>;
  onSeeDietPress?: () => void;
}

const ProfileDietCard = ({style, onSeeDietPress = () => {}}: Props) => {
  return (
    <SimpleCard
      title="Dieta"
      actionTitle="Ver dieta"
      onActionPress={onSeeDietPress}
      padding={0}
      style={[style, {justifyContent: 'center', alignItems: 'center'}]}
    />
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
  },
  indicator: {
    position: 'absolute',
    bottom: 20,
    fontSize: 18,
    color: theme['color-primary-500'],
  },
});

export default ProfileDietCard;
