import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {ActionButton} from '../../../../../../components/Buttons';
import {Image} from '../../../../../../components/Images';
import Text from '../../../../../../components/Text';
import Environment from '../../../../../../constants/Environment';
import {FontWeight} from '../../../../../../models/Common';

interface Props {
  didPressSeeReleaseNotes?: () => void;
}

const AboutView = ({didPressSeeReleaseNotes = () => {}}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../../../../public/assets/splashscreen.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.appName} weight={FontWeight.Bold}>
        {Environment.DISPLAY_NAME}
      </Text>
      <Text style={styles.version}>Versión {Environment.VERSION}</Text>
      <ActionButton
        style={styles.button}
        title="Notas de la versión"
        onPress={didPressSeeReleaseNotes}
      />
      <Text style={{color: 'black'}}>
        Desarrollado con ❤ y la colaboración de:
      </Text>
      <Text style={{color: 'black'}}>Backend: Eduardo Soto Betancourt</Text>
      <Text style={{color: 'black'}}>Frontend: Andrés Villagómez Ríos</Text>
      <Text style={styles.rights} weight={FontWeight.Medium}>
        Derechos reservados {new Date().getFullYear()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  appName: {
    color: 'black',
    fontSize: 28,
    marginBottom: -10,
  },
  version: {
    color: 'black',
    fontSize: 16,
    marginBottom: 30,
  },
  rights: {
    color: 'black',
    position: 'absolute',
    bottom: 20,
  },
  button: {
    width: Dimensions.get('window').width - 40,
    marginBottom: 30,
  },
});

export default AboutView;
