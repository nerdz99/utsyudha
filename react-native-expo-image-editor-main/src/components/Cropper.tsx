// Cropper.tsx
import React, { ReactElement, JSXElementConstructor, createRef } from 'react';
import {
  View,
  Animated,
  PanResponder,
  PanResponderInstance,
  PanResponderGestureState,
  GestureResponderEvent,
} from 'react-native';
import styles from '../styles/Cropper.style';
import Grid from './Grid/Grid';
import { getImageSize } from './utils';

enum Direction {
  NONE,
  NORMAL,
  LEFT,
  RIGHT,
  TOP,
  BOTTOM,
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
}

interface ICropperProps {
  imageWidth: number;
  imageHeight: number;
  originX: number;
  originY: number;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}

interface ICropperState {
  direction: Direction;
  initialWidth: number;
  initialHeight: number;
  initialLeft: number;
  initialTop: number;
}

class Cropper extends React.Component<ICropperProps, ICropperState> {
  private panResponder: PanResponderInstance;
  private gridRef = createRef<any>();
  private pan: Animated.ValueXY;
  private boxWidth: Animated.Value;
  private boxHeight: Animated.Value;
  constructor(props: ICropperProps) {
    super(props);
    // Initial State
    this.state = {
      direction: Direction.NONE,
      initialWidth: props.imageWidth,
      initialHeight: props.imageHeight,
      initialLeft: 0,
      initialTop: 0,
    };
    // ==============================
    // Ref for grid component
    this.gridRef = React.createRef();
    // ==========================
    // Initial Pan
    this.pan = new Animated.ValueXY({ x: 0, y: 0 });
    // ==========================
    // === Box Animated Width & Height ===
    this.boxWidth = new Animated.Value(props.imageWidth);
    this.boxHeight = new Animated.Value(props.imageHeight);
    // ==========================
    // === Initialize pan responder ===
    this.onPanResponderGrant = this.onPanResponderGrant.bind(this);
    this.onPanResponderMove = this.onPanResponderMove.bind(this);
    this.onPanResponderEnd = this.onPanResponderEnd.bind(this);
    // this.getCroppedData = this.getCroppedData.bind(this);
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => true,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderTerminate: this.onPanResponderEnd,
      onPanResponderRelease: this.onPanResponderEnd,
    });
    //  ==========================
  }

  /**
   *
   * Reset the cropper to initial state
   * @memberof Cropper
   */
  public reset() {
    const { imageWidth, imageHeight } = this.props;
    this.boxWidth.setValue(imageWidth);
    this.boxHeight.setValue(imageHeight);

    this.pan.setOffset({ x: 0, y: 0 });
    this.setState({
      initialTop: 0,
      initialLeft: 0,
      initialWidth: imageWidth,
      initialHeight: imageHeight,
    });
  }

  private onPanResponderEnd() {
    const { initialTop, initialLeft } = this.state;

    this.setState({
      initialWidth: (this.boxWidth as any)._value,
      initialHeight: (this.boxHeight as any)._value,
      initialTop: initialTop + (this.pan.y as any)._value,
      initialLeft: initialLeft + (this.pan.x as any)._value,
    });
    this.pan.flattenOffset();
    this.pan.setValue({ x: 0, y: 0 });
  }

  private onPanResponderMove(
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) {
    const { dx: ndx, dy: ndy } = gestureState;
    const { direction, initialLeft, initialTop, initialWidth, initialHeight } =
      this.state;
    const { originX } = this.props;
    let dx = 0;
    let dy = 0;
    let dw = 0;
    let dh = 0;

    switch (direction) {
      case Direction.LEFT:
        dx = ndx;
        dy = 0;
        dw = initialWidth - dx;
        dh = initialHeight;
        break;
      case Direction.RIGHT:
        dx = 0;
        dy = 0;
        dw = initialWidth + ndx;
        dh = initialHeight;
        break;
      case Direction.TOP:
        dx = 0;
        dy = ndy;
        dw = initialWidth;
        dh = initialHeight - ndy;
        break;
      case Direction.BOTTOM:
        dx = 0;
        dy = 0;
        dw = initialWidth;
        dh = initialHeight + ndy;
        break;
      case Direction.TOP_LEFT:
        dx = ndx;
        dy = ndy;
        dw = initialWidth - ndx;
        dh = initialHeight - ndy;
        break;
      case Direction.TOP_RIGHT:
        dx = 0;
        dy = ndy;
        dw = initialWidth + ndx;
        dh = initialHeight - ndy;
        break;
      case Direction.BOTTOM_LEFT:
        dx = ndx;
        dy = 0;
        dw = initialWidth - ndx;
        dh = initialHeight + ndy;
        break;
      case Direction.BOTTOM_RIGHT:
        dx = 0;
        dy = 0;
        dw = initialWidth + ndx;
        dh = initialHeight + ndy;
        break;
      default:
        if (ndx + initialLeft + initialWidth >= this.props.imageWidth)
          dx = this.props.imageWidth - initialLeft - initialWidth;
        else dx = ndx;
        if (ndy + initialTop + initialHeight >= this.props.imageHeight)
          dy = this.props.imageHeight - (initialTop + initialHeight);
        else dy = ndy;

        dw = initialWidth;
        dh = initialHeight;
    }

    if (initialLeft + dx <= originX) dx = -initialLeft;

    if (initialTop + dy <= 0) dy = -initialTop;

    if (dw + initialLeft >= this.props.imageWidth)
      dw = this.props.imageWidth - initialLeft;

    if (dh + initialTop > this.props.imageHeight)
      dh = this.props.imageHeight - initialTop;

    return Animated.event(
      [
        null,
        {
          dx: this.pan.x,
          dy: this.pan.y,
          dw: this.boxWidth,
          dh: this.boxHeight,
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event, { dx, dy, dw, dh });
  }

  private onPanResponderGrant(
    _: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) {
    const { moveX, moveY } = gestureState;
    console.log('giant');
    this.gridRef.current.measure(
      (
        _fx: number,
        _fy: number,
        width: number,
        height: number,
        px: number,
        py: number
      ) => {
        const xPan = Math.floor((moveX - px) / (width / 3));
        const yPan = Math.floor((moveY - py) / (height / 3));

        this.setState({ direction: this.getDirection(xPan, yPan) });
      }
    );

    this.pan.setOffset({
      x: (this.pan.x as any)._value,
      y: (this.pan.y as any)._value,
    });
  }

  public async getCroppedData(uri: string): Promise<{
    originX: number;
    originY: number;
    width: number;
    height: number;
  }> {
    const { initialTop, initialWidth, initialHeight, initialLeft } = this.state;

    const { imageWidth, imageHeight } = this.props;
    const { width: actualWidth, height: actualHeight } = await getImageSize(
      uri
    );
    const scaleX = actualWidth / imageWidth;
    const scaleY = actualHeight / imageHeight;

    return {
      originX: initialLeft * scaleX,
      originY: initialTop * scaleY,
      width: initialWidth * scaleX,
      height: initialHeight * scaleY,
    };
  }

  private getDirection(xPos: number, yPos: number) {
    const index = Math.floor(yPos * 3 + xPos);
    switch (index) {
      case 0:
        return Direction.TOP_LEFT;
      case 1:
        return Direction.TOP;
      case 2:
        return Direction.TOP_RIGHT;
      case 3:
        return Direction.LEFT;
      case 4:
        return Direction.NORMAL;
      case 5:
        return Direction.RIGHT;
      case 6:
        return Direction.BOTTOM_LEFT;
      case 7:
        return Direction.BOTTOM;
      case 8:
        return Direction.BOTTOM_RIGHT;
      default:
        return Direction.NORMAL;
    }
  }

  render() {
    const { children, imageHeight, imageWidth, originX } = this.props;
    const getGirdAnimatedStyle = () => {
      return {
        width: this.boxWidth,
        height: this.boxHeight,
        zIndex: 100,
        left: originX,
        transform: [
          {
            translateX: Animated.add(this.pan.x, this.state.initialLeft),
          },
          { translateY: Animated.add(this.pan.y, this.state.initialTop) },
        ],
      };
    };

    return [
      children,
      <View
        key={'Grid'}
        style={[
          {
            width: imageWidth,
            height: imageHeight,
          },
          styles.container,
        ]}
      >
        <Animated.View
          ref={this.gridRef}
          style={getGirdAnimatedStyle()}
          {...this.panResponder?.panHandlers}
        >
          <Grid />
        </Animated.View>
      </View>,
    ];
  }
}

export default Cropper;
