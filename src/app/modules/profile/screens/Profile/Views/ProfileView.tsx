import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Image, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {PlainButton} from '../../../../../../components/Buttons';
import ProfilePicture from '../../../../../../components/Images/ProfilePicture';
import {parseDate, nameToFirstLetters} from '../../../../../../utils/Utils';

import {default as theme} from '../../../../../../../custom-theme.json';

// import ImageColors from 'react-native-image-colors';

interface Props {
  fullname: string;
  cover?: string;
  profilePicture?: string;
  date?: Date;

  onEditProfilePress?: () => void;
}

interface State {
  coverColor: string;
}

const ProfileView = ({
  fullname,
  date = new Date(),
  cover,
  profilePicture = '',
  onEditProfilePress = () => {},
}: Props) => {
  const [state, setState] = useState<State>({
    coverColor: theme['color-primary-600'],
  });
  useEffect(() => {
    getColor();
  }, []);

  const getColor = async () => {
    // const result = await ImageColors.getColors(profilePicture, {
    //   fallback: '#FF0000',
    //   cache: true,
    //   key: 'keyid',
    // });
    setState({...state, coverColor: theme['color-primary-600']});
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image style={[styles.cover, {backgroundColor: state.coverColor}]} />
          <ProfilePicture
            style={styles.profilePicture}
            fallback={`${nameToFirstLetters(fullname)}`}
            url={profilePicture}
          />
          <Text style={styles.date}>{`${date.getDate()} de ${parseDate(
            date,
          )} de ${date.getFullYear()}`}</Text>
          <Text style={styles.name}>{fullname}</Text>
          <PlainButton title="Editar perfil" onPress={onEditProfilePress} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    width: Dimensions.get('window').width,
    minHeight: '100%',
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
    // backgroundColor: theme['color-primary-500'],
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cover: {
    width: Dimensions.get('screen').width + 2,
    height: 150,
    marginTop: -21,
    // opacity: 0.5,
  },
  profilePicture: {
    marginTop: -100,
  },
  name: {
    color: 'black',
    fontSize: 22,
    fontWeight: '600',
    marginTop: 0,
  },
  date: {
    marginTop: 20,
  },
});

export default ProfileView;
