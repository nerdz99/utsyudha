// src/styles/FadeView.style.ts

import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  fadeView: {
    width,
    height,
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
  },
  container: {
    backgroundColor: '#000',
    justifyContent: 'space-between',
    height,
  },
  header: {
    height: 120,
    alignItems: 'center',
    zIndex: 100,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: { height: 120, alignItems: 'center', justifyContent: 'flex-end' },
});

export default styles;
