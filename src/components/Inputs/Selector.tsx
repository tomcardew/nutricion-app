import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';

interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  selectedIndex?: IndexPath | IndexPath[] | undefined;
  onSelect?: (index: IndexPath | IndexPath[]) => void;
}

const Selector = ({
  selectedIndex,
  label,
  placeholder,
  value,
  onSelect = () => {},
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <Select
        placeholder={placeholder}
        selectedIndex={selectedIndex}
        value={value}
        style={styles.input}
        onSelect={onSelect}>
        <SelectItem title="Femenino" />
        <SelectItem title="Masculino" />
      </Select>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#f6f6f6',
    borderColor: '#ddd',
    borderRadius: 10,
  },
  text: {
    marginBottom: 5,
    color: '#000',
    fontSize: 15,
  },
});

export default Selector;
