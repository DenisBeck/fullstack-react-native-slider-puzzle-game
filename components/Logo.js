import { Image, StyleSheet } from 'react-native';
import React from 'react';

import logo from '../assets/logo3x.png';

export default function Logo() {
  return <Image style={styles.image} source={logo} />;
}

Logo.propTypes = {};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: null,
    resizeMode: 'contain',
    aspectRatio: 285 / 84,
  },
});
