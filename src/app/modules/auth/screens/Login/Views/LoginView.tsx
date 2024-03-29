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
        imageUrl="https://img.freepik.com/premium-vector/vitamin-seamless-pattern-vegetables-fruits-linear-style-green-outline-isolated-white-background-healthy-vegetarian-food-eco-concept-vector-illustration_259594-332.jpg"
        title="Juntos hasta lograr la meta"
      />
      <View style={styles.content}>
        <TextInput
          label="Correo electrónico"
          value={email}
          onChangeText={didChangeEmail}
          keyboardType="email-address"
          autocapitalize={false}
        />
        <TextInput
          value={password}
          label="Contraseña"
          secureTextEntry
          onChangeText={didChangePassword}
          autocapitalize={false}
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
