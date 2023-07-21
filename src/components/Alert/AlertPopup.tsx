import {Icon} from '@ui-kitten/components';
import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Animated, Keyboard} from 'react-native';
import AlertActionButton from './AlertAction';
import {default as theme} from '../../../custom-theme.json';
import {
  AlertAction,
  AlertMessage,
  AlertType,
  ErrorMessage,
  FontWeight,
} from '../../models/Common';
import Text from '../Text';
import {TextInput} from '../Inputs';

interface Props {
  title?: string;
  message?: string;
  error?: ErrorMessage;
  type: AlertType;
  showIcon?: boolean;
  actions?: AlertAction[] | null;
  autoClose?: boolean;
  useInput?: boolean;

  onDismiss?: () => void;
  onInputChange?: (value: string) => void;
}

const ErrorIcon = (props: any) => (
  <Icon {...props} fill={theme['color-danger-600']} name="alert-triangle" />
);

const WarningIcon = (props: any) => (
  <Icon {...props} fill={theme['color-warning-600']} name="alert-triangle" />
);

const InfoIcon = (props: any) => (
  <Icon {...props} fill={theme['color-info-600']} name="info" />
);

const SuccessIcon = (props: any) => (
  <Icon
    {...props}
    fill={theme['color-primary-600']}
    name="checkmark-circle-2"
  />
);

interface IconViewProps {
  type: AlertType;
}

const IconView = ({type}: IconViewProps) => {
  switch (type) {
    case AlertType.Error:
      return <ErrorIcon />;
    case AlertType.Warning:
      return <WarningIcon />;
    case AlertType.Info:
      return <InfoIcon />;
    case AlertType.Success:
      return <SuccessIcon />;
  }
};

const AlertPopup = ({
  title,
  message,
  error,
  showIcon = true,
  actions = [],
  type = AlertType.Success,
  autoClose,
  useInput,
  onDismiss = () => {},
}: Props) => {
  const fadeBackdrop = useRef(new Animated.Value(0)).current;
  const fadePopup = useRef(new Animated.Value(0)).current;
  const scalePopup = useRef(new Animated.Value(0.8)).current;

  const [show, setShow] = useState(false);
  const [data, setData] = useState<AlertMessage>({
    title: '',
    actions: [],
    message: '',
    showIcon: false,
    autoClose: false,
    type: AlertType.Info,
  });

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [innerInputValue, setInnerInputValue] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardVisible(true); // or some other action
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => {
        onDismiss && onDismiss();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [show]);

  useEffect(() => {
    if (title) {
      setShow(true);
      setData({
        title: title!,
        actions: actions!,
        message: message!,
        showIcon: showIcon,
        autoClose: autoClose ?? false,
        type: type,
      });
      Animated.timing(fadeBackdrop, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        Animated.parallel([
          Animated.timing(fadePopup, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(scalePopup, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false,
          }),
        ]).start();
      });
    } else {
      Animated.parallel([
        Animated.timing(fadePopup, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(scalePopup, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => {
        Animated.timing(fadeBackdrop, {
          toValue: 0,
          duration: 200,
          delay: 0,
          useNativeDriver: false,
        }).start(() => {
          setShow(false);
          cleanState();
        });
      });
    }
  }, [title]);

  const cleanState = () => {
    setData({
      title: '',
      actions: [],
      message: '',
      showIcon: false,
      autoClose: false,
      type: AlertType.Info,
    });
  };

  const handleActionClick = (action: AlertAction) => {
    setInnerInputValue('');
    if (action.onClick) action.onClick(innerInputValue);
    else onDismiss();
  };

  if (show) {
    return (
      <View style={styles.super}>
        <Animated.View style={[styles.backdrop, {opacity: fadeBackdrop}]} />
        <Animated.View
          style={[
            styles.container,
            {opacity: fadePopup, transform: [{scale: scalePopup}]},
            {
              transform: [
                {
                  translateY: isKeyboardVisible
                    ? -(keyboardHeight / 2) ?? 0
                    : 0,
                },
              ],
            },
          ]}>
          <View style={[styles.innerContainer]}>
            <View style={styles.titleContainer}>
              {data.showIcon && (
                <View style={styles.icon}>
                  <IconView type={data.type} />
                </View>
              )}
              <Text weight={FontWeight.Bold} style={styles.title}>
                {data.title}
              </Text>
            </View>
            <Text style={styles.message}>{data.message}</Text>
            {useInput && (
              <TextInput
                value={innerInputValue}
                onChangeText={(value: string) => {
                  setInnerInputValue(value);
                }}
              />
            )}
          </View>
          <View
            style={[
              styles.actionContainer,
              data.actions && data.actions.length > 2
                ? styles.actionContainerColumn
                : styles.actionContainerRow,
              {
                height:
                  data.actions && data.actions.length > 2
                    ? 40 * data.actions.length
                    : 40,
              },
            ]}>
            {data.actions &&
              data.actions.map((action, index) => (
                <AlertActionButton
                  label={action.label}
                  type={action.type}
                  onClick={() => {
                    handleActionClick(action);
                  }}
                  isFirstTwo={
                    data.actions && data.actions.length < 3 && index == 0
                  }
                  key={`alert-action-button-${index}`}
                />
              ))}
          </View>
        </Animated.View>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  super: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#00000099',
  },
  container: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    maxWidth: 400,
  },
  innerContainer: {
    padding: 18,
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainerRow: {
    flexDirection: 'row',
  },
  actionContainerColumn: {
    flexDirection: 'column',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    marginBottom: 0,
    textAlign: 'center',
    color: 'black',
  },
  icon: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  error: {
    fontWeight: '300',
    fontSize: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 5,
  },
});

export default AlertPopup;
