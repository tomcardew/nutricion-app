import {Icon} from '@ui-kitten/components';
import React, {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import AlertActionButton, {AlertAction} from './AlertAction';
import {default as theme} from '../../../custom-theme.json';

export enum AlertType {
  Error,
  Warning,
  Info,
  Success,
}

interface Props {
  title?: string;
  message?: string;
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
  showIcon = true,
  actions = [],
  type = AlertType.Success,
  onDismiss = () => {},
}: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (title) {
      setShow(true);
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
      });
    }
  }, [title]);

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
              {showIcon && (
                <View style={styles.icon}>
                  <IconView type={type} />
                </View>
              )}
              <Text style={styles.title}>{title}</Text>
            </View>
            <Text style={styles.message}>{message}</Text>
          </View>
          <View
            style={[
              styles.actionContainer,
              actions && actions.length > 2
                ? styles.actionContainerColumn
                : styles.actionContainerRow,
              {
                height:
                  actions && actions.length > 2 ? 40 * actions.length : 40,
              },
            ]}>
            {actions &&
              actions.map((action, index) => (
                <AlertActionButton
                  label={action.label}
                  type={action.type}
                  onClick={() => {
                    handleActionClick(action);
                  }}
                  isFirstTwo={actions && actions.length < 3 && index == 0}
                  key={Math.random()}
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
    fontSize: 15,
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
});

export default AlertPopup;
