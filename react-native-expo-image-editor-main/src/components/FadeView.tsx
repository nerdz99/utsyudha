// src/components/FadeView.tsx
import React from 'react';
import { Animated } from 'react-native';

interface IFadeViewProps {
  children: React.ReactNode;
  visible: boolean;
  style: any;
}

export default class FadeView extends React.Component<IFadeViewProps> {
  state = {
    fadeAnim: new Animated.Value(0),
  };

  componentDidUpdate() {
    Animated.timing(this.state.fadeAnim, {
      toValue: this.props.visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  componentWillUnmount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { visible, children, style } = this.props;

    const getFadeStyle = () => ({
      opacity: this.state.fadeAnim,
    });

    return (
      <Animated.View
        pointerEvents={visible ? 'auto' : 'none'}
        style={[getFadeStyle(), style]}
      >
        {children}
      </Animated.View>
    );
  }
}
