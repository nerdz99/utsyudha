// GridLine/GridLine.tsx

import React from 'react';
import { Animated, View } from 'react-native';
import withPanResponder from './withPanResponder';
import type { GridLineProps } from './type';
/**
 *
 *
 * @export
 * @param {Function} getAnimatedStyle
 * @param {*} style
 * @return {*}
 */
export default function GridLine(getAnimatedStyle: Function, style: any) {
  return withPanResponder((props: GridLineProps) => {
    const { pan, panResponder } = props;
    return (
      <Animated.View
        style={getAnimatedStyle(pan)}
        {...panResponder.panHandlers}
      >
        <View style={style} />
      </Animated.View>
    );
  });
}
