// import * as ImagePicker from 'expo-image-picker';
// import { useEffect, useState } from 'react';
// import { Alert, Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function ImagePickerExample() {
//   const [image, setImage] = useState<string | null>(null);
//   const [capturedImages, setCapturedImages] = useState<string[]>([]);
//   const [showCameraModal, setShowCameraModal] = useState(false);
//   const [countdown, setCountdown] = useState(0);
//   const [currentPhotoNumber, setCurrentPhotoNumber] = useState(1);
//   const [isCountingDown, setIsCountingDown] = useState(false);
//   const [showGallery, setShowGallery] = useState(false);
//   const [cameraPermission, setCameraPermission] = useState(false);

//   const pickImageFromGallery = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ['images', 'videos'],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
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
//     const hasPermission = await requestCameraPermission();
//     if (hasPermission) {
//       setCameraPermission(true);
//       setShowCameraModal(true);
//       setCapturedImages([]);
//       setCurrentPhotoNumber(1);
//       setIsCountingDown(true);
//       setCountdown(4);
//     }
//   };

//   const startCountdown = () => {
//     setIsCountingDown(true);
//     setCountdown(4);
//   };

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
    
//     if (isCountingDown && countdown > 0) {
//       interval = setInterval(() => {
//         setCountdown(prev => prev - 1);
//       }, 1000);
//     } else if (isCountingDown && countdown === 0) {
//       // Take photo
//       takePhoto();
//       setIsCountingDown(false);
//     }

//     return () => clearInterval(interval);
//   }, [countdown, isCountingDown]);

//   const takePhoto = async () => {
//     try {
//       let result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ['images'],
//         allowsEditing: false,
//         quality: 1,
//       });

//       if (!result.canceled) {
//         const newImage = result.assets[0].uri;
//         setCapturedImages(prev => [...prev, newImage]);
        
//         if (currentPhotoNumber < 3) {
//           // Prepare for next photo
//           setCurrentPhotoNumber(prev => prev + 1);
//           setTimeout(() => {
//             startCountdown();
//           }, 1000);
//         } else {
//           // All photos taken
//           setTimeout(() => {
//             setShowCameraModal(false);
//             Alert.alert(
//               'Photos Captured!',
//               'All 3 photos have been taken. Click "See Pics" to view them.',
//               [{ text: 'OK' }]
//             );
//           }, 1000);
//         }
//       }
//     } catch (error) {
//       console.log('Camera error:', error);
//       Alert.alert('Error', 'Failed to take photo. Please try again.');
//     }
//   };

//   const closeCameraModal = () => {
//     setShowCameraModal(false);
//     setIsCountingDown(false);
//     setCountdown(0);
//     setCurrentPhotoNumber(1);
//     setCameraPermission(false);
//   };

//   const showImageGallery = () => {
//     if (capturedImages.length > 0) {
//       setShowGallery(true);
//     } else {
//       Alert.alert('No Photos', 'No photos have been captured yet.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Upload Photo" onPress={pickImageFromGallery} />
//       <View style={styles.buttonSpacing} />
//       <Button title="Use Camera" onPress={startCameraFlow} />
//       <View style={styles.buttonSpacing} />
//       <Button 
//         title={`See Pics (${capturedImages.length})`} 
//         onPress={showImageGallery}
//         disabled={capturedImages.length === 0}
//       />

//       {image && <Image source={{ uri: image }} style={styles.image} />}

//       {/* Camera Permission and Countdown Modal */}
//       <Modal
//         visible={showCameraModal}
//         animationType="slide"
//         transparent={true}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             {!isCountingDown ? (
//               <>
//                 <Text style={styles.modalTitle}>Camera Ready</Text>
//                 <Text style={styles.modalText}>
//                   Ready to take photo {currentPhotoNumber} of 3?
//                 </Text>
//                 <Text style={styles.instructionText}>
//                   Be ready for photo {currentPhotoNumber}!
//                 </Text>
//                 <View style={styles.modalButtons}>
//                   <TouchableOpacity 
//                     style={styles.startButton} 
//                     onPress={startCountdown}
//                   >
                    
//                     <Text style={styles.buttonText}>Start Countdown</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity 
//                     style={styles.cancelButton} 
//                     onPress={closeCameraModal}
//                   >
//                     <Text style={styles.buttonText}>Cancel</Text>
//                   </TouchableOpacity>
//                 </View>
//               </>
//             ) : (
//               <>
//                 <Text style={styles.photoNumberText}>
//                   Photo {currentPhotoNumber} of 3
//                 </Text>
//                 <Text style={styles.countdownText}>{countdown}</Text>
//                 <Text style={styles.readyText}>
//                   Be ready for photo {currentPhotoNumber}!
//                 </Text>
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>

//       {/* Gallery Modal */}
//       <Modal
//         visible={showGallery}
//         animationType="slide"
//       >
//         <View style={styles.galleryContainer}>
//           <View style={styles.galleryHeader}>
//             <Text style={styles.galleryTitle}>Captured Photos</Text>
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
//                 <Image source={{ uri: imageUri }} style={styles.galleryImage} />
//               </View>
//             ))}
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
//   },
//   buttonSpacing: {
//     height: 20,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginTop: 20,
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
//     minWidth: 300,
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     color: '#333',
//   },
//   modalText: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 10,
//     color: '#666',
//   },
//   instructionText: {
//     fontSize: 18,
//     fontWeight: '600',
//     textAlign: 'center',
//     marginBottom: 25,
//     color: '#007AFF',
//   },
//   photoNumberText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   countdownText: {
//     fontSize: 80,
//     fontWeight: 'bold',
//     color: '#FF3B30',
//     marginBottom: 20,
//   },
//   readyText: {
//     fontSize: 18,
//     fontWeight: '600',
//     textAlign: 'center',
//     color: '#007AFF',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   startButton: {
//     backgroundColor: '#007AFF',
//     padding: 15,
//     borderRadius: 10,
//     minWidth: 120,
//   },
//   cancelButton: {
//     backgroundColor: '#FF3B30',
//     padding: 15,
//     borderRadius: 10,
//     minWidth: 120,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
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
//     backgroundColor: '#007AFF',
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
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   galleryImage: {
//     width: 300,
//     height: 300,
//     borderRadius: 10,
//   },
// });




// import * as ImagePicker from 'expo-image-picker';
// import { useEffect, useState } from 'react';
// import { Alert, Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function ImagePickerExample() {
//   const [image, setImage] = useState<string | null>(null);
//   const [capturedImages, setCapturedImages] = useState<string[]>([]);
//   const [showCameraModal, setShowCameraModal] = useState(false);
//   const [countdown, setCountdown] = useState(0);
//   const [currentPhotoNumber, setCurrentPhotoNumber] = useState(1);
//   // const [isCountingDown, setIsCountingDown] = useState(false);
//   const [showGallery, setShowGallery] = useState(false);
//   const [cameraPermission, setCameraPermission] = useState(false);

//   const pickImageFromGallery = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ['images', 'videos'],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
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
//     const hasPermission = await requestCameraPermission();
//     if (hasPermission) {
//       setCameraPermission(true);
//       setShowCameraModal(true);
//       setCapturedImages([]);
//       setCurrentPhotoNumber(1);
//       // setIsCountingDown(true);
//       setCountdown(4);
//     }
//   };

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
    
//     if (countdown > 0) {
//       interval = setInterval(() => {
//         setCountdown(prev => prev - 1);
//       }, 1000);
//     } else if (countdown === 0) {
//       takePhoto();
//     }

//     return () => clearInterval(interval);
//   }, [countdown]);

//   const takePhoto = async () => {
//     try {
//       let result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ['images'],
//         allowsEditing: false,
//         quality: 1,
//       });

//       if (!result.canceled) {
//         const newImage = result.assets[0].uri;
//         setCapturedImages(prev => [...prev, newImage]);
        
//         if (currentPhotoNumber < 3) {
//           // Move to next photo and start countdown immediately
//           setCurrentPhotoNumber(prev => prev + 1);
//           // Small delay to ensure state is updated properly
//           setTimeout(() => {
//             setCountdown(4);
//             // setIsCountingDown(true);
//           }, 100);
//         } else {
//           // All photos taken
//           setTimeout(() => {
//             setShowCameraModal(false);
//             Alert.alert(
//               'Photos Captured!',
//               'All 3 photos have been taken. Click "See Pics" to view them.',
//               [{ text: 'OK' }]
//             );
//           }, 1000);
//         }
//       }
//     } catch (error) {
//       console.log('Camera error:', error);
//       Alert.alert('Error', 'Failed to take photo. Please try again.');
//     }
//   };

//   const closeCameraModal = () => {
//     setShowCameraModal(false);
//     // setIsCountingDown(false);
//     setCountdown(0);
//     setCurrentPhotoNumber(1);
//     setCameraPermission(false);
//   };

//   const showImageGallery = () => {
//     if (capturedImages.length > 0) {
//       setShowGallery(true);
//     } else {
//       Alert.alert('No Photos', 'No photos have been captured yet.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Upload Photo" onPress={pickImageFromGallery} />
//       <View style={styles.buttonSpacing} />
//       <Button title="Use Camera" onPress={startCameraFlow} />
//       <View style={styles.buttonSpacing} />
//       <Button 
//         title={`See Pics (${capturedImages.length})`} 
//         onPress={showImageGallery}
//         disabled={capturedImages.length === 0}
//       />

//       {image && <Image source={{ uri: image }} style={styles.image} />}

//       {/* Camera Permission and Countdown Modal */}
//       <Modal
//         visible={showCameraModal}
//         animationType="slide"
//         transparent={true}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.photoNumberText}>
//               Photo {currentPhotoNumber} of 3
//             </Text>
//             <Text style={styles.countdownText}>{countdown}</Text>
//             <Text style={styles.readyText}>
//               Be ready for photo {currentPhotoNumber}!
//             </Text>
//             <TouchableOpacity 
//               style={styles.cancelButton} 
//               onPress={closeCameraModal}
//             >
//               <Text style={styles.buttonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Gallery Modal */}
//       <Modal
//         visible={showGallery}
//         animationType="slide"
//       >
//         <View style={styles.galleryContainer}>
//           <View style={styles.galleryHeader}>
//             <Text style={styles.galleryTitle}>Captured Photos</Text>
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
//                 <Image source={{ uri: imageUri }} style={styles.galleryImage} />
//               </View>
//             ))}
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
//   },
//   buttonSpacing: {
//     height: 20,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginTop: 20,
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
//     minWidth: 300,
//   },
//   photoNumberText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   countdownText: {
//     fontSize: 80,
//     fontWeight: 'bold',
//     color: '#FF3B30',
//     marginBottom: 20,
//   },
//   readyText: {
//     fontSize: 18,
//     fontWeight: '600',
//     textAlign: 'center',
//     color: '#007AFF',
//     marginBottom: 20,
//   },
//   cancelButton: {
//     backgroundColor: '#FF3B30',
//     padding: 15,
//     borderRadius: 10,
//     minWidth: 120,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
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
//     backgroundColor: '#007AFF',
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
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   galleryImage: {
//     width: 300,
//     height: 300,
//     borderRadius: 10,
//   },
// });





import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [currentPhotoNumber, setCurrentPhotoNumber] = useState(1);
  const [showGallery, setShowGallery] = useState(false);

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      setShowCameraModal(true);
      setCapturedImages([]);
      setCurrentPhotoNumber(1);
    }
  };

  const takePhoto = async () => {
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
        
        setCapturedImages(prev => [...prev, newImage]);
        
        if (currentPhotoNumber < 3) {
          // Move to next photo
          setCurrentPhotoNumber(currentPhotoNumber + 1);
        } else {
          // All photos completed
          console.log('All photos completed!');
          setShowCameraModal(false);
          Alert.alert(
            'Photos Captured!',
            'All 3 photos have been taken. Click "See Pics" to view them.',
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
      Alert.alert('No Photos', 'No photos have been captured yet.');
    }
  };

  const restartPhotoSession = () => {
    setCapturedImages([]);
    setCurrentPhotoNumber(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photo Booth</Text>
      
      <Button title="Upload Photo from Gallery" onPress={pickImageFromGallery} />
      <View style={styles.buttonSpacing} />
      
      <Button title="Take 3 Photos" onPress={startCameraFlow} />
      <View style={styles.buttonSpacing} />
      
      <Button 
        title={`View Photos (${capturedImages.length})`} 
        onPress={showImageGallery}
        disabled={capturedImages.length === 0}
      />

      {image && (
        <View style={styles.imageContainer}>
          <Text style={styles.imageLabel}>Gallery Photo:</Text>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}

      {/* Camera Modal */}
      <Modal
        visible={showCameraModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.titleText}>Photo Session</Text>
            
            <Text style={styles.photoNumberText}>
              Photo {currentPhotoNumber} of 3
            </Text>
            
            <Text style={styles.instructionText}>
              {capturedImages.length === 0 
                ? "Ready to start taking photos!"
                : `${capturedImages.length} photo${capturedImages.length > 1 ? 's' : ''} captured so far.`
              }
            </Text>
            
            {currentPhotoNumber <= 3 ? (
              <TouchableOpacity 
                style={styles.takePhotoButton} 
                onPress={takePhoto}
              >
                <Text style={styles.takePhotoText}>
                  📸 Take Photo {currentPhotoNumber}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.completedContainer}>
                <Text style={styles.completedText}>✅ All photos taken!</Text>
                <TouchableOpacity 
                  style={styles.takePhotoButton} 
                  onPress={restartPhotoSession}
                >
                  <Text style={styles.takePhotoText}>Start Over</Text>
                </TouchableOpacity>
              </View>
            )}
            
            <View style={styles.progressContainer}>
              {[1, 2, 3].map((num) => (
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
                style={[styles.actionButton, styles.viewButton]} 
                onPress={() => {
                  setShowCameraModal(false);
                  if (capturedImages.length > 0) {
                    setShowGallery(true);
                  }
                }}
                disabled={capturedImages.length === 0}
              >
                <Text style={styles.actionButtonText}>
                  View Photos ({capturedImages.length})
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.cancelButton]} 
                onPress={closeCameraModal}
              >
                <Text style={styles.actionButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Gallery Modal */}
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
                <Image source={{ uri: imageUri }} style={styles.galleryImage} />
              </View>
            ))}
            {capturedImages.length === 0 && (
              <View style={styles.emptyGallery}>
                <Text style={styles.emptyText}>No photos yet!</Text>
                <Text style={styles.emptySubtext}>Use the camera to take some photos.</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  buttonSpacing: {
    height: 15,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
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
    backgroundColor: '#007AFF',
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
  completedContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  completedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
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
    backgroundColor: '#007AFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
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
    backgroundColor: '#007AFF',
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
  galleryImage: {
    width: '100%',
    maxWidth: 300,
    height: 300,
    borderRadius: 10,
    marginTop: 10,
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
});