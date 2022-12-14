import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {default as theme} from '../../../custom-theme.json';

export enum AlertActionType {
  Normal,
  Destructive,
  Action,
}

export interface AlertAction {
  label: string;
  type?: AlertActionType;
  isFirstTwo?: boolean | null;

  onClick?: () => void;
}

const AlertActionButton = ({
  label,
  type = AlertActionType.Normal,
  isFirstTwo = null,
  onClick = () => {},
}: AlertAction) => {
  return (
    <Pressable
      style={[styles.container, isFirstTwo ? styles.rightBorder : null]}
      onPress={onClick}>
      <Text
        style={[
          styles.label,
          type == AlertActionType.Action
            ? styles.labelAction
            : type == AlertActionType.Destructive
            ? styles.labelDestructive
            : null,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    display: 'flex',
    flex: 1,
    borderTopColor: '#CCC',
    borderTopWidth: 1,
    width: '100%',
  },
  rightBorder: {
    borderRightColor: '#CCC',
    borderRightWidth: 1,
  },
  label: {
    color: theme['color-primary-600'],
    fontSize: 18,
    fontWeight: '400',
  },
  labelAction: {
    fontWeight: '600',
  },
  labelDestructive: {
    fontWeight: '600',
    color: '#CC0000',
  },
});

export default AlertActionButton;
