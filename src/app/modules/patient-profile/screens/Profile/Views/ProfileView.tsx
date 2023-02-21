import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {ProfilePicture} from '../../../../../../components/Images';
import {Profile} from '../../../../../../models/Profile';
import ProfileSummaryCard from './ProfileSummaryCard';
import ProfileWeightCard from './ProfileWeightCard';
import {PlainButton} from '../../../../../../components/Buttons';
import SimpleCard from '../../../../../../components/Cards/SimpleCard';
import ProfileDietCard from './ProfileDietCard';

interface Props {
  profile?: Profile | null;
  date?: Date;

  onEditProfilePress?: () => void;
  didPressGoToProgress?: () => void;
  didPressSeeDiet?: () => void;
}

const ProfileView = ({
  profile,
  date = new Date(),
  onEditProfilePress = () => {},
  didPressGoToProgress = () => {},
  didPressSeeDiet = () => {},
}: Props) => {
  const weight =
    profile && profile.Datos && profile.Datos.length > 0
      ? profile.Datos[profile.Datos.length - 1].peso
      : '--';
  const bodyFat =
    profile && profile.Datos && profile.Datos.length > 0
      ? profile.Datos[profile.Datos.length - 1].grasa_corporal
      : '--';
  const imc =
    profile && profile.Datos && profile.Datos.length > 0
      ? profile.Datos[profile.Datos.length - 1].imc
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
          <ProfileWeightCard
            weight={
              weight !== '--'
                ? weight.substring(0, weight.length - 2).trim()
                : undefined
            }
            style={{
              marginTop: -100,
              width: Dimensions.get('window').width - 40,
            }}
          />
          <ProfileSummaryCard
            weight={weight}
            bodyFat={bodyFat}
            imc={imc}
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
});

export default ProfileView;
