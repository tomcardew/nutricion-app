import {Icon} from '@ui-kitten/components';
import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Animated} from 'react-native';
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

interface Props {
  title?: string;
  message?: string;
  error?: ErrorMessage;
  type: AlertType;
  showIcon?: boolean;
  actions?: AlertAction[] | null;

  onDismiss?: () => void;
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
  onDismiss = () => {},
}: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [show, setShow] = useState(false);
  const [data, setData] = useState<AlertMessage>({
    title: '',
    actions: [],
    message: '',
    showIcon: false,
    type: AlertType.Info,
  });

  useEffect(() => {
    if (title) {
      setShow(true);
      setData({
        title: title!,
        actions: actions!,
        message: message!,
        showIcon: showIcon,
        type: type,
      });
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setShow(false);
        cleanState();
      });
    }
  }, [title]);

  const cleanState = () => {
    setData({
      title: '',
      actions: [],
      message: '',
      showIcon: false,
      type: AlertType.Info,
    });
  };

  const handleActionClick = (action: AlertAction) => {
    if (action.onClick) action.onClick();
    else onDismiss();
  };

  if (show) {
    return (
      <Animated.View style={[styles.backdrop, {opacity: fadeAnim}]}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.titleContainer}>
              {data.showIcon && (
                <View style={styles.icon}>
                  <IconView type={data.type} />
                </View>
              )}
              <Text weight={FontWeight.SemiBold} style={styles.title}>
                {data.title}
              </Text>
            </View>
            <Text style={styles.message}>{data.message}</Text>
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
        </View>
      </Animated.View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000A0',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  container: {
    width: Dimensions.get('window').width * 0.75,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    maxWidth: 400,
  },
  innerContainer: {
    padding: 15,
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
    fontWeight: '500',
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 0,
    textAlign: 'center',
    color: 'black',
    fontWeight: '400',
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
