import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Image, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {PlainButton} from '../../../../../../components/Buttons';
import {ProfilePicture} from '../../../../../../components/Images';
import {
  nameToFirstLetters,
  parseDate,
  theme,
} from '../../../../../../utils/Utils';

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
    setState({...state, coverColor: theme['color-primary-600']});
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <ProfilePicture
          fullname={fullname}
          date={date}
          style={styles.profilePicture}
          fallback={`${nameToFirstLetters(fullname)}`}
          url={profilePicture}
          onEditProfilePress={onEditProfilePress}
        />
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
  },
  pictureBottomContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profilePicture: {
    marginTop: -21,
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
