// src/styles/Grid.style.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  edge: {
    borderColor: '#fff',
    width: 24,
    height: 24,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  column: { flex: 1, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)' },
});

export default styles;
