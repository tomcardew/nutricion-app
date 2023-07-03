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

export default ProfileDietCard;
