// src/component/ImageEditor.tsx
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { SaveOptions, manipulateAsync } from 'expo-image-manipulator';
import Controller from './Controller';
import Manipulator from './Manipulator';
import { Provider } from './Provider';
import { getImageLayout, getImageSize } from './utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  previewArea: {
    backgroundColor: 'rgb(22, 22, 22)',
    flex: 1,
  },
  modHeader: {
    flexDirection: 'row',
    flex: 1,
    height: 120,
  },
});

interface ICropperContainerProps {
  source: { uri: string };
  onBack: () => void;
  onDone: (newImage: any) => void;
  saveOptions: SaveOptions;
}

const { width, height } = Dimensions.get('window');

export default function ImageEditor(
  props: ICropperContainerProps
): JSX.Element {
  const { source, onBack, onDone, saveOptions } = props;
  const [uri, setUri] = useState(source.uri);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const handleUpdate = (croppedImage: any) => {
    setUri(croppedImage.uri);
  };

  useEffect(() => {
    (async () => {
      const layout = await getImageLayout(uri, width, height - 240);
      setImageSize(layout);
    })();
  }, [uri]);

  const handleDone = async () => {
    onDone(await compressImage(uri));
  };

  const compressImage = async (imageUri: string) => {
    const { width: imageWidth, height: imageHeight } = await getImageSize(
      imageUri
    );
    return manipulateAsync(
      imageUri,
      [{ resize: { width: imageWidth, height: imageHeight } }],
      saveOptions
    );
  };

  return (
    <Provider uri={uri}>
      <SafeAreaView style={styles.container}>
        <Controller onBack={onBack} onDone={handleDone}>
          <ImageBackground
            source={{ uri }}
            style={{
              width: imageSize.width,
              height: imageSize.height,
            }}
          />
        </Controller>
        <Manipulator uri={uri} onUpdate={handleUpdate} />
      </SafeAreaView>
    </Provider>
  );
}
