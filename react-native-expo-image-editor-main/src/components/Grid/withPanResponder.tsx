import React, { useRef } from 'react';
import {
  Animated,
  PanResponder,
  // GestureResponderEvent,
  // PanResponderGestureState,
} from 'react-native';

// interface WrapperComponentProps {
//   onMove?: (state: any) => void;
// }

/**
 *
 * @deprecated The method should not be used
 * @export
 * @param {*} WrapperComponent
 * @return {*}
 */
export default function withPanResponder(WrapperComponent: any) {
  return () => {
    // const { onMove } = props;
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          pan.setOffset({
            x: (pan.x as any)._value,
            y: (pan.y as any)._value,
          });
        },
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
          // listener: (
          //   _: GestureResponderEvent,
          //   gestureState: PanResponderGestureState
          // ) => {
          //   /* my own logic */
          //   // console.log(event)
          //   if (onMove) onMove(gestureState);
          // },
        }),
        onPanResponderRelease: () => {
          pan.flattenOffset();
        },
      })
    ).current;

    return <WrapperComponent panResponder={panResponder} pan={pan} />;
  };
}
