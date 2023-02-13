import {Spinner} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleProp, View, StyleSheet} from 'react-native';
import FastImage, {Source, ImageStyle} from 'react-native-fast-image';

interface Props {
  style?: StyleProp<ImageStyle>;
  source?: number | Source | undefined;
  resizeMode?: 'cover' | 'contain' | 'stretch';
}

const Image = ({style, source, resizeMode = 'cover'}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {isLoading && <Spinner size="small" />}
      <FastImage
        style={styles.imageContainer}
        source={source}
        resizeMode={resizeMode}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default Image;
