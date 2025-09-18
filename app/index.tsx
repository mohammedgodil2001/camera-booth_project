// import * as ImagePicker from 'expo-image-picker';
// import { useState } from 'react';
// import { Alert, Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function ImagePickerExample() {
//   const [image, setImage] = useState<string | null>(null);
//   const [capturedImages, setCapturedImages] = useState<string[]>([]);
//   const [showCameraModal, setShowCameraModal] = useState(false);
//   const [currentPhotoNumber, setCurrentPhotoNumber] = useState(1);
//   const [showGallery, setShowGallery] = useState(false);

//   const pickImageFromGallery = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ['images', 'videos'],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

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
//       setShowCameraModal(true);
//       setCapturedImages([]);
//       setCurrentPhotoNumber(1);
//     }
//   };

//   const takePhoto = async () => {
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
        
//         setCapturedImages(prev => [...prev, newImage]);
        
//         if (currentPhotoNumber < 3) {
//           // Move to next photo
//           setCurrentPhotoNumber(currentPhotoNumber + 1);
//         } else {
//           // All photos completed
//           console.log('All photos completed!');
//           setShowCameraModal(false);
//           Alert.alert(
//             'Photos Captured!',
//             'All 3 photos have been taken. Click "See Pics" to view them.',
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
//       Alert.alert('No Photos', 'No photos have been captured yet.');
//     }
//   };

//   const restartPhotoSession = () => {
//     setCapturedImages([]);
//     setCurrentPhotoNumber(1);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Photo Booth</Text>
      
//       <Button title="Upload Photo from Gallery" onPress={pickImageFromGallery} />
//       <View style={styles.buttonSpacing} />
      
//       <Button title="Take 3 Photos" onPress={startCameraFlow} />
//       <View style={styles.buttonSpacing} />
      
//       <Button 
//         title={`View Photos (${capturedImages.length})`} 
//         onPress={showImageGallery}
//         disabled={capturedImages.length === 0}
//       />

//       {image && (
//         <View style={styles.imageContainer}>
//           <Text style={styles.imageLabel}>Gallery Photo:</Text>
//           <Image source={{ uri: image }} style={styles.image} />
//         </View>
//       )}

//       {/* Camera Modal */}
//       <Modal
//         visible={showCameraModal}
//         animationType="slide"
//         transparent={true}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.titleText}>Photo Session</Text>
            
//             <Text style={styles.photoNumberText}>
//               Photo {currentPhotoNumber} of 3
//             </Text>
            
//             <Text style={styles.instructionText}>
//               {capturedImages.length === 0 
//                 ? "Ready to start taking photos!"
//                 : `${capturedImages.length} photo${capturedImages.length > 1 ? 's' : ''} captured so far.`
//               }
//             </Text>
            
//             {currentPhotoNumber <= 3 ? (
//               <TouchableOpacity 
//                 style={styles.takePhotoButton} 
//                 onPress={takePhoto}
//               >
//                 <Text style={styles.takePhotoText}>
//                   📸 Take Photo {currentPhotoNumber}
//                 </Text>
//               </TouchableOpacity>
//             ) : (
//               <View style={styles.completedContainer}>
//                 <Text style={styles.completedText}>✅ All photos taken!</Text>
//                 <TouchableOpacity 
//                   style={styles.takePhotoButton} 
//                   onPress={restartPhotoSession}
//                 >
//                   <Text style={styles.takePhotoText}>Start Over</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
            
//             <View style={styles.progressContainer}>
//               {[1, 2, 3].map((num) => (
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

//       {/* Gallery Modal */}
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
//                 <Image source={{ uri: imageUri }} style={styles.galleryImage} />
//               </View>
//             ))}
//             {capturedImages.length === 0 && (
//               <View style={styles.emptyGallery}>
//                 <Text style={styles.emptyText}>No photos yet!</Text>
//                 <Text style={styles.emptySubtext}>Use the camera to take some photos.</Text>
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
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#333',
//   },
//   buttonSpacing: {
//     height: 15,
//   },
//   imageContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   imageLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#666',
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
//     backgroundColor: '#007AFF',
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
//   completedContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   completedText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//     marginBottom: 15,
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
//     backgroundColor: '#007AFF',
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
//   },
//   viewButton: {
//     backgroundColor: '#4CAF50',
//   },
//   cancelButton: {
//     backgroundColor: '#FF3B30',
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
//   galleryImage: {
//     width: '100%',
//     maxWidth: 300,
//     height: 300,
//     borderRadius: 10,
//     marginTop: 10,
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









// import * as ImagePicker from 'expo-image-picker';
// import { useState } from 'react';
// import { Alert, Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function ImagePickerExample() {
//   const [image, setImage] = useState<string | null>(null);
//   const [capturedImages, setCapturedImages] = useState<string[]>([]);
//   const [showCameraModal, setShowCameraModal] = useState(false);
//   const [currentPhotoNumber, setCurrentPhotoNumber] = useState(1);
//   const [showGallery, setShowGallery] = useState(false);

//   const pickImageFromGallery = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ['images', 'videos'],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

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
//       setShowCameraModal(true);
//       setCapturedImages([]);
//       setCurrentPhotoNumber(1);
//     }
//   };

//   const takePhoto = async () => {
//     console.log(`Taking photo ${currentPhotoNumber}`);
    
//     try {
//       let result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ['images'],
//         allowsEditing: false,
//         quality: 0.8,
//         exif: false, // no GPS/camera data in the result
//       });

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         const newImage = result.assets[0].uri;
//         console.log(`Photo ${currentPhotoNumber} captured successfully`);
        
//         setCapturedImages(prev => [...prev, newImage]);
        
//         if (currentPhotoNumber < 3) {
//           setCurrentPhotoNumber(currentPhotoNumber + 1);
//         } else {
//           console.log('All photos completed!');
//           setShowCameraModal(false);
//           Alert.alert(
//             'Photos Captured!',
//             'All 3 photos have been taken and converted to B&W. View them in the gallery!',
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
//       Alert.alert('No Photos', 'No photos have been captured yet.');
//     }
//   };

 

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>B&W Photo Booth</Text>
//       <Text style={styles.subtitle}>Take photos and see them in black & white</Text>
      
//       <Button title="Upload from Gallery" onPress={pickImageFromGallery} />
//       <View style={styles.buttonSpacing} />
      
//       <Button title="Take 3 B&W Photos" onPress={startCameraFlow} />
//       <View style={styles.buttonSpacing} />
      
//       <Button 
//         title={`View B&W Gallery (${capturedImages.length})`} 
//         onPress={showImageGallery}
//         disabled={capturedImages.length === 0}
//       />

//       {image && (
//         <View style={styles.imageContainer}>
//           <Text style={styles.imageLabel}>Gallery Photo:</Text>
//           <Image source={{ uri: image }} style={styles.image} />
//         </View>
//       )}

//       {/* Camera Modal */}
//       <Modal
//         visible={showCameraModal}
//         animationType="slide"
//         transparent={true}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.titleText}>B&W Photo Session</Text>
            
//             <Text style={styles.photoNumberText}>
//               Photo {currentPhotoNumber} of 3
//             </Text>
            
//             <Text style={styles.instructionText}>
//               {capturedImages.length === 0 
//                 ? "Ready to take black & white photos!\nPhotos will be converted automatically."
//                 : `${capturedImages.length} B&W photo${capturedImages.length > 1 ? 's' : ''} captured so far.`
//               }
//             </Text>
            
            
//               <TouchableOpacity 
//                 style={styles.takePhotoButton} 
//                 onPress={takePhoto}
//               >
//                 <Text style={styles.takePhotoText}>
//                   Take Photo {currentPhotoNumber}
//                 </Text>
//               </TouchableOpacity>
            
            
//             <View style={styles.progressContainer}>
//               {[1, 2, 3].map((num) => (
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
//                   View B&W Photos ({capturedImages.length})
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

//       {/* Gallery Modal - Using simple but effective grayscale */}
//       <Modal
//         visible={showGallery}
//         animationType="slide"
//       >
//         <View style={styles.galleryContainer}>
//           <View style={styles.galleryHeader}>
//             <Text style={styles.galleryTitle}>Your B&W Photos ({capturedImages.length})</Text>
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
//                 <Text style={styles.imageLabel}>B&W Photo {index + 1}</Text>
//                 <View style={styles.bwImageContainer}>
//                   <Image 
//                     source={{ uri: imageUri }} 
//                     style={styles.galleryImage}
//                   />
//                   {/* Simple but effective grayscale overlay */}
//                   <View style={styles.grayscaleOverlay} />
//                 </View>
//               </View>
//             ))}
//             {capturedImages.length === 0 && (
//               <View style={styles.emptyGallery}>
//                 <Text style={styles.emptyText}>No photos yet!</Text>
//                 <Text style={styles.emptySubtext}>Use the camera to take some photos.</Text>
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
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   buttonSpacing: {
//     height: 15,
//   },
//   imageContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   imageLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#666',
//     marginBottom: 10,
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
//   takePhotoSubtext: {
//     color: 'rgba(255, 255, 255, 0.7)',
//     fontSize: 12,
//     marginTop: 5,
//   },
//   completedContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   completedText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333',
//     marginBottom: 15,
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
//   bwImageContainer: {
//     position: 'relative',
//   },
//   galleryImage: {
//     width: 300,
//     height: 300,
//     borderRadius: 10,
//   },
//   // Improved grayscale effect
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




// import * as ImagePicker from 'expo-image-picker';
// import { useState } from 'react';
// import { Alert, Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { router } from 'expo-router';

// export default function HomeScreen() {
//   const [image, setImage] = useState<string | null>(null);
//   const [capturedImages, setCapturedImages] = useState<string[]>([]);
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
//     const hasPermission = await requestCameraPermission();
//     if (hasPermission) {
//       setShowCameraModal(true);
//       setCapturedImages([]);
//       setCurrentPhotoNumber(1);
//     }
//   };

//   const takePhoto = async () => {
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
        
//         setCapturedImages(prev => [...prev, newImage]);
        
//         if (currentPhotoNumber < 3) {
//           setCurrentPhotoNumber(currentPhotoNumber + 1);
//         } else {
//           console.log('All photos completed!');
//           setShowCameraModal(false);
//           Alert.alert(
//             'Photos Captured!',
//             'All 3 photos have been taken and converted to B&W. View them in the gallery!',
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
//       Alert.alert('No Photos', 'No photos have been captured yet.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>B&W Photo Booth</Text>
//       <Text style={styles.subtitle}>Take photos and see them in black & white</Text>
      
//       <Button title="Upload from Gallery" onPress={navigateToUploadScreen} />
//       <View style={styles.buttonSpacing} />
      
//       <Button title="Take 3 B&W Photos" onPress={startCameraFlow} />
//       <View style={styles.buttonSpacing} />
      
//       <Button 
//         title={`View B&W Gallery (${capturedImages.length})`} 
//         onPress={showImageGallery}
//         disabled={capturedImages.length === 0}
//       />

//       {image && (
//         <View style={styles.imageContainer}>
//           <Text style={styles.imageLabel}>Gallery Photo:</Text>
//           <Image source={{ uri: image }} style={styles.image} />
//         </View>
//       )}

//       {/* Camera Modal */}
//       <Modal
//         visible={showCameraModal}
//         animationType="slide"
//         transparent={true}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.titleText}>B&W Photo Session</Text>
            
//             <Text style={styles.photoNumberText}>
//               Photo {currentPhotoNumber} of 3
//             </Text>
            
//             <Text style={styles.instructionText}>
//               {capturedImages.length === 0 
//                 ? "Ready to take black & white photos!\nPhotos will be converted automatically."
//                 : `${capturedImages.length} B&W photo${capturedImages.length > 1 ? 's' : ''} captured so far.`
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
//               {[1, 2, 3].map((num) => (
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
//                   View B&W Photos ({capturedImages.length})
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

//       {/* Gallery Modal */}
//       <Modal
//         visible={showGallery}
//         animationType="slide"
//       >
//         <View style={styles.galleryContainer}>
//           <View style={styles.galleryHeader}>
//             <Text style={styles.galleryTitle}>Your B&W Photos ({capturedImages.length})</Text>
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
//                 <Text style={styles.imageLabel}>B&W Photo {index + 1}</Text>
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
//                 <Text style={styles.emptySubtext}>Use the camera to take some photos.</Text>
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
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   buttonSpacing: {
//     height: 15,
//   },
//   imageContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   imageLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#666',
//     marginBottom: 10,
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





// import * as ImagePicker from 'expo-image-picker';
// import { router } from 'expo-router';
// import { useState } from 'react';
// import { Alert, Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function HomeScreen() {
//   // Single source of truth for all images
//   const [capturedImages, setCapturedImages] = useState<string[]>([]);
//   const [showCameraModal, setShowCameraModal] = useState(false);
//   const [currentPhotoNumber, setCurrentPhotoNumber] = useState(1);
//   const [showGallery, setShowGallery] = useState(false);

//   const MAX_IMAGES = 3;

//   const navigateToUploadScreen = () => {
//     router.push({
//       pathname: '/upload',
//       params: {
//         capturedImages: JSON.stringify(capturedImages),
//       }
//     });
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
//     // Check if already at max capacity
//     if (capturedImages.length >= MAX_IMAGES) {
//       Alert.alert(
//         'Maximum Photos Reached',
//         `You can only have ${MAX_IMAGES} photos total. Please remove some photos first.`
//       );
//       return;
//     }

//     const hasPermission = await requestCameraPermission();
//     if (hasPermission) {
//       setShowCameraModal(true);
//       // Start from current length + 1
//       setCurrentPhotoNumber(capturedImages.length + 1);
//     }
//   };

//   const takePhoto = async () => {
//     // Double check we're not exceeding limit
//     if (capturedImages.length >= MAX_IMAGES) {
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
        
//         setCapturedImages(prev => [...prev, newImage]);
        
//         // Check if we can take more photos
//         const newTotal = capturedImages.length + 1;
//         if (newTotal < MAX_IMAGES) {
//           setCurrentPhotoNumber(newTotal + 1);
//         } else {
//           // Reached max capacity
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
//           onPress: () => setCapturedImages([])
//         }
//       ]
//     );
//   };

//   // Calculate remaining slots
//   const remainingSlots = MAX_IMAGES - capturedImages.length;
//   const canTakeMorePhotos = remainingSlots > 0;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>B&W Photo Booth</Text>
//       <Text style={styles.subtitle}>Take photos and see them in black & white</Text>
      
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
//       </View>
      
//       <Button title="Upload from Gallery" onPress={navigateToUploadScreen} />
//       <View style={styles.buttonSpacing} />
      
//       <Button 
//         title={canTakeMorePhotos ? "Take Photos with Camera" : "Camera (Full)"}
//         onPress={startCameraFlow}
//         disabled={!canTakeMorePhotos}
//       />
//       <View style={styles.buttonSpacing} />
      
//       <Button 
//         title={`View All Photos (${capturedImages.length})`} 
//         onPress={showImageGallery}
//         disabled={capturedImages.length === 0}
//       />
      
//       {capturedImages.length > 0 && (
//         <>
//           <View style={styles.buttonSpacing} />
//           <TouchableOpacity style={styles.clearButton} onPress={clearAllPhotos}>
//             <Text style={styles.clearButtonText}>Clear All Photos</Text>
//           </TouchableOpacity>
//         </>
//       )}

//       {/* Camera Modal */}
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
//                 : `${capturedImages.length} photo${capturedImages.length > 1 ? 's' : ''} captured so far.\n${remainingSlots} slot${remainingSlots > 1 ? 's' : ''} remaining.`
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

//       {/* Gallery Modal */}
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
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
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
import { Alert, Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { usePhotos } from '../contexts/PhotoContext'; // Adjust this path to where you put the context file

export default function HomeScreen() {
  // Use global state instead of local state
  const { 
    capturedImages, 
    addImage, 
    clearAllImages, 
    MAX_IMAGES, 
    canAddMore, 
    remainingSlots 
  } = usePhotos(); // toh jaise humne pedro ki video mai dekha hai ke woh usko usecontext(loginConetx) karke likh rahe hai and ab login context se hume konse value access karni hai woh yaha par aayegi so the logic is exactly the same

  const [showCameraModal, setShowCameraModal] = useState(false);
  const [currentPhotoNumber, setCurrentPhotoNumber] = useState(1);
  const [showGallery, setShowGallery] = useState(false);

  const navigateToUploadScreen = () => {
    // No need to pass params anymore
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
    // Check if already at max capacity
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
      // Start from current length + 1
      setCurrentPhotoNumber(capturedImages.length + 1);
    }
  };

  const takePhoto = async () => {
    // Double check we're not exceeding limit
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
        
        addImage(newImage); // Use global state method
        
        // Check if we can take more photos
        const newTotal = capturedImages.length + 1;
        if (newTotal < MAX_IMAGES) {
          setCurrentPhotoNumber(newTotal + 1);
        } else {
          // Reached max capacity
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
          onPress: () => clearAllImages() // Use global state method
        }
      ]
    );
  };

  const remainingSlotsCount = remainingSlots();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>B&W Photo Booth</Text>
      <Text style={styles.subtitle}>Take photos and see them in black & white</Text>
      
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
      </View>
      
      <Button title="Upload from Gallery" onPress={navigateToUploadScreen} />
      <View style={styles.buttonSpacing} />
      
      <Button 
        title={canAddMore() ? "Take Photos with Camera" : "Camera (Full)"}
        onPress={startCameraFlow}
        disabled={!canAddMore()}
      />
      <View style={styles.buttonSpacing} />
      
      <Button 
        title={`View All Photos (${capturedImages.length})`} 
        onPress={showImageGallery}
        disabled={capturedImages.length === 0}
      />
      
      {capturedImages.length > 0 && (
        <>
          <View style={styles.buttonSpacing} />
          <TouchableOpacity style={styles.clearButton} onPress={clearAllPhotos}>
            <Text style={styles.clearButtonText}>Clear All Photos</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Camera Modal */}
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

// Keep the same styles as before
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
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#e8f4f8',
    borderRadius: 8,
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
  buttonSpacing: {
    height: 15,
  },
  clearButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
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
  actionButton: {
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
});