import {Icon, Toggle} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Text from '../../../../../../components/Text';
import {FontWeight} from '../../../../../../models/Common';

interface Props {
  title: string;
  onPress?: () => void;
  type?: 'menu' | 'toggle';
  active?: boolean;
}

const MenuOptionView = ({
  title,
  type = 'menu',
  active,
  onPress = () => {},
}: Props) => (
  <TouchableOpacity
    style={styles.container}
    disabled={type == 'toggle'}
    onPress={onPress}>
    <Text weight={FontWeight.Medium} style={styles.text}>
      {title}
    </Text>
    {type == 'menu' && (
      <Icon name="arrow-ios-forward-outline" fill="#000" style={styles.icon} />
    )}
    {type == 'toggle' && (
      <Toggle style={styles.toggle} checked={active} onChange={onPress} />
    )}
  </TouchableOpacity>
);

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
  text: {
    fontSize: 17,
    color: 'black',
    lineHeight: 20,
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
});

export default MenuOptionView;
