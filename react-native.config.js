module.exports = {
  dependencies: {
    'react-native-code-push': {
      platforms: {
        android: {
          packageInstance:
            'new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG)',
        },
        iod: {
          sharedLibraries: ['libz'],
        },
        commands: {
          postlink: 'node node_modules/react-native-code-push/scripts/postlink/run',
          postunlink: 'node node_modules/react-native-code-push/scripts/postunlink/run',
        },
      },
    },
    'react-native-orientation': {
      platforms: {
        android: {
          packageInstance: 'new OrientationPackage()',
        },
        iod: {
          project: 'iOS/RCTOrientation.xcodeproj',
        },
      },
    },
  },
};
