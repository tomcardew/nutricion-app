import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ImageURISource,
  ImageRequireSource,
} from 'react-native';
import HeaderView from '../Header/HeaderView';
import {default as theme} from '../../../custom-theme.json';
import LoaderView from '../LoaderView';
import AlertPopup from '../Alert/AlertPopup';
import {AlertMessage, AlertType} from '../../models/Common';
import ImageView from 'react-native-image-viewing';

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
  actionButtonView?: JSX.Element;
  rightAccessory?: JSX.Element;
  showDateSelector?: boolean;
  showImageGallery?: boolean;
  imageGalleryAssets?: (ImageURISource | ImageRequireSource)[];
  imageGalleryIndex?: number;
  loadingStyle?: StyleProp<ViewStyle>;

  onAlertDismiss?: () => void;
  onBackAction?: () => void;
  onActionButtonPress?: () => void;
  didChangeSelectedDate?: (date: Date) => void;
  didPressCloseGallery?: () => void;
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
  actionButtonView,
  rightAccessory,
  loadingStyle,
  showImageGallery,
  imageGalleryAssets = [],
  imageGalleryIndex = 0,
  onBackAction = () => {},
  onAlertDismiss = () => {},
  onActionButtonPress = () => {},
  didPressCloseGallery = () => {},
}: Props) => {
  const content = () => (
    <View style={styles.content}>
      {actionButtonView && (
        <TouchableOpacity
          style={styles.actionButtonContainer}
          onPress={onActionButtonPress}>
          {actionButtonView}
        </TouchableOpacity>
      )}
      <AlertPopup
        title={alert?.title}
        message={alert?.message}
        error={alert?.error}
        type={alert?.type || AlertType.Error}
        showIcon={alert?.showIcon}
        actions={alert?.actions}
        onDismiss={onAlertDismiss}
      />
      <LoaderView
        style={loadingStyle}
        message={loadingMessage}
        animating={loading}
      />
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
            rightAccessory={rightAccessory}
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
      <ImageView
        images={imageGalleryAssets}
        imageIndex={imageGalleryIndex}
        visible={showImageGallery ?? false}
        onRequestClose={didPressCloseGallery}
      />
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
  actionButtonContainer: {
    position: 'absolute',
    right: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    zIndex: 9,
    height: 60,
    width: 60,
    backgroundColor: theme['color-primary-500'],
    borderRadius: 100,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 10,
    elevation: 3,
  },
});

export default BaseLayoutView;
