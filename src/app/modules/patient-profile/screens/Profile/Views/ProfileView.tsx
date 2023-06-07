import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ProfilePicture} from '../../../../../../components/Images';
import {PendingDate, Profile} from '../../../../../../models/Profile';
import ProfileSummaryCard from './ProfileSummaryCard';
import ProfileWeightCard from './ProfileWeightCard';
import ProfileDietCard from './ProfileDietCard';
import Text from '../../../../../../components/Text';
import Environment from '../../../../../../constants/Environment';
import {FontWeight} from '../../../../../../models/Common';
import ProfileStepsCard from './ProfileStepsCard';
import {ActionButton} from '../../../../../../components/Buttons';
import {theme} from '../../../../../../utils/Utils';
import SimpleCard from '../../../../../../components/Cards/SimpleCard';

interface Props {
  profile?: Profile | null;
  date?: Date;
  enableSteps?: boolean;
  stepCount?: number;
  upcomingDates?: PendingDate[];
  upcomingExercises?: PendingDate[];

  onEditProfilePress?: () => void;
  onLogout?: () => void;
  didPressGoToProgress?: () => void;
  didPressSeeDiet?: () => void;
  didPressSeeVersion?: () => void;
}

const ProfileView = ({
  profile,
  date = new Date(),
  enableSteps = true,
  stepCount = 0,
  upcomingDates = [],
  upcomingExercises = [],
  onEditProfilePress = () => {},
  onLogout = () => {},
  didPressGoToProgress = () => {},
  didPressSeeDiet = () => {},
  didPressSeeVersion = () => {},
}: Props) => {
  const weight =
    profile && profile.Datos && profile.Datos.length > 0
      ? profile.Datos[profile.Datos.length - 1].resultados_peso
      : '--';
  const bodyFat =
    profile && profile.Datos && profile.Datos.length > 0
      ? profile.Datos[profile.Datos.length - 1].resultados_grasa_corporal
      : '--';
  const muscle =
    profile && profile.Datos && profile.Datos.length > 0
      ? profile.Datos[profile.Datos.length - 1].resultados_kg_musculo
      : '--';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {profile && (
        <View style={styles.content}>
          <ProfilePicture
            fullname={profile?.nombre}
            email={profile?.email}
            type="small"
            // date={date}
            url={profile?.urlFoto}
            onEditProfilePress={onEditProfilePress}
          />
          {upcomingDates.length > 0 && (
            <SimpleCard
              iconName="bell-outline"
              title="Próximas citas"
              style={{
                marginTop: -100,
                marginBottom: 20,
                width: Dimensions.get('window').width - 40,
              }}>
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
          {upcomingExercises.length > 0 && (
            <SimpleCard
              iconName="bell-outline"
              title="Próximos ejercicios"
              style={{
                marginBottom: 20,
                marginTop: upcomingDates.length > 0 ? 0 : -100,
                width: Dimensions.get('window').width - 40,
              }}>
              {upcomingExercises.map(item => (
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
          <ProfileWeightCard
            weight={weight}
            style={{
              marginTop:
                upcomingDates.length > 0 || upcomingExercises.length > 0
                  ? 0
                  : -100,
              width: Dimensions.get('window').width - 40,
            }}
          />
          {enableSteps && (
            <ProfileStepsCard
              style={{
                marginTop: 20,
                width: Dimensions.get('window').width - 40,
              }}
              goal={5000}
              count={stepCount}
            />
          )}
          <ProfileSummaryCard
            weight={weight}
            bodyFat={bodyFat}
            muscle={muscle}
            style={{
              marginTop: 20,
              width: Dimensions.get('window').width - 40,
            }}
            onSeeAllPress={didPressGoToProgress}
          />
          {profile.seccion_ejercicios && (
            <ProfileDietCard
              onSeeDietPress={didPressSeeDiet}
              style={{
                marginTop: 20,
                width: Dimensions.get('window').width - 40,
              }}
            />
          )}
          <View style={styles.bottomContainer}>
            <ActionButton
              style={styles.logoutButton}
              textStyle={styles.logoutButtonText}
              title="Cerrar sesión"
              onPress={onLogout}
            />
          </View>
          <TouchableOpacity onPress={didPressSeeVersion}>
            <Text weight={FontWeight.Medium} style={styles.versionNumber}>
              Versión {Environment.VERSION}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
  },
  content: {
    minHeight: '100%',
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -20,
  },
  versionNumber: {
    marginTop: 20,
    color: 'black',
    opacity: 0.25,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
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
