import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import Text from '../Text';

interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  selectedIndex?: IndexPath | IndexPath[] | undefined;
  keys: string[];
  onSelect?: (index: IndexPath | IndexPath[]) => void;
}

const Selector = ({
  selectedIndex,
  label,
  placeholder,
  value,
  keys = [],
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
        {keys.map(item => (
          <SelectItem key={`component-selector-${item}`} title={item} />
        ))}
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
