// contexts/PhotoContext.tsx (or wherever you put this file)
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PhotoContextType {
  capturedImages: string[];
  setCapturedImages: React.Dispatch<React.SetStateAction<string[]>>;
  addImage: (imageUri: string) => void;
  removeImage: (index: number) => void;
  clearAllImages: () => void;
  replaceImage: (index: number, imageUri: string) => void;
  MAX_IMAGES: number;
  canAddMore: () => boolean;
  remainingSlots: () => number;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

interface PhotoProviderProps {
  children: ReactNode;
}

export function PhotoProvider({ children }: PhotoProviderProps) {
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const MAX_IMAGES = 3;

  const addImage = (imageUri: string) => {
    setCapturedImages(prev => {
      if (prev.length < MAX_IMAGES) {
        return [...prev, imageUri];
      }
      return prev;
    });
  };

  const removeImage = (index: number) => {
    setCapturedImages(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllImages = () => {
    setCapturedImages([]);
  };

  const replaceImage = (index: number, imageUri: string) => {
    setCapturedImages(prev => {
      const newImages = [...prev];
      if (index < newImages.length) {
        newImages[index] = imageUri;
      } else {
        newImages.push(imageUri);
      }
      return newImages;
    });
  };

  const canAddMore = () => capturedImages.length < MAX_IMAGES;
  const remainingSlots = () => MAX_IMAGES - capturedImages.length;

  const value: PhotoContextType = {
    capturedImages,
    setCapturedImages,
    addImage,
    removeImage,
    clearAllImages,
    replaceImage,
    MAX_IMAGES,
    canAddMore,
    remainingSlots,
  };

  return (
    <PhotoContext.Provider value={value}>
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhotos() {
  const context = useContext(PhotoContext);
  if (context === undefined) {
    throw new Error('usePhotos must be used within a PhotoProvider');
  }
  return context;
}