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
import AlertPopup from '../Alert/AlertPopup';
import {AlertMessage, AlertType, ErrorMessage} from '../../models/Common';

interface Props {
  title?: string;
  subtitle?: string;
  loadingMessage: string | undefined;
  children?: any;
  hideHeader?: boolean;
  showOverSafeArea?: boolean;
  contentUnderHeader?: boolean;
  loading: boolean;
  alert?: AlertMessage | null;
  showBackButton?: boolean;
  disableScrollBar?: boolean;
  backgroundColor?: string;
  color?: string;
  overlay?: JSX.Element;

  onAlertDismiss?: () => void;
  onBackAction?: () => void;
}

const BaseLayoutView = ({
  title = 'Fitness App',
  subtitle,
  children,
  hideHeader,
  showOverSafeArea,
  contentUnderHeader,
  loading = false,
  loadingMessage,
  alert,
  showBackButton = true,
  disableScrollBar = false,
  backgroundColor = theme['color-primary-600'],
  color = 'white',
  overlay,
  onBackAction = () => {},
  onAlertDismiss = () => {},
}: Props) => {
  const content = () => (
    <View style={styles.content}>
      <AlertPopup
        title={alert?.title}
        message={alert?.message}
        error={alert?.error}
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
        <View
          style={{
            width: '100%',
            position: contentUnderHeader ? 'absolute' : 'relative',
            top: 0,
            zIndex: 10,
          }}>
          <HeaderView
            title={title}
            subtitle={subtitle}
            showBackIcon={showBackButton}
            onBackAction={() => onBackAction()}
            backgroundColor={backgroundColor}
            color={color}
          />
        </View>
      )}
      {disableScrollBar ? (
        <View>{children}</View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator
          contentContainerStyle={styles.content}>
          {children}
        </ScrollView>
      )}
      {overlay}
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
