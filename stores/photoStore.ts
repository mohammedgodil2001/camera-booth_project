
import { create } from 'zustand';

interface PhotoStore {
  
  capturedImages: string[];
  MAX_IMAGES: number;
  
  
  setCapturedImages: (images: string[]) => void;
  addImage: (imageUri: string) => void;
  removeImage: (index: number) => void;
  clearAllImages: () => void;
  replaceImage: (index: number, imageUri: string) => void;
  
  
  canAddMore: () => boolean;
  remainingSlots: () => number;
}

export const usePhotoStore = create<PhotoStore>((set, get) => ({
  
  capturedImages: [],
  MAX_IMAGES: 3,
  

  setCapturedImages: (images) => set({ capturedImages: images }),
  
  addImage: (imageUri) => set((state) => {
    if (state.capturedImages.length < state.MAX_IMAGES) {
      return { capturedImages: [...state.capturedImages, imageUri] };
    }
    return state;
  }),
  
  removeImage: (index) => set((state) => ({
    capturedImages: state.capturedImages.filter((image, i) => i !== index)
  })),
  
  clearAllImages: () => set({ capturedImages: [] }),
  
  replaceImage: (index, imageUri) => set((state) => {
    const newImages = [...state.capturedImages];
    if (index < newImages.length) {
      newImages[index] = imageUri;
    } else {
      newImages.push(imageUri);
    }
    return { capturedImages: newImages };
  }),
  
  
  canAddMore: () => {
    const state = get();
    return state.capturedImages.length < state.MAX_IMAGES;
  },
  
  remainingSlots: () => {
    const state = get();
    return state.MAX_IMAGES - state.capturedImages.length;
  },
}));