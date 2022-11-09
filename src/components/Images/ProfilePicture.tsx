import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {default as theme} from '../../../custom-theme.json';

interface Props {
  url?: string;
  fallback?: string;
  style?: StyleProp<ViewStyle>;
}

const ProfilePicture = ({url, fallback, style}: Props) => {
  const item = () => {
    if (url) {
      return (
        <Image
          style={styles.item}
          source={{
            uri: url,
          }}
        />
      );
    }
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{fallback}</Text>
      </View>
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
