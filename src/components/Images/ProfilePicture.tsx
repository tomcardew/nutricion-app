import {Icon} from '@ui-kitten/components';
import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {FontWeight} from '../../models/Common';
import {parseDate, theme} from '../../utils/Utils';
import {PlainButton} from '../Buttons';
import Text from '../Text';
import Image from './Image';

interface Props {
  type?: 'large' | 'small' | 'tall';
  url?: string;
  fallback?: string;
  fullname?: string;
  email?: string;
  date?: Date;
  hideData?: boolean;
  onEditProfilePress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const ProfilePicture = ({
  type = 'large',
  url,
  fallback,
  fullname,
  email,
  date,
  hideData = false,
  onEditProfilePress = () => {},
  style,
}: Props) => {
  const dateString = `${date?.getDate()} de ${parseDate(
    date ?? new Date(),
  )} de ${date?.getFullYear()}`;
  const largeItem = () => {
    return (
      <View>
        <Image
          source={require('../../../public/assets/icons/gradient-bg.png')}
          style={[styles.cover]}
          resizeMode="stretch"
        />
        <Image
          style={styles.item}
          source={{
            uri: url
              ? url
              : `https://ui-avatars.com/api/?name=${fallback}&size=200&background=e5f9bb`,
          }}
        />
        {!hideData && (
          <View style={styles.pictureBottomContainer}>
            {date && (
              <Text weight={FontWeight.Medium} style={styles.date}>
                {dateString}
              </Text>
            )}
            {fullname && (
              <Text weight={FontWeight.SemiBold} style={styles.name}>
                {fullname}
              </Text>
            )}
            <PlainButton title="Editar perfil" onPress={onEditProfilePress} />
          </View>
        )}
      </View>
    );
  };

  const smallItem = () => {
    return (
      <View>
        <Image
          source={require('../../../public/assets/icons/gradient-bg.png')}
          style={[styles.cover, {height: 160}]}
          resizeMode="stretch"
        />
        <View style={styles.card}>
          <Image
            style={styles.smallItem}
            source={{
              uri: url
                ? url
                : `https://ui-avatars.com/api/?name=${fallback}&size=200&background=e5f9bb`,
            }}
          />
          {!hideData && (
            <View style={[styles.smallContainer, , {flex: 1}]}>
              {fullname && (
                <Text weight={FontWeight.SemiBold} style={styles.fullname}>
                  {fullname}
                </Text>
              )}
              {email && (
                <Text weight={FontWeight.Medium} style={styles.email}>
                  {email}
                </Text>
              )}
              {date && (
                <Text style={[styles.date, {marginTop: 0}]}>{dateString}</Text>
              )}
            </View>
          )}
          <TouchableOpacity
            onPress={onEditProfilePress}
            style={[styles.pictureBottomContainer, {alignSelf: 'center'}]}>
            <Icon
              style={{width: 26, height: 26, marginRight: 20}}
              fill={theme['color-primary-800']}
              name="more-vertical-outline"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const tallItem = () => {
    return (
      <View style={styles.contentTall}>
        <Image
          style={[styles.item, styles.itemTall]}
          source={{
            uri: url
              ? url
              : `https://ui-avatars.com/api/?name=${fallback}&size=200&background=e5f9bb`,
          }}
        />
        {!hideData && (
          <View
            style={[
              styles.pictureBottomContainer,
              styles.pictureBottomContainerTall,
            ]}>
            {fullname && (
              <Text
                weight={FontWeight.SemiBold}
                style={[styles.name, {marginBottom: -5, color: 'white'}]}>
                {fullname}
              </Text>
            )}
            {email && (
              <Text
                weight={FontWeight.Medium}
                style={[styles.email, {color: 'white'}]}>
                {email}
              </Text>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderItem = () => {
    switch (type) {
      case 'small':
        return smallItem();
      case 'large':
        return largeItem();
      case 'tall':
        return tallItem();
    }
  };

  return <View style={[styles.container, style]}>{renderItem()}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentTall: {
    backgroundColor: theme['color-primary-600'],
    width: Dimensions.get('screen').width,
  },
  item: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    borderColor: 'white',
    borderWidth: 6,
    overflow: 'hidden',
    backgroundColor: '#eee',
    alignSelf: 'center',
    position: 'absolute',
    top: 50,
  },
  itemTall: {
    top: 10,
    height: 150,
    width: 150,
    position: 'relative',
  },
  cover: {
    width: Dimensions.get('screen').width,
    height: 200,
    marginBottom: 50,
  },
  coverTall: {
    height: 120,
  },
  pictureBottomContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pictureBottomContainerTall: {
    marginTop: 20,
    marginBottom: 10,
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
  card: {
    backgroundColor: 'white',
    elevation: 3,
    height: 80,
    width: Dimensions.get('window').width - 40,
    position: 'absolute',
    top: 20,
    left: 20,
    borderRadius: 6,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  smallItem: {
    height: 60,
    width: 60,
    borderRadius: 40,
    elevation: 1,
  },
  smallContainer: {
    marginLeft: 10,
    height: '100%',
    justifyContent: 'center',
  },
  fullname: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  email: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
  },
});

export default ProfilePicture;
