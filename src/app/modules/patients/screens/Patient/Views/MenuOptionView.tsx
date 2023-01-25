import {Icon} from '@ui-kitten/components';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

interface Props {
  title: string;
  onPress?: () => void;
}

const MenuOptionView = ({title, onPress = () => {}}: Props) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
    <Icon name="arrow-ios-forward-outline" fill="#000" style={styles.icon} />
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
    fontWeight: '500',
  },
  icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: -20,
    left: Dimensions.get('window').width - 50,
  },
});

export default MenuOptionView;
