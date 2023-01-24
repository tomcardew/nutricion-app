import React from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

interface Props {
  message?: string;
  relodable?: boolean;

  onReload?: () => void;
}

const EmptyView = ({
  message = 'Sin datos',
  relodable,
  onReload = () => {},
}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../public/assets/empty.png')}
      />
      <Text style={styles.text}>{message}</Text>
      {relodable && (
        <TouchableOpacity onPress={onReload}>
          <Image
            style={styles.reload}
            source={require('../../public/assets/retry.png')}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    opacity: 0.5,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: 'black',
    opacity: 0.3,
    fontWeight: '600',
    marginBottom: 30,
  },
  reload: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    opacity: 0.5,
  },
});

export default EmptyView;
