// src/compoennts/Grid/GridEdge.tsx
import React from 'react';
import { View, ViewStyle } from 'react-native';
import styles from '../../styles/Grid.style';

interface IEdgeProps {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
}

/**
 *
 *
 * @export
 * @param {IEdgeProps} props
 * @return {*}  {React.ReactElement}
 */
export default function GridEdge(props: IEdgeProps): React.ReactElement {
  const { left, top, bottom, right, alignSelf } = props;

  // console.log("Edge reload")
  const getStyles = (): ViewStyle => {
    return {
      borderLeftWidth: left ? left : 0,
      borderTopWidth: top ? top : 0,
      borderBottomWidth: bottom ? bottom : 0,
      borderRightWidth: right ? right : 0,
      alignSelf,
    };
  };

  return <View style={[getStyles(), styles.edge]} />;
}
