// src/components/Grid/GridCol.tsx
import { View } from 'react-native';
import withStyle from '../../plugins/withStyle';
import styles from '../../styles/Grid.style';

const GridCol = withStyle(View, styles.column);

export default GridCol;
