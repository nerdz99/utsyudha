// src/components/utils.ts

import { Image, Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export function resizeImage(
  imageWidth: number,
  imageHeight: number,
  screenWidth: number,
  screenHeight: number
): { width: number; height: number } {
  const ratio = Math.min(screenWidth / imageWidth, screenHeight / imageHeight);

  return {
    width: imageWidth * ratio,
    height: imageHeight * ratio,
  };
}

export function getImageSize(
  uri: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (actualWidth: number, actualHeight: number) =>
        resolve({
          width: actualWidth,
          height: actualHeight,
        }),
      (error) => reject(error)
    );
  });
}

export async function getImageLayout(
  uri: string,
  previewWidth: number,
  previewHeight: number
): Promise<{ width: number; height: number }> {
  const layout = await getImageSize(uri);
  const resize = resizeImage(
    layout.width,
    layout.height,
    previewWidth,
    previewHeight
  );
  return resize;
}
