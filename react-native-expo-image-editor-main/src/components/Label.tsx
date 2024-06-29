import { Text, StyleSheet } from 'react-native';
import withStyle from '../plugins/withStyle';

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontSize: 18,
    padding: 8,
  },
});

const Label = withStyle(Text, styles.label);

export default Label;
