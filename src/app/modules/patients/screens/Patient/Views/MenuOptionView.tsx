import {Icon, Toggle} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, View} from 'react-native';
import Text from '../../../../../../components/Text';
import {FontWeight} from '../../../../../../models/Common';
import {theme} from '../../../../../../utils/Utils';

interface Props {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  type?: 'menu' | 'toggle' | 'separator' | 'button';
  style?: 'regular' | 'destructive';
  active?: boolean;
}

const MenuOptionView = ({
  title,
  disabled,
  type = 'menu',
  style = 'regular',
  active,
  onPress = () => {},
}: Props) => {
  const [innerActive, setInnerActive] = useState(false);
  useEffect(() => {
    setInnerActive(active ?? false);
  }, [active]);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        type == 'separator' && styles.separator,
        disabled && styles.disabled,
      ]}
      disabled={disabled || (type != 'button' && type != 'menu')}
      onPress={onPress}>
      {type != 'separator' && (
        <Text
          weight={style == 'regular' ? FontWeight.Medium : FontWeight.SemiBold}
          numberOfLines={0}
          style={[
            styles.text,
            style == 'destructive' && styles.textDestructive,
          ]}>
          {title}
        </Text>
      )}
      {type == 'menu' && (
        <Icon
          name="arrow-ios-forward-outline"
          fill="#000"
          style={styles.icon}
        />
      )}
      {type == 'toggle' && (
        <Toggle
          style={styles.toggle}
          checked={innerActive}
          disabled={disabled}
          onChange={() => {
            setInnerActive(!innerActive);
            onPress();
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 60,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  separator: {
    height: 10,
    backgroundColor: '#eee',
  },
  text: {
    fontSize: 16,
    color: 'black',
    lineHeight: 20,
    maxWidth: Dimensions.get('window').width - 90,
  },
  textDestructive: {
    color: theme['color-danger-500'],
  },
  icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: -17,
    left: Dimensions.get('window').width - 50,
  },
  toggle: {
    position: 'absolute',
    left: Dimensions.get('window').width - 70,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default MenuOptionView;
