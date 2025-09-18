// import * as ImagePicker from 'expo-image-picker';
// import { useState } from 'react';
// import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { router } from 'expo-router';

// export default function UploadScreen() {
//   const [capturedImages, setCapturedImages] = useState<string[]>([]);

//   const selectPhotoForBox = async (boxIndex: number) => {
//     try {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ['images'],
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         const newImage = result.assets[0].uri;
//         setCapturedImages(prev => {
//           const newArray = [...prev];
//           newArray[boxIndex] = newImage;
//           return newArray;
//         });
//       }
//     } catch (error) {
//       console.error('Error picking image:', error);
//       Alert.alert('Error', 'Failed to pick image. Please try again.');
//     }
//   };

//   const getUploadedPhotoCount = () => {
//     return capturedImages.filter(img => img).length;
//   };

//   const navigateToPreview = () => {
//     // Pass the photos to preview screen
//     const validPhotos = capturedImages.filter(img => img);
//     router.push({
//       pathname: '/preview',
//       params: { 
//         photos: JSON.stringify(validPhotos)
//       }
//     });
//   };

//   const goBack = () => {
//     router.back();
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity 
//         style={styles.backButton}
//         onPress={goBack}
//       >
//         <Text style={styles.backButtonText}>Back</Text>
//       </TouchableOpacity>

//       <Text style={styles.uploadTitle}>Upload Your Photos</Text>
      
//       <View style={styles.uploadContainer}>
//         <View style={styles.photoBoxesContainer}>
//           {[0, 1, 2].map((index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.photoBox}
//               onPress={() => selectPhotoForBox(index)}
//             >
//               {capturedImages[index] ? (
//                 <Image source={{ uri: capturedImages[index] }} style={styles.boxImage} />
//               ) : (
//                 <Text style={styles.boxNumber}>{index + 1}</Text>
//               )}
//             </TouchableOpacity>
//           ))}
//         </View>

//         <TouchableOpacity
//           style={[
//             styles.continueButton,
//             getUploadedPhotoCount() === 0 ? styles.continueButtonDisabled : null
//           ]}
//           onPress={navigateToPreview}
//           disabled={getUploadedPhotoCount() === 0}
//         >
//           <Text style={[
//             styles.continueButtonText,
//             getUploadedPhotoCount() === 0 ? styles.continueButtonTextDisabled : null
//           ]}>
//             Continue with {getUploadedPhotoCount()} photos
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#f0ebe4',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 60,
//     left: 20,
//     backgroundColor: '#333',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     zIndex: 1,
//   },
//   backButtonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   uploadTitle: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#8B7355',
//     marginBottom: 50,
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   uploadContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//   },
//   photoBoxesContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '90%',
//     maxWidth: 350,
//     marginBottom: 50,
//   },
//   photoBox: {
//     width: 100,
//     height: 100,
//     borderWidth: 2,
//     borderColor: '#8B7355',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   boxImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 8,
//   },
//   boxNumber: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#8B7355',
//   },
//   continueButton: {
//     backgroundColor: '#8B7355',
//     paddingHorizontal: 30,
//     paddingVertical: 15,
//     borderRadius: 25,
//     minWidth: 250,
//     alignItems: 'center',
//   },
//   continueButtonDisabled: {
//     backgroundColor: '#ccc',
//   },
//   continueButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   continueButtonTextDisabled: {
//     color: '#999',
//   },
// });





// import * as ImagePicker from 'expo-image-picker';
// import { useState, useEffect } from 'react';
// import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { router, useLocalSearchParams } from 'expo-router';

// export default function UploadScreen() {
//   const { capturedImages: capturedImagesParam } = useLocalSearchParams();
//   const [capturedImages, setCapturedImages] = useState<string[]>([]);
  
//   const MAX_IMAGES = 3;

//   // Initialize state from params
//   useEffect(() => {
//     if (capturedImagesParam && typeof capturedImagesParam === 'string') {
//       try {
//         const parsedImages = JSON.parse(capturedImagesParam);
//         setCapturedImages(parsedImages || []);
//       } catch (error) {
//         console.error('Error parsing capturedImages:', error);
//         setCapturedImages([]);
//       }
//     }
//   }, [capturedImagesParam]);

//   const selectPhotoForBox = async (boxIndex: number) => {
//     // Check if we can add more photos
//     if (capturedImages.length >= MAX_IMAGES) {
//       Alert.alert(
//         'Maximum Photos Reached',
//         `You can only have ${MAX_IMAGES} photos total. Please remove some photos first.`
//       );
//       return;
//     }

//     try {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ['images'],
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         const newImage = result.assets[0].uri;
        
//         // If the selected box index is beyond current array length, just add to the end
//         const newImages = [...capturedImages];
//         if (boxIndex < newImages.length) {
//           // Replace existing image at this index
//           newImages[boxIndex] = newImage;
//         } else {
//           // Add to the end of array
//           newImages.push(newImage);
//         }
        
//         setCapturedImages(newImages);
//       }
//     } catch (error) {
//       console.error('Error picking image:', error);
//       Alert.alert('Error', 'Failed to pick image. Please try again.');
//     }
//   };

//   const removePhoto = (index: number) => {
//     Alert.alert(
//       'Remove Photo',
//       'Are you sure you want to remove this photo?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { 
//           text: 'Remove', 
//           style: 'destructive',
//           onPress: () => {
//             const newImages = capturedImages.filter((_, i) => i !== index);
//             setCapturedImages(newImages);
//           }
//         }
//       ]
//     );
//   };

//   const navigateToPreview = () => {
//     // Pass the updated images back to preview
//     router.push({
//       pathname: '/preview',
//       params: { 
//         photos: JSON.stringify(capturedImages)
//       }
//     });
//   };

//   const goBackToHome = () => {
//     // Pass the updated images back to home
//     router.push({
//       pathname: '/',
//       params: {
//         updatedImages: JSON.stringify(capturedImages)
//       }
//     });
//   };

//   const getUploadedPhotoCount = () => {
//     return capturedImages.length;
//   };

//   const canUploadMore = () => {
//     return capturedImages.length < MAX_IMAGES;
//   };

//   const remainingSlots = MAX_IMAGES - capturedImages.length;

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity 
//         style={styles.backButton}
//         onPress={goBackToHome}
//       >
//         <Text style={styles.backButtonText}>← Back</Text>
//       </TouchableOpacity>

//       <Text style={styles.uploadTitle}>Upload Your Photos</Text>
      
//       {/* Status indicator */}
//       <View style={styles.statusContainer}>
//         <Text style={styles.statusText}>
//           {capturedImages.length} of {MAX_IMAGES} photos
//         </Text>
//         {remainingSlots > 0 && (
//           <Text style={styles.remainingText}>
//             ({remainingSlots} slot{remainingSlots > 1 ? 's' : ''} remaining)
//           </Text>
//         )}
//         {!canUploadMore() && (
//           <Text style={styles.fullText}>Album Full!</Text>
//         )}
//       </View>
      
//       <View style={styles.uploadContainer}>
//         <View style={styles.photoBoxesContainer}>
//           {[0, 1, 2].map((index) => {
//             const hasImage = capturedImages[index];
//             const canAddHere = canUploadMore() || hasImage; // Can always replace existing
            
//             return (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.photoBox,
//                   !canAddHere && !hasImage ? styles.photoBoxDisabled : null
//                 ]}
//                 onPress={() => hasImage ? removePhoto(index) : selectPhotoForBox(index)}
//                 disabled={!canAddHere && !hasImage}
//               >
//                 {hasImage ? (
//                   <>
//                     <Image source={{ uri: hasImage }} style={styles.boxImage} />
//                     <View style={styles.removeOverlay}>
//                       <Text style={styles.removeText}>Tap to Remove</Text>
//                     </View>
//                   </>
//                 ) : (
//                   <Text style={[
//                     styles.boxNumber,
//                     !canAddHere ? styles.boxNumberDisabled : null
//                   ]}>
//                     {canAddHere ? `${index + 1}` : '✕'}
//                   </Text>
//                 )}
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         <View style={styles.instructionContainer}>
//           {canUploadMore() ? (
//             <Text style={styles.instructionText}>
//               Tap empty boxes to upload photos{'\n'}
//               Tap filled boxes to remove photos
//             </Text>
//           ) : (
//             <Text style={styles.instructionText}>
//               Album is full! Tap any photo to remove it{'\n'}
//               and make space for new uploads
//             </Text>
//           )}
//         </View>

//         <TouchableOpacity
//           style={[
//             styles.continueButton,
//             getUploadedPhotoCount() === 0 ? styles.continueButtonDisabled : null
//           ]}
//           onPress={navigateToPreview}
//           disabled={getUploadedPhotoCount() === 0}
//         >
//           <Text style={[
//             styles.continueButtonText,
//             getUploadedPhotoCount() === 0 ? styles.continueButtonTextDisabled : null
//           ]}>
//             Continue with {getUploadedPhotoCount()} photo{getUploadedPhotoCount() !== 1 ? 's' : ''}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#f0ebe4',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 60,
//     left: 20,
//     backgroundColor: '#333',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     zIndex: 1,
//   },
//   backButtonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   uploadTitle: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#8B7355',
//     marginBottom: 30,
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   statusContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//     padding: 12,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#8B7355',
//   },
//   statusText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   remainingText: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 2,
//   },
//   fullText: {
//     fontSize: 14,
//     color: '#ff6b35',
//     fontWeight: 'bold',
//     marginTop: 4,
//   },
//   uploadContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//   },
//   photoBoxesContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '90%',
//     maxWidth: 350,
//     marginBottom: 30,
//   },
//   photoBox: {
//     width: 100,
//     height: 100,
//     borderWidth: 2,
//     borderColor: '#8B7355',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     position: 'relative',
//   },
//   photoBoxDisabled: {
//     borderColor: '#ccc',
//     backgroundColor: '#f5f5f5',
//   },
//   boxImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 8,
//   },
//   boxNumber: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#8B7355',
//   },
//   boxNumberDisabled: {
//     color: '#ccc',
//     fontSize: 20,
//   },
//   removeOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(255, 0, 0, 0.8)',
//     padding: 4,
//     borderBottomLeftRadius: 8,
//     borderBottomRightRadius: 8,
//   },
//   removeText: {
//     color: 'white',
//     fontSize: 10,
//     textAlign: 'center',
//     fontWeight: '600',
//   },
//   instructionContainer: {
//     marginBottom: 30,
//     paddingHorizontal: 20,
//   },
//   instructionText: {
//     fontSize: 14,
//     textAlign: 'center',
//     color: '#666',
//     lineHeight: 20,
//   },
//   continueButton: {
//     backgroundColor: '#8B7355',
//     paddingHorizontal: 30,
//     paddingVertical: 15,
//     borderRadius: 25,
//     minWidth: 250,
//     alignItems: 'center',
//   },
//   continueButtonDisabled: {
//     backgroundColor: '#ccc',
//   },
//   continueButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   continueButtonTextDisabled: {
//     color: '#999',
//   },
// });







import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { usePhotos } from '../contexts/PhotoContext'; // Adjust this path to where you put the context file

export default function UploadScreen() {
  // Use global state - no more local state or params!
  const { 
    capturedImages, 
    replaceImage, 
    removeImage, 
    canAddMore, 
    remainingSlots, 
    MAX_IMAGES 
  } = usePhotos();

  const selectPhotoForBox = async (boxIndex: number) => {
    // Check if we can add more photos
    if (!canAddMore()) {
      Alert.alert(
        'Maximum Photos Reached',
        `You can only have ${MAX_IMAGES} photos total. Please remove some photos first.`
      );
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImage = result.assets[0].uri;
        replaceImage(boxIndex, newImage); // Use global state method
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const removePhoto = (index: number) => {
    Alert.alert(
      'Remove Photo',
      'Are you sure you want to remove this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => removeImage(index) // Use global state method
        }
      ]
    );
  };

  const navigateToCustomize = () => {
    // Go to customize screen first
    router.push('/customize');
  };

  const goBackToHome = () => {
    // No need to pass params anymore
    router.push('/');
  };

  const remainingSlotsCount = remainingSlots();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={goBackToHome}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.uploadTitle}>Upload Your Photos</Text>
      
      {/* Status indicator */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {capturedImages.length} of {MAX_IMAGES} photos
        </Text>
        {remainingSlotsCount > 0 && (
          <Text style={styles.remainingText}>
            ({remainingSlotsCount} slot{remainingSlotsCount > 1 ? 's' : ''} remaining)
          </Text>
        )}
        {!canAddMore() && (
          <Text style={styles.fullText}>Album Full!</Text>
        )}
      </View>
      
      <View style={styles.uploadContainer}>
        <View style={styles.photoBoxesContainer}>
          {[0, 1, 2].map((index) => {
            const hasImage = capturedImages[index];
            const canAddHere = canAddMore() || hasImage; // Can always replace existing
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.photoBox,
                  !canAddHere && !hasImage ? styles.photoBoxDisabled : null
                ]}
                onPress={() => hasImage ? removePhoto(index) : selectPhotoForBox(index)}
                disabled={!canAddHere && !hasImage}
              >
                {hasImage ? (
                  <>
                    <Image source={{ uri: hasImage }} style={styles.boxImage} />
                    <View style={styles.removeOverlay}>
                      <Text style={styles.removeText}>Tap to Remove</Text>
                    </View>
                  </>
                ) : (
                  <Text style={[
                    styles.boxNumber,
                    !canAddHere ? styles.boxNumberDisabled : null
                  ]}>
                    {canAddHere ? `${index + 1}` : '✕'}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.instructionContainer}>
          {canAddMore() ? (
            <Text style={styles.instructionText}>
              Tap empty boxes to upload photos{'\n'}
              Tap filled boxes to remove photos
            </Text>
          ) : (
            <Text style={styles.instructionText}>
              Album is full! Tap any photo to remove it{'\n'}
              and make space for new uploads
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            capturedImages.length === 0 ? styles.continueButtonDisabled : null
          ]}
          onPress={navigateToCustomize}
          disabled={capturedImages.length === 0}
        >
          <Text style={[
            styles.continueButtonText,
            capturedImages.length === 0 ? styles.continueButtonTextDisabled : null
          ]}>
            Customize with {capturedImages.length} photo{capturedImages.length !== 1 ? 's' : ''}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Keep the same styles as before
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0ebe4',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B7355',
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8B7355',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  remainingText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  fullText: {
    fontSize: 14,
    color: '#ff6b35',
    fontWeight: 'bold',
    marginTop: 4,
  },
  uploadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  photoBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    maxWidth: 350,
    marginBottom: 30,
  },
  photoBox: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#8B7355',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'relative',
  },
  photoBoxDisabled: {
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  boxImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  boxNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B7355',
  },
  boxNumberDisabled: {
    color: '#ccc',
    fontSize: 20,
  },
  removeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    padding: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  removeText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  instructionContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  instructionText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: '#8B7355',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 250,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    color: '#999',
  },
});