import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ActionButton} from '../../../../../../components/Buttons';
import {TextInput} from '../../../../../../components/Inputs';
import Text from '../../../../../../components/Text';
import {FontWeight} from '../../../../../../models/Common';

interface Props {
  email: string;
  didChangeEmail?: (nextValue: string) => void;
  onSendPress?: () => void;
}

const ForgotPasswordView = ({
  email,
  didChangeEmail = () => {},
  onSendPress = () => {},
}: Props) => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text weight={FontWeight.Medium} style={styles.description}>
          No te preocupes. Para continuar, ingresa el correo electrónico con el
          que te registraste.
        </Text>
        <TextInput
          label="Correo electrónico"
          value={email}
          textContentType="emailAddress"
          onChangeText={didChangeEmail}
        />
        <ActionButton
          title="Enviar"
          style={styles.button}
          onPress={onSendPress}
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
    flex: 1,
    justifyContent: 'flex-start',
  },
  description: {
    color: '#333',
    fontSize: 15,
    marginBottom: 30,
    textAlign: 'justify',
  },
  button: {
    marginTop: 10,
  },
});

export default ForgotPasswordView;
