// src/components/Controller.tsx
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useProvider } from './Provider';
import Row from './Row';
import Label from './Label';
import styles from '../styles/Controller.style';
import Button from './Button';

interface IControllerProps {
  children: any;
  onBack: () => void;
  onDone: () => void;
}

export default function Controller(props: IControllerProps) {
  const { children, onBack, onDone } = props;
  const {
    manipulator: { setVisible },
  } = useProvider();

  const handleCrop = () => {
    setVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Row>
        <Label onPress={onBack}>退出</Label>
        <Label onPress={handleCrop}>剪裁</Label>
      </Row>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </View>
      <Row>
        <Label />
        <Button onPress={onDone}>完成</Button>
      </Row>
    </SafeAreaView>
  );
}
