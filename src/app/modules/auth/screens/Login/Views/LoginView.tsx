import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import TextInput from '../../../../../../components/Inputs/TextInput';
import {ActionButton, PlainButton} from '../../../../../../components/Buttons';
import Banner from '../../../../../../components/Banners/Banner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

interface Props {
  email: string;
  password: string;
  didChangeEmail?: (nextValue: string) => void;
  didChangePassword?: (nextValue: string) => void;
  onLoginPress?: () => void;
  onRegisterPress?: () => void;
  onForgotPasswordPress?: () => void;
}

const LoginView = ({
  email,
  password,
  onLoginPress = () => {},
  onRegisterPress = () => {},
  didChangeEmail = () => {},
  didChangePassword = () => {},
  onForgotPasswordPress = () => {},
}: Props) => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Banner
        imageUrl="https://alianzapronutricion.org/wp-content/uploads/2020/10/epigenetica-y-nutricion-1.png"
        title="Te damos la bienvenida a tu nueva casa"
      />
      <View style={styles.content}>
        <TextInput
          label="Correo electrónico"
          value={email}
          onChangeText={didChangeEmail}
        />
        <TextInput
          value={password}
          label="Contraseña"
          secureTextEntry
          onChangeText={didChangePassword}
        />
        <PlainButton
          style={{marginBottom: 20}}
          title="¿Olvidaste tu contraseña?"
          onPress={onForgotPasswordPress}
        />
        <ActionButton title="Entrar" onPress={onLoginPress} />
        <PlainButton
          style={{marginTop: 20}}
          title="Registrarse"
          onPress={onRegisterPress}
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
    padding: 20,
  },
});

export default LoginView;
