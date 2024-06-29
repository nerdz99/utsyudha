// cropImage.ts

import * as ImageManipulator from 'expo-image-manipulator';
import type { Size, BoundSize } from '../types/cropImage';

async function makeCrop(
  uri: string,
  bounds: BoundSize,
  saveOptions: ImageManipulator.SaveOptions
): Promise<ImageManipulator.ImageResult> {
  if (bounds.height > 0 && bounds.width > 0) {
    return await ImageManipulator.manipulateAsync(
      uri,
      [
        {
          crop: bounds,
        },
      ],
      saveOptions
    );
  }
  return {
    uri: '',
    base64: '',
    width: 0,
    height: 0,
  };
}

type CroppedImageType = {
  actualSize: Size;
  uri: string;
  base64: string | undefined;
};

// const options = {
//   compress: 1,
//   format: ImageManipulator.SaveFormat.PNG,
//   base64: false,
// };

export default function cropImage(
  uri: string,
  bounding: any,
  saveOptions: ImageManipulator.SaveOptions
): Promise<CroppedImageType> {
  return new Promise(async (resolve) => {
    const {
      uri: uriCroped,
      base64,
      width: croppedWidth,
      height: croppedHeight,
    } = await makeCrop(
      uri,
      {
        originX: bounding.originX,
        originY: bounding.originY,
        width: bounding.width,
        height: bounding.height,
      },
      saveOptions
    );
    resolve({
      actualSize: {
        width: croppedWidth,
        height: croppedHeight,
      },
      uri: uriCroped,
      base64,
    });
  });
}
