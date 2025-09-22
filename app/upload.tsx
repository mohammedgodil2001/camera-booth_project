// import * as ImagePicker from 'expo-image-picker';
// import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { router } from 'expo-router';
// import { usePhotos } from '../contexts/PhotoContext'; 

// export default function UploadScreen() {
  
//   const { 
//     capturedImages, 
//     replaceImage, 
//     removeImage, 
//     canAddMore, 
//     remainingSlots, 
//     MAX_IMAGES 
//   } = usePhotos();

//   const selectPhotoForBox = async (boxIndex: number) => {
    
//     if (!canAddMore()) {
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
//         replaceImage(boxIndex, newImage); 
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
//           onPress: () => removeImage(index) 
//         }
//       ]
//     );
//   };

//   const navigateToCustomize = () => {
    
//     router.push('/customize');
//   };

//   const goBackToHome = () => {
    
//     router.push('/');
//   };

//   const remainingSlotsCount = remainingSlots();

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
//         {remainingSlotsCount > 0 && (
//           <Text style={styles.remainingText}>
//             ({remainingSlotsCount} slot{remainingSlotsCount > 1 ? 's' : ''} remaining)
//           </Text>
//         )}
//         {!canAddMore() && (
//           <Text style={styles.fullText}>Album Full!</Text>
//         )}
//       </View>
      
//       <View style={styles.uploadContainer}>
//         <View style={styles.photoBoxesContainer}>
//           {[0, 1, 2].map((index) => {
//             const hasImage = capturedImages[index];
//             const canAddHere = canAddMore() || hasImage; // Can always replace existing
            
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
//           {canAddMore() ? (
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
//             capturedImages.length === 0 ? styles.continueButtonDisabled : null
//           ]}
//           onPress={navigateToCustomize}
//           disabled={capturedImages.length === 0}
//         >
//           <Text style={[
//             styles.continueButtonText,
//             capturedImages.length === 0 ? styles.continueButtonTextDisabled : null
//           ]}>
//             Customize with {capturedImages.length} photo{capturedImages.length !== 1 ? 's' : ''}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// // Keep the same styles as before
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
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { usePhotos } from '../contexts/PhotoContext';
import Svg, { Line, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function UploadScreen() {
  const { 
    capturedImages, 
    replaceImage, 
    removeImage, 
    canAddMore, 
    remainingSlots, 
    MAX_IMAGES 
  } = usePhotos();

  const selectPhotoForBox = async (boxIndex: number) => {
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
        replaceImage(boxIndex, newImage); 
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
          onPress: () => removeImage(index) 
        }
      ]
    );
  };

  const navigateToCustomize = () => {
    router.push('/customize');
  };

  const goBackToHome = () => {
    router.push('/');
  };

  const remainingSlotsCount = remainingSlots();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBackToHome}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.photoCounter}>{capturedImages.length}/{MAX_IMAGES}</Text>
          <Text style={styles.photosLabel}>PHOTOS</Text>
        </View>
      </View>

      {/* Divider Line */}
      <View style={styles.dividerLine} />

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.uploadTitle}>UPLOAD YOUR PHOTOS</Text>
        
        {/* Another Divider */}
        <View style={styles.dividerLine} />

        {/* Photo Boxes Container */}
        <View style={styles.photoBoxesWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photoBoxesContainer}
          >
            {[0, 1, 2, 3, 4].map((index) => {
              const hasImage = capturedImages[index];
              const canAddHere = canAddMore() || hasImage;
              
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
                    <Image source={{ uri: hasImage }} style={styles.boxImage} />
                  ) : (
                    <View style={styles.emptyBox} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionText}>
            Tap the empty boxes to upload the photos{'\n'}
            and tap the filled boxes to remove them
          </Text>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              capturedImages.length === 0 && styles.continueButtonDisabled
            ]}
            onPress={navigateToCustomize}
            disabled={capturedImages.length === 0}
          >
            <Text style={[
              styles.continueButtonText,
              capturedImages.length === 0 && styles.continueButtonTextDisabled
            ]}>
              CUSTOMISE PHOTOS
            </Text>
            <Svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <Path d="M12.353 9.84902L12.0196 0.642482L2.81147 0.928064C2.71511 0.918301 2.61777 0.929355 2.52605 0.96048C2.43433 0.991604 2.35037 1.04207 2.27985 1.10847C2.20933 1.17486 2.1539 1.25563 2.11731 1.34531C2.08072 1.43499 2.06383 1.53149 2.06777 1.62826C2.07172 1.72504 2.09641 1.81984 2.14018 1.90624C2.18394 1.99264 2.24576 2.06864 2.32145 2.12907C2.39714 2.1895 2.48493 2.23297 2.57888 2.25653C2.67283 2.28008 2.77074 2.28318 2.86599 2.2656L9.76649 2.06237L0.933264 11.51C0.810801 11.641 0.745386 11.8153 0.75141 11.9945C0.757433 12.1737 0.834402 12.3432 0.965384 12.4657C1.09637 12.5881 1.27063 12.6535 1.44984 12.6475C1.62906 12.6415 1.79853 12.5645 1.921 12.4335L10.7542 2.98586L11.0148 9.88444C11.0215 10.0637 11.0991 10.233 11.2306 10.3551C11.362 10.4772 11.5366 10.542 11.7159 10.5353C11.8952 10.5287 12.0645 10.4511 12.1866 10.3196C12.3087 10.1881 12.3735 10.0135 12.3668 9.83421L12.353 9.84902Z" fill="black"/>
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Bottom SVG Lines - Empty space for image */}
        <View style={styles.bottomSection}>
          <Svg width="100%" height="108" viewBox="0 0 400 108" fill="none">
            {Array.from({ length: 67 }).map((_, i) => (
              <Line 
                key={i}
                x1={i * 6 + 0.5} 
                y1="0" 
                x2={i * 6 + 0.5} 
                y2="108" 
                stroke="#B8B8B8" 
                strokeWidth="1"
              />
            ))}
          </Svg>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  photoCounter: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000',
  },
  photosLabel: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 4,
  },
  dividerLine: {
    height: 2,
    backgroundColor: '#B8B8B8',
    marginHorizontal: 0,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  uploadTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    marginBottom: 40,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  photoBoxesWrapper: {
    marginVertical: 40,
  },
  photoBoxesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  photoBox: {
    width: 200,
    height: 250,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  photoBoxDisabled: {
    backgroundColor: '#F5F5F5',
    opacity: 0.5,
  },
  boxImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  emptyBox: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E5E5',
  },
  instructionsContainer: {
    marginVertical: 40,
  },
  instructionText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
    lineHeight: 22,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  continueButtonDisabled: {
    borderColor: '#ccc',
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginRight: 10,
  },
  continueButtonTextDisabled: {
    color: '#ccc',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
});