import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ProfilePicture} from '../../../../../../components/Images';
import {nameToFirstLetters, theme} from '../../../../../../utils/Utils';
import Text from '../../../../../../components/Text';
import {ActionButton} from '../../../../../../components/Buttons';
import SimpleCard from '../../../../../../components/Cards/SimpleCard';
import {FontWeight} from '../../../../../../models/Common';
import {PendingDate} from '../../../../../../models/Profile';

interface Props {
  fullname: string;
  cover?: string;
  profilePicture?: string;
  date?: Date;
  upcomingDates?: PendingDate[];

  onEditProfilePress?: () => void;
  onLogout?: () => void;
  didPressSeeDates?: () => void;
}

interface State {
  coverColor: string;
}

const ProfileView = ({
  fullname,
  date = new Date(),
  cover,
  profilePicture = '',
  upcomingDates = [],
  onEditProfilePress = () => {},
  onLogout = () => {},
  didPressSeeDates = () => {},
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
        {upcomingDates.length > 0 && (
          <SimpleCard
            iconName="bell-outline"
            title="Próximas citas"
            style={{marginVertical: 20}}>
            {upcomingDates.map(item => (
              <View style={{marginBottom: 10, paddingHorizontal: 10}}>
                <Text
                  weight={FontWeight.Bold}
                  style={{color: theme['color-primary-700'], fontSize: 16}}>
                  {item.label}
                </Text>
                {item.hours.map(hour => (
                  <Text
                    weight={FontWeight.Medium}
                    style={{color: 'black', fontSize: 15}}>
                    {hour}
                  </Text>
                ))}
              </View>
            ))}
          </SimpleCard>
        )}
        <View style={styles.bottomContainer}>
          <ActionButton
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
            title="Cerrar sesión"
            onPress={onLogout}
          />
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
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoutButton: {
    paddingHorizontal: 20,
    backgroundColor: theme['color-danger-100'],
  },
  logoutButtonText: {
    color: theme['color-danger-700'],
  },
});

export default ProfileView;
