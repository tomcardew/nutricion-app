import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {default as theme} from '../../../custom-theme.json';
import {AlertAction, AlertActionType, FontWeight} from '../../models/Common';
import Text from '../Text';

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
        weight={
          type == AlertActionType.Cancel
            ? FontWeight.Regular
            : FontWeight.Medium
        }
        style={[
          styles.label,
          type == AlertActionType.Action
            ? styles.labelAction
            : type == AlertActionType.Destructive
            ? styles.labelDestructive
            : type == AlertActionType.Cancel
            ? styles.labelCancel
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
    fontSize: 16,
    fontWeight: '400',
  },
  labelAction: {},
  labelDestructive: {
    color: '#CC0000',
  },
  labelCancel: {
    color: 'black',
    opacity: 0.9,
  },
});

export default AlertActionButton;
