// src/components/Button.tsx
import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import styles from '../styles/Button.style';

interface IButtonProps {
  onPress: () => void;
  children: string;
}

export default function Button(props: IButtonProps) {
  const { onPress, children } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.btn}>
        <Text style={styles.btnLabel}>{children}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
