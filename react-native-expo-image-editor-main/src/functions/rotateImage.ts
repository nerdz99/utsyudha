// rotateImage.ts
import { Image } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

type rotatedImage = {
  uri: string;
  base64: string | undefined;
  size: {
    width: number;
    height: number;
  };
};

async function rotate(
  uri: string,
  // width: number,
  // height: number,
  saveOptions: ImageManipulator.SaveOptions
): Promise<ImageManipulator.ImageResult> {
  return ImageManipulator.manipulateAsync(
    uri,
    [
      {
        rotate: -90,
      },
    ],
    saveOptions
  );
}

export default function rotateImage(
  uri: string,
  saveOptions: ImageManipulator.SaveOptions
): Promise<rotatedImage> {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      async (width, height) => {
        const { uri: newUri, base64 } = await rotate(
          uri,
          // width,
          // height,
          saveOptions
        );
        resolve({
          size: {
            width: height,
            height: width,
          },
          uri: newUri,
          base64,
        });
      },
      (errors) => reject(errors)
    );
  });
}
