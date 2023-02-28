import React from 'react';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import {Image} from '../../../../../../components/Images';
import {Icon} from '@ui-kitten/components';
import Zoom from 'react-native-zoom-reanimated';

interface PreviewProps {
  url: string;
  onClose?: () => void;
}

const PreviewImage = ({url, onClose = () => {}}: PreviewProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
        <Icon style={styles.closeIcon} fill="#000" name="close" />
      </TouchableOpacity>
      <Zoom>
        <Image
          style={styles.preview}
          resizeMode="contain"
          source={{uri: url}}
        />
      </Zoom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
  },
  preview: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  closeContainer: {
    width: 40,
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'white',
    borderRadius: 40,
    elevation: 1,
    zIndex: 101,
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
});

export default PreviewImage;
