import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import HeaderView from '../Header/HeaderView';
import {default as theme} from '../../../custom-theme.json';
import LoaderView from '../LoaderView';
import AlertPopup, {AlertType} from '../Alert/AlertPopup';
import {AlertAction} from '../Alert/AlertAction';

interface Props {
  title?: string;
  loadingMessage: string | undefined;
  children?: any;
  hideHeader?: boolean;
  showOverSafeArea?: boolean;
  loading: boolean;
  alert?: AlertMessage | null;
  showBackButton?: boolean;

  onAlertDismiss?: () => void;
  onBackAction?: () => void;
}

export interface AlertMessage {
  title: string;
  message: string;
  type: AlertType;
  showIcon: boolean;
  actions: AlertAction[];
}

const BaseLayoutView = ({
  title = 'Fitness App',
  children,
  hideHeader,
  showOverSafeArea,
  loading = false,
  loadingMessage,
  alert,
  showBackButton = true,
  onBackAction = () => {},
  onAlertDismiss = () => {},
}: Props) => {
  const content = () => (
    <View style={styles.content}>
      <AlertPopup
        title={alert?.title}
        message={alert?.message}
        type={alert?.type || AlertType.Error}
        showIcon={alert?.showIcon}
        actions={alert?.actions}
        onDismiss={onAlertDismiss}
      />
      <LoaderView message={loadingMessage} animating={loading} />
      <StatusBar
        backgroundColor={theme['color-primary-600']}
        barStyle="light-content"
      />
      {!hideHeader && (
        <HeaderView
          title={title}
          showBackIcon={showBackButton}
          onBackAction={onBackAction}
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator
        contentContainerStyle={styles.content}>
        {children}
      </ScrollView>
    </View>
  );

  return !showOverSafeArea ? (
    <SafeAreaView style={styles.container}>{content()}</SafeAreaView>
  ) : (
    <View style={[styles.container, styles.safeAreaContainer]}>
      {content()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme['color-primary-600'],
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  safeAreaContainer: {
    marginTop: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default BaseLayoutView;
