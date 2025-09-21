// import * as ImagePicker from 'expo-image-picker';
// import { router } from 'expo-router';
// import { useState } from 'react';
// import { Alert, Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
// import { usePhotos } from '../contexts/PhotoContext';
// import { scale } from '@shopify/react-native-skia';
// const { width, height } = Dimensions.get('window');

// export default function HomeScreen() {
  
//   const { 
//     capturedImages, 
//     addImage, 
//     clearAllImages, 
//     MAX_IMAGES, 
//     canAddMore, 
//     remainingSlots 
//   } = usePhotos(); // toh jaise humne pedro ki video mai dekha hai ke woh usko usecontext(loginConetx) karke likh rahe hai and ab login context se hume konse value access karni hai woh yaha par aayegi so the logic is exactly the same

//   const [showCameraModal, setShowCameraModal] = useState(false);
//   const [currentPhotoNumber, setCurrentPhotoNumber] = useState(1);
//   const [showGallery, setShowGallery] = useState(false);

//   const navigateToUploadScreen = () => {
//     router.push('/upload');
//   };

  

//   const requestCameraPermission = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
//     if (status !== 'granted') {
//       Alert.alert(
//         'Permission needed',
//         'Sorry, we need camera permissions to take photos!'
//       );
//       return false;
//     }
//     return true;
//   };

//   const startCameraFlow = async () => {
//     if (!canAddMore()) {
//       Alert.alert(
//         'Maximum Photos Reached',
//         `You can only have ${MAX_IMAGES} photos total. Please remove some photos first.`
//       );
//       return;
//     }

//     const hasPermission = await requestCameraPermission();
//     if (hasPermission) {
//       setShowCameraModal(true);
//       setCurrentPhotoNumber(capturedImages.length + 1);
//     }
//   };

//   const navigateToCustomize = () => {
//     router.push('/customize');
//   };

//   const takePhoto = async () => {
//     if (!canAddMore()) {
//       setShowCameraModal(false);
//       Alert.alert('Maximum Photos Reached', `You can only have ${MAX_IMAGES} photos total.`);
//       return;
//     }

//     console.log(`Taking photo ${currentPhotoNumber}`);
    
//     try {
//       let result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ['images'],
//         allowsEditing: false,
//         quality: 0.8,
//         exif: false,
//       });

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         const newImage = result.assets[0].uri;
//         console.log(`Photo ${currentPhotoNumber} captured successfully`);
        
//         addImage(newImage); 
        
        
//         const newTotal = capturedImages.length + 1;
//         if (newTotal < MAX_IMAGES) {
//           setCurrentPhotoNumber(newTotal + 1);
//         } else {
          
//           setShowCameraModal(false);
//           Alert.alert(
//             'Photos Captured!',
//             `All ${MAX_IMAGES} photos have been taken. View them in the gallery!`,
//             [{ text: 'OK' }]
//           );
//         }
//       } else {
//         console.log('Photo was cancelled');
//       }
//     } catch (error) {
//       console.error('Camera error:', error);
//       Alert.alert('Error', 'Failed to take photo. Please try again.');
//     }
//   };

//   const closeCameraModal = () => {
//     setShowCameraModal(false);
//     setCurrentPhotoNumber(1);
//   };

//   const showImageGallery = () => {
//     if (capturedImages.length > 0) {
//       setShowGallery(true);
//     } else {
//       Alert.alert('No Photos', 'No photos have been captured or uploaded yet.');
//     }
//   };

//   const clearAllPhotos = () => {
//     Alert.alert(
//       'Clear All Photos',
//       'Are you sure you want to remove all photos?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { 
//           text: 'Clear All', 
//           style: 'destructive',
//           onPress: () => clearAllImages() 
//         }
//       ]
//     );
//   };

//   const remainingSlotsCount = remainingSlots();

//   return (
//     <View style={styles.container}>
//       <View style={styles.firstContainer}>
//         {/* <Text style={styles.title}>Photo Booth</Text> */}
//         <Image
//   source={require('../assets/images/Photobooth.png')}
//   // style={{transform: scale(0.25, 0.25)}}
// />


//       </View>
      
//       <View>

//         {/* status bar */}
//         <View style={styles.statusContainer}>
//           <Text style={styles.statusText}>
//             {capturedImages.length} / {MAX_IMAGES} 
//           </Text>
//           <Text >
//             photos
//           </Text>
//         </View>

//         <Button title="Upload Photos" onPress={navigateToUploadScreen} />
//         <View style={styles.buttonSpacing} />
        
//         <Button 
//           title={canAddMore() ? "Use Camera" : "Camera (Full)"}
//           onPress={startCameraFlow}
//           disabled={!canAddMore()}
//         />
//         <View style={styles.buttonSpacing} />

//         <View>
//           <Button 
//             title={`View Gallery (${capturedImages.length})`} 
//             onPress={showImageGallery}
//             disabled={capturedImages.length === 0}
//           />

          // {capturedImages.length > 0 && (
          //   <>
          //     <View style={styles.buttonSpacing} />
          //     <TouchableOpacity style={styles.clearButton} onPress={clearAllPhotos}>
          //       <Text style={styles.clearButtonText}>Clear All Photos</Text>
          //     </TouchableOpacity>
          //   </>
          // )}


//         {/* button for customisation screen */}
//           <TouchableOpacity
//             style={[
//               // styles.continueButton,
//               capturedImages.length === 0 ? styles.continueButtonDisabled : null
//             ]}
//             onPress={navigateToCustomize}
//             disabled={capturedImages.length === 0}
//           >
//             <Text style={[
//               styles.continueButtonText,
//               capturedImages.length === 0 ? styles.continueButtonTextDisabled : null
//             ]}>
//               Customize {capturedImages.length} photo{capturedImages.length !== 1 ? 's' : ''}
//             </Text>
//           </TouchableOpacity>
//         </View>

//       </View>
      
      
      
      




//       {/* camera pop up for taking photos */}
//       <Modal
//         visible={showCameraModal}
//         animationType="slide"
//         transparent={true}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.titleText}>B&W Photo Session</Text>
            
//             <Text style={styles.photoNumberText}>
//               Photo {currentPhotoNumber} of {MAX_IMAGES}
//             </Text>
            
//             <Text style={styles.instructionText}>
//               {capturedImages.length === 0 
//                 ? "Ready to take black & white photos!\nPhotos will be converted automatically."
//                 : `${capturedImages.length} photo${capturedImages.length > 1 ? 's' : ''} captured so far.\n${remainingSlotsCount} slot${remainingSlotsCount > 1 ? 's' : ''} remaining.`
//               }
//             </Text>
            
//             <TouchableOpacity 
//               style={styles.takePhotoButton} 
//               onPress={takePhoto}
//             >
//               <Text style={styles.takePhotoText}>
//                 Take Photo {currentPhotoNumber}
//               </Text>
//             </TouchableOpacity>
            
//             <View style={styles.progressContainer}>
//               {Array.from({length: MAX_IMAGES}, (_, i) => i + 1).map((num) => (
//                 <View 
//                   key={num} 
//                   style={[
//                     styles.progressDot,
//                     capturedImages.length >= num ? styles.progressDotFilled : null
//                   ]}
//                 />
//               ))}
//             </View>
            
//             <View style={styles.buttonRow}>
//               <TouchableOpacity 
//                 style={[styles.actionButton, styles.viewButton]} 
//                 onPress={() => {
//                   setShowCameraModal(false);
//                   if (capturedImages.length > 0) {
//                     setShowGallery(true);
//                   }
//                 }}
//                 disabled={capturedImages.length === 0}
//               >
//                 <Text style={styles.actionButtonText}>
//                   View Photos ({capturedImages.length})
//                 </Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[styles.actionButton, styles.cancelButton]} 
//                 onPress={closeCameraModal}
//               >
//                 <Text style={styles.actionButtonText}>Done</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* gallery pop up */}
//       <Modal
//         visible={showGallery}
//         animationType="slide"
//       >
//         <View style={styles.galleryContainer}>
//           <View style={styles.galleryHeader}>
//             <Text style={styles.galleryTitle}>Your Photos ({capturedImages.length})</Text>
//             <TouchableOpacity 
//               style={styles.closeButton} 
//               onPress={() => setShowGallery(false)}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//           <ScrollView contentContainerStyle={styles.galleryScroll}>
//             {capturedImages.map((imageUri, index) => (
//               <View key={index} style={styles.galleryImageContainer}>
//                 <Text style={styles.imageLabel}>Photo {index + 1}</Text>
//                 <View style={styles.bwImageContainer}>
//                   <Image 
//                     source={{ uri: imageUri }} 
//                     style={styles.galleryImage}
//                   />
//                   <View style={styles.grayscaleOverlay} />
//                 </View>
//               </View>
//             ))}
//             {capturedImages.length === 0 && (
//               <View style={styles.emptyGallery}>
//                 <Text style={styles.emptyText}>No photos yet!</Text>
//                 <Text style={styles.emptySubtext}>Use the camera or upload from gallery.</Text>
//               </View>
//             )}
//           </ScrollView>
//         </View>
//       </Modal>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
  
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//     fontFamily: 'grotesk',
//     flexDirection: 'row',
//     borderColor: "blue",
//   },
//   firstContainer: {
//    width: width * 0.25,
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
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     // marginBottom: 10,
//     color: '#333',
//     // fontFamily: 'grotesk',
//     transform: [{ rotate: '90deg' }],
//     textTransform: 'uppercase',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   statusContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//     padding: 10,
//     backgroundColor: '#e8f4f8',
//     borderRadius: 8,
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
//   buttonSpacing: {
//     height: 15,
//   },
//   clearButton: {
//     backgroundColor: '#ff4444',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   clearButtonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 30,
//     alignItems: 'center',
//     minWidth: 320,
//     maxWidth: '90%',
//   },
//   titleText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   photoNumberText: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 15,
//     color: '#666',
//   },
//   instructionText: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 25,
//     color: '#777',
//     lineHeight: 22,
//   },
//   takePhotoButton: {
//     backgroundColor: '#333333',
//     padding: 20,
//     borderRadius: 15,
//     marginBottom: 20,
//     minWidth: 200,
//     alignItems: 'center',
//   },
//   takePhotoText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   progressContainer: {
//     flexDirection: 'row',
//     marginBottom: 25,
//   },
//   progressDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: '#ddd',
//     marginHorizontal: 5,
//   },
//   progressDotFilled: {
//     backgroundColor: '#333333',
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   actionButton: {
//     flex: 1,
//     padding: 15,
//     borderRadius: 10,
//     marginHorizontal: 5,
//     alignItems: 'center',
//     backgroundColor: '#8B7355',
//   },
//   viewButton: {
//     backgroundColor: '#333333',
//   },
//   cancelButton: {
//     backgroundColor: '#666666',
//   },
//   actionButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   galleryContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   galleryHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     paddingTop: 60,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   galleryTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   closeButton: {
//     backgroundColor: '#333333',
//     padding: 10,
//     borderRadius: 8,
//   },
//   closeButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   galleryScroll: {
//     padding: 20,
//   },
//   galleryImageContainer: {
//     marginBottom: 30,
//     alignItems: 'center',
//   },
//   imageLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#666',
//     marginBottom: 10,
//   },
//   bwImageContainer: {
//     position: 'relative',
//   },
//   galleryImage: {
//     width: 300,
//     height: 300,
//     borderRadius: 10,
//   },
//   grayscaleOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#888888',
//     borderRadius: 10,
//     opacity: 0.4,
//     mixBlendMode: 'saturation',
//   },
//   emptyGallery: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 50,
//   },
//   emptyText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#666',
//     marginBottom: 10,
//   },
//   emptySubtext: {
//     fontSize: 14,
//     color: '#999',
//   },
// });




import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { usePhotos } from '../contexts/PhotoContext';
// import { Svg, Circle, Rect, Path, Text, G } from 'react-native-svg';
import Svg, { Path, Line } from 'react-native-svg';


const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  
  const { 
    capturedImages, 
    addImage, 
    clearAllImages, 
    MAX_IMAGES, 
    canAddMore, 
    remainingSlots 
  } = usePhotos();

  const [showCameraModal, setShowCameraModal] = useState(false);
  const [currentPhotoNumber, setCurrentPhotoNumber] = useState(1);
  const [showGallery, setShowGallery] = useState(false);

  const navigateToUploadScreen = () => {
    router.push('/upload');
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission needed',
        'Sorry, we need camera permissions to take photos!'
      );
      return false;
    }
    return true;
  };

  const startCameraFlow = async () => {
    if (!canAddMore()) {
      Alert.alert(
        'Maximum Photos Reached',
        `You can only have ${MAX_IMAGES} photos total. Please remove some photos first.`
      );
      return;
    }

    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      setShowCameraModal(true);
      setCurrentPhotoNumber(capturedImages.length + 1);
    }
  };

  const navigateToCustomize = () => {
    router.push('/customize');
  };

  const takePhoto = async () => {
    if (!canAddMore()) {
      setShowCameraModal(false);
      Alert.alert('Maximum Photos Reached', `You can only have ${MAX_IMAGES} photos total.`);
      return;
    }

    console.log(`Taking photo ${currentPhotoNumber}`);
    
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImage = result.assets[0].uri;
        console.log(`Photo ${currentPhotoNumber} captured successfully`);
        
        addImage(newImage); 
        
        const newTotal = capturedImages.length + 1;
        if (newTotal < MAX_IMAGES) {
          setCurrentPhotoNumber(newTotal + 1);
        } else {
          setShowCameraModal(false);
          Alert.alert(
            'Photos Captured!',
            `All ${MAX_IMAGES} photos have been taken. View them in the gallery!`,
            [{ text: 'OK' }]
          );
        }
      } else {
        console.log('Photo was cancelled');
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const closeCameraModal = () => {
    setShowCameraModal(false);
    setCurrentPhotoNumber(1);
  };

  const showImageGallery = () => {
    if (capturedImages.length > 0) {
      setShowGallery(true);
    } else {
      Alert.alert('No Photos', 'No photos have been captured or uploaded yet.');
    }
  };

  const clearAllPhotos = () => {
    Alert.alert(
      'Clear All Photos',
      'Are you sure you want to remove all photos?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => clearAllImages() 
        }
      ]
    );
  };

  const remainingSlotsCount = remainingSlots();



  return (
    <View style={styles.container}>
      
      <View style={styles.leftContainer}>
        
        {/* <Image
           source={require('../assets/images/Photobooth.png')}
          style={{transform: [{ scale: 0.94 }]}}
          /> */}
          <Svg width="85" height="799" viewBox="0 0 85 799" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: [{ scale: 0.95 }]}}>
            <Path d="M41.1165 787.522V766.58C41.1916 760.5 39.9531 756.072 37.401 753.295C34.849 750.442 31.1711 749.016 26.3672 749.016C21.5634 749.016 17.923 750.442 15.446 753.295C12.894 756.072 11.6179 760.5 11.6179 766.58V787.522H41.1165ZM2.61074 798.218V762.977C2.61074 754.871 4.71242 748.753 8.91578 744.625C13.0441 740.422 18.8612 738.32 26.3672 738.32C33.8732 738.32 39.7279 740.422 43.9313 744.625C48.1346 748.753 50.1988 754.871 50.1237 762.977V787.522H83V798.218H2.61074ZM2.61074 725.21V714.514H37.1759L37.1759 672.181H2.61074V661.484H83V672.181H46.1831L46.1831 714.514H83V725.21H2.61074ZM42.8054 637.764C46.8586 637.764 50.8743 637.239 54.8525 636.188C58.7556 635.137 62.2834 633.486 65.436 631.234C68.5885 628.982 71.1405 626.092 73.0921 622.564C74.9686 619.037 75.9068 614.833 75.9068 609.954C75.9068 605.075 74.9686 600.872 73.0921 597.344C71.1405 593.816 68.5885 590.927 65.436 588.675C62.2834 586.423 58.7556 584.772 54.8525 583.721C50.8743 582.67 46.8586 582.145 42.8054 582.145C38.7521 582.145 34.7739 582.67 30.8708 583.721C26.8926 584.772 23.3273 586.423 20.1748 588.675C17.0223 590.927 14.5078 593.816 12.6313 597.344C10.6797 600.872 9.70391 605.075 9.70391 609.954C9.70391 614.833 10.6797 619.037 12.6313 622.564C14.5078 626.092 17.0223 628.982 20.1748 631.234C23.3273 633.486 26.8926 635.137 30.8708 636.188C34.7739 637.239 38.7521 637.764 42.8054 637.764ZM42.8054 648.46C37.326 648.46 32.0718 647.672 27.0428 646.096C21.9387 644.444 17.4351 642.005 13.532 638.777C9.62885 635.55 6.51386 631.534 4.187 626.73C1.86014 621.926 0.696712 616.334 0.696712 609.954C0.696712 603.574 1.86014 597.982 4.187 593.178C6.51386 588.375 9.62885 584.359 13.532 581.131C17.4351 577.904 21.9387 575.502 27.0428 573.926C32.0718 572.274 37.326 571.449 42.8054 571.449C48.2847 571.449 53.5765 572.274 58.6806 573.926C63.7096 575.502 68.1757 577.904 72.0788 581.131C75.9819 584.359 79.0969 588.375 81.4237 593.178C83.6755 597.982 84.8014 603.574 84.8014 609.954C84.8014 616.334 83.6755 621.926 81.4237 626.73C79.0969 631.534 75.9819 635.55 72.0788 638.777C68.1757 642.005 63.7096 644.444 58.6806 646.096C53.5765 647.672 48.2847 648.46 42.8054 648.46ZM11.6179 540.175V566.971H2.61074L2.61074 502.682H11.6179L11.6179 529.479H83V540.175H11.6179ZM42.8054 487.571C46.8586 487.571 50.8743 487.045 54.8525 485.994C58.7556 484.944 62.2834 483.292 65.436 481.041C68.5885 478.789 71.1405 475.899 73.0921 472.371C74.9686 468.843 75.9068 464.64 75.9068 459.761C75.9068 454.882 74.9686 450.679 73.0921 447.151C71.1405 443.623 68.5885 440.733 65.436 438.482C62.2834 436.23 58.7556 434.578 54.8525 433.528C50.8743 432.477 46.8586 431.951 42.8054 431.951C38.7521 431.951 34.7739 432.477 30.8708 433.528C26.8926 434.578 23.3273 436.23 20.1748 438.482C17.0223 440.733 14.5078 443.623 12.6313 447.151C10.6797 450.679 9.70391 454.882 9.70391 459.761C9.70391 464.64 10.6797 468.843 12.6313 472.371C14.5078 475.899 17.0223 478.789 20.1748 481.041C23.3273 483.292 26.8926 484.944 30.8708 485.994C34.7739 487.045 38.7521 487.571 42.8054 487.571ZM42.8054 498.267C37.326 498.267 32.0718 497.479 27.0428 495.902C21.9387 494.251 17.4351 491.812 13.532 488.584C9.62885 485.356 6.51386 481.341 4.187 476.537C1.86014 471.733 0.696712 466.141 0.696712 459.761C0.696712 453.381 1.86014 447.789 4.187 442.985C6.51386 438.181 9.62885 434.166 13.532 430.938C17.4351 427.71 21.9387 425.308 27.0428 423.732C32.0718 422.081 37.326 421.255 42.8054 421.255C48.2847 421.255 53.5765 422.081 58.6806 423.732C63.7096 425.308 68.1757 427.71 72.0788 430.938C75.9819 434.166 79.0969 438.181 81.4237 442.985C83.6755 447.789 84.8014 453.381 84.8014 459.761C84.8014 466.141 83.6755 471.733 81.4237 476.537C79.0969 481.341 75.9819 485.356 72.0788 488.584C68.1757 491.812 63.7096 494.251 58.6806 495.902C53.5765 497.479 48.2847 498.267 42.8054 498.267ZM37.1759 366.189V344.797C37.1759 338.717 36.125 334.364 34.0233 331.737C31.8466 329.034 28.619 327.683 24.3406 327.683C21.4883 327.683 19.2365 328.134 17.5852 329.034C15.9339 329.935 14.6579 331.174 13.7572 332.75C12.8564 334.326 12.2935 336.165 12.0683 338.267C11.7681 340.293 11.6179 342.47 11.6179 344.797V366.189H37.1759ZM2.61074 376.885V347.724C2.61074 345.998 2.64827 344.159 2.72333 342.207C2.72333 340.181 2.83592 338.192 3.0611 336.24C3.21122 334.289 3.47393 332.487 3.84923 330.836C4.22453 329.109 4.78748 327.646 5.53808 326.445C7.11434 323.818 9.29108 321.603 12.0683 319.802C14.8455 317.925 18.2607 316.987 22.314 316.987C26.5924 316.987 30.3079 318.038 33.4604 320.14C36.5379 322.166 38.8272 325.094 40.3284 328.922H40.5536C41.6044 323.968 43.8562 320.177 47.309 317.55C50.7617 314.923 54.9651 313.61 59.919 313.61C62.8464 313.61 65.6987 314.135 68.4759 315.186C71.2531 316.237 73.7301 317.813 75.9068 319.915C78.0085 321.941 79.7349 324.493 81.086 327.571C82.362 330.573 83 334.063 83 338.042V376.885H2.61074ZM73.9928 366.189V339.393C73.9928 334.664 72.7168 330.986 70.1647 328.359C67.6127 325.657 64.0849 324.306 59.5813 324.306C56.9542 324.306 54.7774 324.793 53.0511 325.769C51.3247 326.745 49.9736 328.059 48.9978 329.71C47.947 331.286 47.2339 333.125 46.8586 335.227C46.4082 337.328 46.1831 339.505 46.1831 341.757V366.189H73.9928ZM42.8054 293.617C46.8586 293.617 50.8743 293.091 54.8525 292.041C58.7556 290.99 62.2834 289.338 65.436 287.087C68.5885 284.835 71.1405 281.945 73.0921 278.417C74.9686 274.889 75.9068 270.686 75.9068 265.807C75.9068 260.928 74.9686 256.725 73.0921 253.197C71.1405 249.669 68.5885 246.779 65.436 244.528C62.2834 242.276 58.7556 240.625 54.8525 239.574C50.8743 238.523 46.8586 237.997 42.8054 237.997C38.7521 237.997 34.7739 238.523 30.8708 239.574C26.8926 240.625 23.3273 242.276 20.1748 244.528C17.0223 246.779 14.5078 249.669 12.6313 253.197C10.6797 256.725 9.70391 260.928 9.70391 265.807C9.70391 270.686 10.6797 274.889 12.6313 278.417C14.5078 281.945 17.0223 284.835 20.1748 287.087C23.3273 289.338 26.8926 290.99 30.8708 292.041C34.7739 293.091 38.7521 293.617 42.8054 293.617ZM42.8054 304.313C37.326 304.313 32.0718 303.525 27.0428 301.949C21.9387 300.297 17.4351 297.858 13.532 294.63C9.62885 291.403 6.51386 287.387 4.187 282.583C1.86014 277.779 0.696712 272.187 0.696712 265.807C0.696712 259.427 1.86014 253.835 4.187 249.031C6.51386 244.227 9.62885 240.212 13.532 236.984C17.4351 233.757 21.9387 231.355 27.0428 229.778C32.0718 228.127 37.326 227.301 42.8054 227.301C48.2847 227.301 53.5765 228.127 58.6806 229.778C63.7096 231.355 68.1757 233.757 72.0788 236.984C75.9819 240.212 79.0969 244.227 81.4237 249.031C83.6755 253.835 84.8014 259.427 84.8014 265.807C84.8014 272.187 83.6755 277.779 81.4237 282.583C79.0969 287.387 75.9819 291.403 72.0788 294.63C68.1757 297.858 63.7096 300.297 58.6806 301.949C53.5765 303.525 48.2847 304.313 42.8054 304.313ZM42.8054 208.075C46.8586 208.075 50.8743 207.549 54.8525 206.499C58.7556 205.448 62.2834 203.796 65.436 201.545C68.5885 199.293 71.1405 196.403 73.0921 192.875C74.9686 189.347 75.9068 185.144 75.9068 180.265C75.9068 175.386 74.9686 171.183 73.0921 167.655C71.1405 164.127 68.5885 161.237 65.436 158.986C62.2834 156.734 58.7556 155.083 54.8525 154.032C50.8743 152.981 46.8586 152.455 42.8054 152.455C38.7521 152.455 34.7739 152.981 30.8708 154.032C26.8926 155.083 23.3273 156.734 20.1748 158.986C17.0223 161.237 14.5078 164.127 12.6313 167.655C10.6797 171.183 9.70391 175.386 9.70391 180.265C9.70391 185.144 10.6797 189.347 12.6313 192.875C14.5078 196.403 17.0223 199.293 20.1748 201.545C23.3273 203.796 26.8926 205.448 30.8708 206.499C34.7739 207.549 38.7521 208.075 42.8054 208.075ZM42.8054 218.771C37.326 218.771 32.0718 217.983 27.0428 216.407C21.9387 214.755 17.4351 212.316 13.532 209.088C9.62885 205.861 6.51386 201.845 4.187 197.041C1.86014 192.237 0.696712 186.645 0.696712 180.265C0.696712 173.885 1.86014 168.293 4.187 163.489C6.51386 158.685 9.62885 154.67 13.532 151.442C17.4351 148.215 21.9387 145.813 27.0428 144.236C32.0718 142.585 37.326 141.759 42.8054 141.759C48.2847 141.759 53.5765 142.585 58.6806 144.236C63.7096 145.813 68.1757 148.215 72.0788 151.442C75.9819 154.67 79.0969 158.685 81.4237 163.489C83.6755 168.293 84.8014 173.885 84.8014 180.265C84.8014 186.645 83.6755 192.237 81.4237 197.041C79.0969 201.845 75.9819 205.861 72.0788 209.088C68.1757 212.316 63.7096 214.755 58.6806 216.407C53.5765 217.983 48.2847 218.771 42.8054 218.771ZM11.6179 110.486V137.282H2.61074V72.9933H11.6179V99.7897H83V110.486H11.6179ZM2.61074 64.0741V53.378H37.1759V11.0442H2.61074V0.348115H83V11.0442H46.1831V53.378H83V64.0741H2.61074Z" fill="black"/>
          </Svg>

      </View>

      
      <View style={styles.rightContainer}>
       
        <View style={styles.photoCounter}>
          <Text style={styles.counterText}>{capturedImages.length}/{MAX_IMAGES}</Text>
          <Text style={styles.photosLabel}>PHOTOS</Text>
        </View>

        
       
          <View style={styles.buttonContainer}>

            <View style={styles.buttonSpacing}>
              <Svg width="205" height="108" viewBox="0 0 205 108" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Line x1="0.5" y1="-2.18557e-08" x2="0.500005" y2="108" stroke="black"/>
              <Line x1="6.5" y1="-2.18557e-08" x2="6.5" y2="108" stroke="black"/>
              <Line x1="12.5" y1="-2.18557e-08" x2="12.5" y2="108" stroke="black"/>
              <Line x1="18.5" y1="-2.18557e-08" x2="18.5" y2="108" stroke="black"/>
              <Line x1="24.5" y1="-2.18557e-08" x2="24.5" y2="108" stroke="black"/>
              <Line x1="30.5" y1="-2.18557e-08" x2="30.5" y2="108" stroke="black"/>
              <Line x1="36.5" y1="-2.18557e-08" x2="36.5" y2="108" stroke="black"/>
              <Line x1="42.5" y1="-2.18557e-08" x2="42.5" y2="108" stroke="black"/>
              <Line x1="48.5" y1="-2.18557e-08" x2="48.5" y2="108" stroke="black"/>
              <Line x1="54.5" y1="-2.18557e-08" x2="54.5" y2="108" stroke="black"/>
              <Line x1="60.5" y1="-2.18557e-08" x2="60.5" y2="108" stroke="black"/>
              <Line x1="66.5" y1="-2.18557e-08" x2="66.5" y2="108" stroke="black"/>
              <Line x1="72.5" y1="-2.18557e-08" x2="72.5" y2="108" stroke="black"/>
              <Line x1="78.5" y1="-2.18557e-08" x2="78.5" y2="108" stroke="black"/>
              <Line x1="84.5" y1="-2.18557e-08" x2="84.5" y2="108" stroke="black"/>
              <Line x1="90.5" y1="-2.18557e-08" x2="90.5" y2="108" stroke="black"/>
              <Line x1="96.5" y1="-2.18557e-08" x2="96.5" y2="108" stroke="black"/>
              <Line x1="102.5" y1="-2.18557e-08" x2="102.5" y2="108" stroke="black"/>
              <Line x1="108.5" y1="-2.18557e-08" x2="108.5" y2="108" stroke="black"/>
              <Line x1="114.5" y1="-2.18557e-08" x2="114.5" y2="108" stroke="black"/>
              <Line x1="120.5" y1="-2.18557e-08" x2="120.5" y2="108" stroke="black"/>
              <Line x1="126.5" y1="-2.18557e-08" x2="126.5" y2="108" stroke="black"/>
              <Line x1="132.5" y1="-2.18557e-08" x2="132.5" y2="108" stroke="black"/>
              <Line x1="138.5" y1="-2.18557e-08" x2="138.5" y2="108" stroke="black"/>
              <Line x1="144.5" y1="-2.18557e-08" x2="144.5" y2="108" stroke="black"/>
              <Line x1="150.5" y1="-2.18557e-08" x2="150.5" y2="108" stroke="black"/>
              <Line x1="156.5" y1="-2.18557e-08" x2="156.5" y2="108" stroke="black"/>
              <Line x1="162.5" y1="-2.18557e-08" x2="162.5" y2="108" stroke="black"/>
              <Line x1="168.5" y1="-2.18557e-08" x2="168.5" y2="108" stroke="black"/>
              <Line x1="174.5" y1="-2.18557e-08" x2="174.5" y2="108" stroke="black"/>
              <Line x1="180.5" y1="-2.18557e-08" x2="180.5" y2="108" stroke="black"/>
              <Line x1="186.5" y1="-2.18557e-08" x2="186.5" y2="108" stroke="black"/>
              <Line x1="192.5" y1="-2.18557e-08" x2="192.5" y2="108" stroke="black"/>
              <Line x1="198.5" y1="-2.18557e-08" x2="198.5" y2="108" stroke="black"/>
              <Line x1="204.5" y1="-2.18557e-08" x2="204.5" y2="108" stroke="black"/>
              </Svg>
              <TouchableOpacity 
                style={[
                  styles.actionButton,
                  !canAddMore() && styles.actionButtonDisabled
                ]}
                onPress={startCameraFlow}
                disabled={!canAddMore()}
              >
                

                <Text style={[
                  styles.actionButtonText,
                  !canAddMore() && styles.actionButtonTextDisabled
                ]}>
                  USE CAMERA
                </Text>
                
              </TouchableOpacity>
            </View>


            <View style={styles.buttonSpacing}>
              <Svg width="205" height="108" viewBox="0 0 205 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Line x1="0.5" y1="-2.18557e-08" x2="0.500005" y2="108" stroke="black"/>
                <Line x1="6.5" y1="-2.18557e-08" x2="6.5" y2="108" stroke="black"/>
                <Line x1="12.5" y1="-2.18557e-08" x2="12.5" y2="108" stroke="black"/>
                <Line x1="18.5" y1="-2.18557e-08" x2="18.5" y2="108" stroke="black"/>
                <Line x1="24.5" y1="-2.18557e-08" x2="24.5" y2="108" stroke="black"/>
                <Line x1="30.5" y1="-2.18557e-08" x2="30.5" y2="108" stroke="black"/>
                <Line x1="36.5" y1="-2.18557e-08" x2="36.5" y2="108" stroke="black"/>
                <Line x1="42.5" y1="-2.18557e-08" x2="42.5" y2="108" stroke="black"/>
                <Line x1="48.5" y1="-2.18557e-08" x2="48.5" y2="108" stroke="black"/>
                <Line x1="54.5" y1="-2.18557e-08" x2="54.5" y2="108" stroke="black"/>
                <Line x1="60.5" y1="-2.18557e-08" x2="60.5" y2="108" stroke="black"/>
                <Line x1="66.5" y1="-2.18557e-08" x2="66.5" y2="108" stroke="black"/>
                <Line x1="72.5" y1="-2.18557e-08" x2="72.5" y2="108" stroke="black"/>
                <Line x1="78.5" y1="-2.18557e-08" x2="78.5" y2="108" stroke="black"/>
                <Line x1="84.5" y1="-2.18557e-08" x2="84.5" y2="108" stroke="black"/>
                <Line x1="90.5" y1="-2.18557e-08" x2="90.5" y2="108" stroke="black"/>
                <Line x1="96.5" y1="-2.18557e-08" x2="96.5" y2="108" stroke="black"/>
                <Line x1="102.5" y1="-2.18557e-08" x2="102.5" y2="108" stroke="black"/>
                <Line x1="108.5" y1="-2.18557e-08" x2="108.5" y2="108" stroke="black"/>
                <Line x1="114.5" y1="-2.18557e-08" x2="114.5" y2="108" stroke="black"/>
                <Line x1="120.5" y1="-2.18557e-08" x2="120.5" y2="108" stroke="black"/>
                <Line x1="126.5" y1="-2.18557e-08" x2="126.5" y2="108" stroke="black"/>
                <Line x1="132.5" y1="-2.18557e-08" x2="132.5" y2="108" stroke="black"/>
                <Line x1="138.5" y1="-2.18557e-08" x2="138.5" y2="108" stroke="black"/>
                <Line x1="144.5" y1="-2.18557e-08" x2="144.5" y2="108" stroke="black"/>
                <Line x1="150.5" y1="-2.18557e-08" x2="150.5" y2="108" stroke="black"/>
                <Line x1="156.5" y1="-2.18557e-08" x2="156.5" y2="108" stroke="black"/>
                <Line x1="162.5" y1="-2.18557e-08" x2="162.5" y2="108" stroke="black"/>
                <Line x1="168.5" y1="-2.18557e-08" x2="168.5" y2="108" stroke="black"/>
                <Line x1="174.5" y1="-2.18557e-08" x2="174.5" y2="108" stroke="black"/>
                <Line x1="180.5" y1="-2.18557e-08" x2="180.5" y2="108" stroke="black"/>
                <Line x1="186.5" y1="-2.18557e-08" x2="186.5" y2="108" stroke="black"/>
                <Line x1="192.5" y1="-2.18557e-08" x2="192.5" y2="108" stroke="black"/>
                <Line x1="198.5" y1="-2.18557e-08" x2="198.5" y2="108" stroke="black"/>
                <Line x1="204.5" y1="-2.18557e-08" x2="204.5" y2="108" stroke="black"/>
              </Svg>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={navigateToUploadScreen}
              >
                <Text style={styles.actionButtonText}>UPLOAD PHOTOS</Text>
                
              </TouchableOpacity>
            </View>
          </View>
        

       
        


       
        <View style={styles.bottomButtons}>
          <TouchableOpacity 
            style={[
              styles.bottomButton,
              capturedImages.length === 0 && styles.bottomButtonDisabled
            ]}
            onPress={showImageGallery}
            disabled={capturedImages.length === 0}
          >
            <Text style={[
              styles.bottomButtonText,
              capturedImages.length === 0 && styles.bottomButtonTextDisabled
            ]}>
              VIEW GALLERY
            </Text>
            <Text>↗</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.bottomButton,
              capturedImages.length === 0 && styles.bottomButtonDisabled
            ]}
            onPress={navigateToCustomize}
            disabled={capturedImages.length === 0}
          >
            <Text style={[
              styles.bottomButtonText,
              capturedImages.length === 0 && styles.bottomButtonTextDisabled
            ]}>
              CUSTOMISE PHOTOS
            </Text>
            <Text>↗</Text>
          </TouchableOpacity>

          {/* {capturedImages.length > 0 && (
            <>
              <View style={styles.buttonSpacing} />
              <TouchableOpacity style={styles.clearButton} onPress={clearAllPhotos}>
                <Text style={styles.clearButtonText}>Clear All Photos</Text>
              </TouchableOpacity>
            </>
          )} */}
        </View>
      </View>

     
      <Modal
        visible={showCameraModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.titleText}>B&W Photo Session</Text>
            
            <Text style={styles.photoNumberText}>
              Photo {currentPhotoNumber} of {MAX_IMAGES}
            </Text>
            
            <Text style={styles.instructionText}>
              {capturedImages.length === 0 
                ? "Ready to take black & white photos!\nPhotos will be converted automatically."
                : `${capturedImages.length} photo${capturedImages.length > 1 ? 's' : ''} captured so far.\n${remainingSlotsCount} slot${remainingSlotsCount > 1 ? 's' : ''} remaining.`
              }
            </Text>
            
            <TouchableOpacity 
              style={styles.takePhotoButton} 
              onPress={takePhoto}
            >
              <Text style={styles.takePhotoText}>
                Take Photo {currentPhotoNumber}
              </Text>
            </TouchableOpacity>
            
            <View style={styles.progressContainer}>
              {Array.from({length: MAX_IMAGES}, (_, i) => i + 1).map((num) => (
                <View 
                  key={num} 
                  style={[
                    styles.progressDot,
                    capturedImages.length >= num ? styles.progressDotFilled : null
                  ]}
                />
              ))}
            </View>
            
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.modalActionButton, styles.viewButton]} 
                onPress={() => {
                  setShowCameraModal(false);
                  if (capturedImages.length > 0) {
                    setShowGallery(true);
                  }
                }}
                disabled={capturedImages.length === 0}
              >
                <Text style={styles.modalActionButtonText}>
                  View Photos ({capturedImages.length})
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalActionButton, styles.cancelButton]} 
                onPress={closeCameraModal}
              >
                <Text style={styles.modalActionButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      
      <Modal
        visible={showGallery}
        animationType="slide"
      >
        <View style={styles.galleryContainer}>
          <View style={styles.galleryHeader}>
            <Text style={styles.galleryTitle}>Your Photos ({capturedImages.length})</Text>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowGallery(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.galleryScroll}>
            {capturedImages.map((imageUri, index) => (
              <View key={index} style={styles.galleryImageContainer}>
                <Text style={styles.imageLabel}>Photo {index + 1}</Text>
                <View style={styles.bwImageContainer}>
                  <Image 
                    source={{ uri: imageUri }} 
                    style={styles.galleryImage}
                  />
                  <View style={styles.grayscaleOverlay} />
                </View>
              </View>
            ))}
            {capturedImages.length === 0 && (
              <View style={styles.emptyGallery}>
                <Text style={styles.emptyText}>No photos yet!</Text>
                <Text style={styles.emptySubtext}>Use the camera or upload from gallery.</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  rightContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 60,
    justifyContent: 'space-between',
    paddingLeft: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 40,
    marginTop: -150,
  },
  buttonSpacing:{
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: 205,
    borderBottomWidth: 2,         
    borderBottomColor: '#B8B8B8',
    paddingBottom: 18,
    overflow: 'hidden',
  },
  photoCounter: {
    alignItems: 'flex-end',
    marginBottom: 20,
    borderBottomWidth: 2,         
    borderBottomColor: '#B8B8B8',
    paddingBottom: 12,
  },
  counterText: {
    fontSize: 35,
    fontFamily: 'grotesk',
  },
  photosLabel: {
    fontSize: 18,
    fontFamily: 'grotesk',
    marginTop: 4,
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    alignSelf: 'flex-end',
    // marginRight: -20,
    
  },
  actionButtonDisabled: {
    borderColor: '#ccc',
  },
  actionButtonText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'grotesk',
    
  },
  actionButtonTextDisabled: {
    color: '#ccc',
  },
 
  bottomButtons: {
     marginBottom: -20,
  },
  bottomButton: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'grotesk',
  },
  bottomButtonTextDisabled: {
    color: '#777676ff',
    fontSize: 16,
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    minWidth: 320,
    maxWidth: '90%',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  photoNumberText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#666',
  },
  instructionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#777',
    lineHeight: 22,
  },
  takePhotoButton: {
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  takePhotoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  progressDotFilled: {
    backgroundColor: '#333333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalActionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#8B7355',
  },
  viewButton: {
    backgroundColor: '#333333',
  },
  cancelButton: {
    backgroundColor: '#666666',
  },
  modalActionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  galleryContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  galleryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  galleryScroll: {
    padding: 20,
  },
  galleryImageContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  bwImageContainer: {
    position: 'relative',
  },
  galleryImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  grayscaleOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#888888',
    borderRadius: 10,
    opacity: 0.4,
    mixBlendMode: 'saturation',
  },
  emptyGallery: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  leftContainer: {
  width: width * 0.4,
  justifyContent: 'flex-end',
  alignItems: 'center',
  borderWidth: 2,
  borderColor: '#B8B8B8',
},
verticalTextContainer: {
  flexDirection: 'column',
},
verticalLetter: {
  fontSize: 75,
  fontWeight: 'bold',
  color: '#000',
  fontFamily: 'grotesk',
  textAlign: 'left',
  transform: [{ rotate: '-90deg' }], 
  textTransform: 'uppercase',
},
});