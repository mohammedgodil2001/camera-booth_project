import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  showArrow?: boolean;
  arrowColor?: string;
  style?: any;
  textStyle?: any;
  disabledStyle?: any;
  disabledTextStyle?: any;
  loading?: boolean;
  loadingText?: string;
}

export default function CustomButton({
  title,
  onPress,
  disabled = false,
  showArrow = true,
  arrowColor = '#000',
  style,
  textStyle,
  disabledStyle,
  disabledTextStyle,
  loading = false,
  loadingText,
}: CustomButtonProps) {
  const isDisabled = disabled || loading;
  const displayText = loading && loadingText ? loadingText : title;

  return (
    <TouchableOpacity
      style={[
        style,
        isDisabled && disabledStyle
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={[
        textStyle,
        isDisabled && disabledTextStyle
      ]}>
        {displayText}
      </Text>
      
      {showArrow && (
        <Svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <Path
            d="M12.353 9.84902L12.0196 0.642482L2.81147 0.928064C2.71511 0.918301 2.61777 0.929355 2.52605 0.96048C2.43433 0.991604 2.35037 1.04207 2.27985 1.10847C2.20933 1.17486 2.1539 1.25563 2.11731 1.34531C2.08072 1.43499 2.06383 1.53149 2.06777 1.62826C2.07172 1.72504 2.09641 1.81984 2.14018 1.90624C2.18394 1.99264 2.24576 2.06864 2.32145 2.12907C2.39714 2.1895 2.48493 2.23297 2.57888 2.25653C2.67283 2.28008 2.77074 2.28318 2.86599 2.2656L9.76649 2.06237L0.933264 11.51C0.810801 11.641 0.745386 11.8153 0.75141 11.9945C0.757433 12.1737 0.834402 12.3432 0.965384 12.4657C1.09637 12.5881 1.27063 12.6535 1.44984 12.6475C1.62906 12.6415 1.79853 12.5645 1.921 12.4335L10.7542 2.98586L11.0148 9.88444C11.0215 10.0637 11.0991 10.233 11.2306 10.3551C11.362 10.4772 11.5366 10.542 11.7159 10.5353C11.8952 10.5287 12.0645 10.4511 12.1866 10.3196C12.3087 10.1881 12.3735 10.0135 12.3668 9.83421L12.353 9.84902Z"
            fill={isDisabled ? '#ccc' : arrowColor}
          />
        </Svg>
      )}
    </TouchableOpacity>
  );
}