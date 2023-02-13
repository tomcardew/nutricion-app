import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Patient} from '../../../../../../models/Patients';
import {Image} from '../../../../../../components/Images';

interface Props {
  data: Patient;
  onPress?: (id: string) => void;
}

const MyPatient = ({data, onPress = () => {}}: Props) => {
  const {idUsuario, nombre, urlFoto} = data;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress(idUsuario);
      }}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={{
            uri: urlFoto
              ? urlFoto
              : `https://ui-avatars.com/api/?name=${nombre}&size=200&background=e5f9bb`,
          }}
        />
        <Text style={styles.name} numberOfLines={1}>
          {nombre}
        </Text>
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
    backgroundColor: '#eee',
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
