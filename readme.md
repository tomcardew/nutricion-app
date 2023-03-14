# Nutrición App

![](https://img.shields.io/badge/version-0.1.0-green?style=for-the-badge)

Aplicación de fitness y nutrición hecha con React Native y TypeScript.

## Prerrequisitos

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 13 o superior](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Dependencias

- [react-navigation](https://reactnavigation.org/) para la navegación.
- [@ui-kitten](https://akveo.github.io/react-native-ui-kitten/) componentes y estilos.
- [mobx](https://mobx.js.org/README.html) control de estado.

## Instalación

### iOS

- Asegurate de tener instalado Xcode y Cocoapods
- Ejecuta `brew update`
- Ejecuta `brew install watchman`
- Ejecuta `brew cask install react-native-debugger`
- Ejecuta `yarn`
- Desde el directorio raiz, ejecuta `cd ios && pod install` para instalar los paquetes de Cocoapods
- Desde el directorio raiz, ejecuta `yarn ios`

### Android

- Asegurate de tener instalado Android Studio y un JDK > 11
- Ejectua `yarn`
- Desde el directorio raiz, ejecuta `yarn android`

### Generar build release en Android

- Ejecuta `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle`
- Ejecuta `yarn build-android`
