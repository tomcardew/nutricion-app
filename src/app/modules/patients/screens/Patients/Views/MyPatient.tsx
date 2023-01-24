import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

export interface Patient {
  id: number;
  name: string;
  image?: string;
}

interface Props {
  data: Patient;
  onPress?: (id: number) => void;
}

const MyPatient = ({data, onPress = () => {}}: Props) => {
  const {id, name, image} = data;

  return (
    <TouchableOpacity style={styles.container} onPress={() => { onPress(id) }}>
      <View style={styles.content}>
        <Image style={styles.image} source={{uri: image}} />
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: (Dimensions.get('window').width - 100) / 3,
    height: (Dimensions.get('window').width - 100) / 3,
    borderRadius: 500,
  },
  name: {
    fontSize: 14,
    color: 'black',
    marginVertical: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default MyPatient;
