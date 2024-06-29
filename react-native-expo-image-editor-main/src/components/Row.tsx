// src/components/Row.tsx
import { View, StyleSheet } from 'react-native';
import withStyle from '../plugins/withStyle';

const styles = StyleSheet.create({
  row: {
    // paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

const Row = withStyle(View, styles.row);

export default Row;
