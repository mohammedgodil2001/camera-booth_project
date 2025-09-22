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
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { usePhotos } from '../contexts/PhotoContext';
import Svg, { Line, Path } from 'react-native-svg';



export default function UploadScreen() {
  const { 
    capturedImages, 
    replaceImage, 
    removeImage, 
    canAddMore, 
    // remainingSlots, 
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

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={goBackToHome}
        >
          <Svg style={styles.backArrow} width="28" height="24" viewBox="0 0 28 24" fill="none">
            <Path d="M11.2398 0.345584L0 11.6438L11.2398 22.9421C11.3413 23.0754 11.4702 23.1853 11.6179 23.2644C11.7656 23.3436 11.9286 23.39 12.0958 23.4007C12.263 23.4114 12.4306 23.386 12.5871 23.3263C12.7437 23.2666 12.8856 23.1739 13.0032 23.0546C13.1208 22.9353 13.2114 22.7921 13.2689 22.6347C13.3264 22.4773 13.3494 22.3094 13.3363 22.1423C13.3233 21.9753 13.2745 21.813 13.1932 21.6665C13.112 21.5199 13.0002 21.3925 12.8655 21.2929L4.45614 12.8134L26.8304 12.8134C27.1406 12.8134 27.4381 12.6902 27.6574 12.4709C27.8768 12.2515 28 11.954 28 11.6438C28 11.3336 27.8768 11.0361 27.6574 10.8168C27.4381 10.5975 27.1406 10.4742 26.8304 10.4742L4.45614 10.4742L12.8655 1.99471C13.0842 1.77447 13.2064 1.47638 13.2053 1.16601C13.2042 0.855642 13.0799 0.558422 12.8596 0.339734C12.6394 0.121047 12.3413 -0.00119377 12.031 -9.70724e-05C11.7206 0.000999625 11.4234 0.125345 11.2047 0.345584H11.2398Z" fill="black"/>
          </Svg>
        </TouchableOpacity>
        
        <View style={styles.photoCounter}>
          <Text style={styles.counterText}>{capturedImages.length}/{MAX_IMAGES}</Text>
          <Text style={styles.photosLabel}>PHOTOS</Text>
        </View>
      </View>

      
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>upload your photos</Text>
      </View>



      <View style={styles.photoSection}>
        <View style={styles.photoBoxesContainer}>
          {[0, 1, 2].map((index) => {
            const hasImage = capturedImages[index];
            const canAddHere = canAddMore() || hasImage;
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.photoBox,
                  hasImage && styles.photoBoxFilled,
                  !canAddHere && !hasImage && styles.photoBoxDisabled
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
      </View>

      
      <View style={styles.instructionSection}>
        <Text style={styles.instructionText}>
          Tap the empty boxes to upload the photos and tap the filled boxes to remove them
        </Text>
        <Text style={styles.instructionText}>
        </Text>
      </View>

      
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
          customise photos
        </Text>
        
        <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" >
          <Path d="M12.353 9.84902L12.0196 0.642482L2.81147 0.928064C2.71511 0.918301 2.61777 0.929355 2.52605 0.96048C2.43433 0.991604 2.35037 1.04207 2.27985 1.10847C2.20933 1.17486 2.1539 1.25563 2.11731 1.34531C2.08072 1.43499 2.06383 1.53149 2.06777 1.62826C2.07172 1.72504 2.09641 1.81984 2.14018 1.90624C2.18394 1.99264 2.24576 2.06864 2.32145 2.12907C2.39714 2.1895 2.48493 2.23297 2.57888 2.25653C2.67283 2.28008 2.77074 2.28318 2.86599 2.2656L9.76649 2.06237L0.933264 11.51C0.810801 11.641 0.745386 11.8153 0.75141 11.9945C0.757433 12.1737 0.834402 12.3432 0.965384 12.4657C1.09637 12.5881 1.27063 12.6535 1.44984 12.6475C1.62906 12.6415 1.79853 12.5645 1.921 12.4335L10.7542 2.98586L11.0148 9.88444C11.0215 10.0637 11.0991 10.233 11.2306 10.3551C11.362 10.4772 11.5366 10.542 11.7159 10.5353C11.8952 10.5287 12.0645 10.4511 12.1866 10.3196C12.3087 10.1881 12.3735 10.0135 12.3668 9.83421L12.353 9.84902Z" fill={capturedImages.length === 0 ? "#ccc" : "#000"}/>
        </Svg>
      </TouchableOpacity>

      
      <View style={styles.bottomSvgContainer}>
        <Svg width="349" height="100" viewBox="0 0 349 100" fill="none" >
        <Line x1="144.5" y1="-2.18557e-08" x2="144.5" y2="100" stroke="black"/>
        <Line x1="102.5" y1="-2.18557e-08" x2="102.5" y2="100" stroke="black"/>
        <Line x1="60.5" y1="-2.18557e-08" x2="60.5" y2="100" stroke="black"/>
        <Line x1="18.5" y1="-2.18557e-08" x2="18.5" y2="100" stroke="black"/>
        <Line x1="138.5" y1="-2.18557e-08" x2="138.5" y2="100" stroke="black"/>
        <Line x1="96.5" y1="-2.18557e-08" x2="96.5" y2="100" stroke="black"/>
        <Line x1="54.5" y1="-2.18557e-08" x2="54.5" y2="100" stroke="black"/>
        <Line x1="12.5" y1="-2.18557e-08" x2="12.5" y2="100" stroke="black"/>
        <Line x1="138.5" y1="-2.18557e-08" x2="138.5" y2="100" stroke="black"/>
        <Line x1="96.5" y1="-2.18557e-08" x2="96.5" y2="100" stroke="black"/>
        <Line x1="54.5" y1="-2.18557e-08" x2="54.5" y2="100" stroke="black"/>
        <Line x1="12.5" y1="-2.18557e-08" x2="12.5" y2="100" stroke="black"/>
        <Line x1="6.5" y1="-2.18557e-08" x2="6.5" y2="100" stroke="black"/>
        <Line x1="0.5" y1="-2.18557e-08" x2="0.500004" y2="100" stroke="black"/>
        <Line x1="150.5" y1="-2.18557e-08" x2="150.5" y2="100" stroke="black"/>
        <Line x1="108.5" y1="-2.18557e-08" x2="108.5" y2="100" stroke="black"/>
        <Line x1="66.5" y1="-2.18557e-08" x2="66.5" y2="100" stroke="black"/>
        <Line x1="24.5" y1="-2.18557e-08" x2="24.5" y2="100" stroke="black"/>
        <Line x1="156.5" y1="-2.18557e-08" x2="156.5" y2="100" stroke="black"/>
        <Line x1="114.5" y1="-2.18557e-08" x2="114.5" y2="100" stroke="black"/>
        <Line x1="72.5" y1="-2.18557e-08" x2="72.5" y2="100" stroke="black"/>
        <Line x1="30.5" y1="-2.18557e-08" x2="30.5" y2="100" stroke="black"/>
        <Line x1="162.5" y1="-2.18557e-08" x2="162.5" y2="100" stroke="black"/>
        <Line x1="120.5" y1="-2.18557e-08" x2="120.5" y2="100" stroke="black"/>
        <Line x1="78.5" y1="-2.18557e-08" x2="78.5" y2="100" stroke="black"/>
        <Line x1="36.5" y1="-2.18557e-08" x2="36.5" y2="100" stroke="black"/>
        <Line x1="168.5" y1="-2.18557e-08" x2="168.5" y2="100" stroke="black"/>
        <Line x1="126.5" y1="-2.18557e-08" x2="126.5" y2="100" stroke="black"/>
        <Line x1="84.5" y1="-2.18557e-08" x2="84.5" y2="100" stroke="black"/>
        <Line x1="42.5" y1="-2.18557e-08" x2="42.5" y2="100" stroke="black"/>
        <Line x1="174.5" y1="-2.18557e-08" x2="174.5" y2="100" stroke="black"/>
        <Line x1="132.5" y1="-2.18557e-08" x2="132.5" y2="100" stroke="black"/>
        <Line x1="90.5" y1="-2.18557e-08" x2="90.5" y2="100" stroke="black"/>
        <Line x1="48.5" y1="-2.18557e-08" x2="48.5" y2="100" stroke="black"/>
        <Line x1="180.5" y1="-2.18557e-08" x2="180.5" y2="100" stroke="black"/>
        <Line x1="186.5" y1="-2.18557e-08" x2="186.5" y2="100" stroke="black"/>
        <Line x1="192.5" y1="-2.18557e-08" x2="192.5" y2="100" stroke="black"/>
        <Line x1="198.5" y1="-2.18557e-08" x2="198.5" y2="100" stroke="black"/>
        <Line x1="204.5" y1="-2.18557e-08" x2="204.5" y2="100" stroke="black"/>
        <Line x1="210.5" y1="-2.18557e-08" x2="210.5" y2="100" stroke="black"/>
        <Line x1="216.5" y1="-2.18557e-08" x2="216.5" y2="100" stroke="black"/>
        <Line x1="222.5" y1="-2.18557e-08" x2="222.5" y2="100" stroke="black"/>
        <Line x1="228.5" y1="-2.18557e-08" x2="228.5" y2="100" stroke="black"/>
        <Line x1="234.5" y1="-2.18557e-08" x2="234.5" y2="100" stroke="black"/>
        <Line x1="240.5" y1="-2.18557e-08" x2="240.5" y2="100" stroke="black"/>
        <Line x1="246.5" y1="-2.18557e-08" x2="246.5" y2="100" stroke="black"/>
        <Line x1="252.5" y1="-2.18557e-08" x2="252.5" y2="100" stroke="black"/>
        <Line x1="258.5" y1="-2.18557e-08" x2="258.5" y2="100" stroke="black"/>
        <Line x1="264.5" y1="-2.18557e-08" x2="264.5" y2="100" stroke="black"/>
        <Line x1="270.5" y1="-2.18557e-08" x2="270.5" y2="100" stroke="black"/>
        <Line x1="276.5" y1="-2.18557e-08" x2="276.5" y2="100" stroke="black"/>
        <Line x1="282.5" y1="-2.18557e-08" x2="282.5" y2="100" stroke="black"/>
        <Line x1="288.5" y1="-2.18557e-08" x2="288.5" y2="100" stroke="black"/>
        <Line x1="294.5" y1="-2.18557e-08" x2="294.5" y2="100" stroke="black"/>
        <Line x1="300.5" y1="-2.18557e-08" x2="300.5" y2="100" stroke="black"/>
        <Line x1="306.5" y1="-2.18557e-08" x2="306.5" y2="100" stroke="black"/>
        <Line x1="312.5" y1="-2.18557e-08" x2="312.5" y2="100" stroke="black"/>
        <Line x1="318.5" y1="-2.18557e-08" x2="318.5" y2="100" stroke="black"/>
        <Line x1="324.5" y1="-2.18557e-08" x2="324.5" y2="100" stroke="black"/>
        <Line x1="330.5" y1="-2.18557e-08" x2="330.5" y2="100" stroke="black"/>
        <Line x1="336.5" y1="-2.18557e-08" x2="336.5" y2="100" stroke="black"/>
        <Line x1="342.5" y1="-2.18557e-08" x2="342.5" y2="100" stroke="black"/>
        <Line x1="348.5" y1="-2.18557e-08" x2="348.5" y2="100" stroke="black"/>
        </Svg>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingBottom: 10,
    marginBottom: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#B8B8B8',
  },
  backButton: {
    padding: 10,
  },
  backArrow: {
    marginRight: 0,
  },
  photoCounter: {
    alignItems: 'flex-end',
    paddingBottom: 8,
    minWidth: 80,
  },
  counterText: {
    fontSize: 35,
    fontWeight: 'normal',
    color: '#000',
    fontFamily: 'grotesk',
  },
  photosLabel: {
    fontSize: 20,
    color: '#000',
    marginTop: 2,
  },
  titleSection: {
    marginBottom: 60,
    borderBottomWidth: 2,
    borderBottomColor: '#B8B8B8',
    paddingBottom: 25,
  },
  mainTitle: {
    fontSize: 48,
    color: '#000',
    fontFamily: 'grotesk',
    textTransform: 'uppercase',
  },
  photoSection: {
    marginBottom: 20,
  },
  photoBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoBox: {
    width: 105,
    height: 100,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoBoxFilled: {
    backgroundColor: '#fff',
  },
  photoBoxDisabled: {
    backgroundColor: '#f5f5f5',
    opacity: 0.5,
  },
  boxImage: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
  instructionSection: {
    // marginBottom: 30,
  },
  instructionText: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: 'grotesk',
  },
  continueButton: {
    flexDirection: 'row',
    borderRadius: 25,
    // marginBottom: 60,
    alignSelf: 'flex-end',
    borderColor: '#000',
    borderWidth: 1,
    color: '#000000',
    paddingVertical: 4,
    paddingHorizontal: 10,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'trasparent',
  },
  continueButtonDisabled: {
    color: '#ccc',
    borderColor: '#ccc',
  },
  continueButtonText: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontFamily: 'grotesk',
  },
  continueButtonTextDisabled: {
    color: '#ccc',
  },
  bottomSvgContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
    minHeight: 100,
  },



boxNumber: {
  fontSize: 24,
  color: '#000000',
  fontFamily: 'grotesk',
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
  backgroundColor: 'black',
  // backgroundColor: '#dfdfdfff',
  padding: 5,
  borderBottomLeftRadius: 2,
  borderBottomRightRadius: 2,
},
removeText: {
  color: 'white',
  fontSize: 12,
  textAlign: 'center',
  fontFamily: 'grotesk',
},
});