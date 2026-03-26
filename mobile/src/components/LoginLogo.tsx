import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const LoginLogo = () => (
  <View style={styles.wrapper}>
    <Image
      source={require('@images/LogoLogin.png')}
      style={styles.logo}
      resizeMode="contain"
    />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 180,
    height: 180,
  },
});

export default LoginLogo;
