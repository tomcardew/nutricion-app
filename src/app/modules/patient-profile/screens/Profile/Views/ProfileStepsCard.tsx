import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import SimpleCard from '../../../../../../components/Cards/SimpleCard';
import Text from '../../../../../../components/Text';
import {FontWeight} from '../../../../../../models/Common';
import {theme} from '../../../../../../utils/Utils';

interface Props {
  count?: number;
  goal?: number;
  style?: StyleProp<ViewStyle>;
}

const data = {
  labels: ['Swim', 'Bike', 'Run'], // optional
  data: [0.4, 0.6, 0.8],
};

const ProfileStepsCard = ({count = 0, goal = 5000, style}: Props) => {
  return (
    <SimpleCard
      title="Pasos"
      style={[
        style,
        {justifyContent: 'center', alignItems: 'center'},
      ]}></SimpleCard>
  );
};

const styles = StyleSheet.create({});

export default ProfileStepsCard;
