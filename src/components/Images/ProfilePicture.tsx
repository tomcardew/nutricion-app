import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import Image from './Image';
import FastImage from 'react-native-fast-image';

interface Props {
  url?: string;
  fallback?: string;
  style?: StyleProp<ViewStyle>;
}

const ProfilePicture = ({url, fallback, style}: Props) => {
  const item = () => {
    return (
      <Image
        style={styles.item}
        source={{
          uri: url
            ? url
            : `https://ui-avatars.com/api/?name=${fallback}&size=200&background=e5f9bb`,
        }}
      />
    );
  };
  return <View style={[styles.container, style]}>{item()}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    borderColor: 'white',
    borderWidth: 6,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  item: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 120,
    color: 'black',
    fontWeight: '100',
    lineHeight: 140,
  },
});

export default ProfilePicture;
