import React from 'react';
import { 
  Canvas, 
  Image, 
  useImage, 
  ColorMatrix,
} from '@shopify/react-native-skia';
import { View } from 'react-native';

interface BlackWhiteImageProps {
  imageUri: string;
  width: number;
  height: number;
  style?: any;
}

export default function BlackWhiteImage({ 
  imageUri, 
  width, 
  height, 
  style 
}: BlackWhiteImageProps) {
  const image = useImage(imageUri);

  
  const grayscaleMatrix = [
    0.299, 0.587, 0.114, 0, 0,  
    0.299, 0.587, 0.114, 0, 0,  
    0.299, 0.587, 0.114, 0, 0,  
    0,     0,     0,     1, 0   
  ];

  if (!image) {
    return <View style={[{ width, height, backgroundColor: '#f0f0f0' }, style]} />;
  }

  return (
    <View style={[{ width, height }, style]}>
      <Canvas style={{ width, height }}>
        <Image
          image={image}
          fit="cover"
          x={0}
          y={0}
          width={width}
          height={height}
        >
          <ColorMatrix matrix={grayscaleMatrix} />
        </Image>
      </Canvas>
    </View>
  );
}