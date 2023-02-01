import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from '@ui-kitten/components';
import TextInput from './TextInput';

const SearchIconAccessory = () => (
  <Icon style={styles.icon} fill="#777" name="search-outline" />
);

interface Props {
  value: string;
  onChangeText?: (nextValue: string) => void;
}

const SearchBar = ({value, onChangeText = () => {}}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        textContentType="name"
        placeholder="Búsqueda"
        accessoryRight={SearchIconAccessory()}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  icon: {
    height: 20,
    width: 20,
  },
});

export default SearchBar;
