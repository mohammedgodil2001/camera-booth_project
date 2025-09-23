// import * as MediaLibrary from 'expo-media-library';
// import { router, useLocalSearchParams } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//     Alert,
//     Image,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';
// import ViewShot from 'react-native-view-shot';
// import { usePhotos } from '../contexts/PhotoContext';

// export default function PreviewScreen() {
//   const { capturedImages } = usePhotos();
//   const params = useLocalSearchParams();
//   const viewShotRef = useRef<ViewShot>(null);
//   const [isSaving, setIsSaving] = useState(false);
  
//   const stripColor = params.stripColor as string || '#8B7355';
//   const backgroundColor = params.backgroundColor as string || '#f5f5f0';
//   const showDateStamp = params.showDateStamp === 'true';
//   const customText = params.customText as string || '';

//   const goBackToCustomize = () => {
//     router.back();
//   };

//   const requestPermissions = async () => {
//     const { status } = await MediaLibrary.requestPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert(
//         'Permission Required',
//         'Please grant permission to save photos to your gallery.',
//         [{ text: 'OK' }]
//       );
//       return false;
//     }
//     return true;
//   };

//   const saveToGallery = async () => {
//     if (isSaving) return;
    
//     setIsSaving(true);
    
//     try {
//       // Request permissions first
//       const hasPermission = await requestPermissions();
//       if (!hasPermission) {
//         setIsSaving(false);
//         return;
//       }

//       // Capture the photostrip view
//       const uri = await viewShotRef.current?.capture();
      
//       if (uri) {
//         // Save to gallery
//         const asset = await MediaLibrary.saveToLibraryAsync(uri);
//         console.log('Saved to gallery:', asset);
        
//         Alert.alert(
//           'Success!',
//           'Your photostrip has been saved to your gallery.',
//           [
//             { text: 'OK' },
//           ]
//         );
//       } else {
//         throw new Error('Failed to capture image');
//       }
//     } catch (error) {
//       console.error('Error saving photostrip:', error);
//       Alert.alert(
//         'Error',
//         'Failed to save photostrip. Please try again.',
//         [{ text: 'OK' }]
//       );
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const getCurrentDate = () => {
//     const now = new Date();
//     return now.toLocaleDateString('en-US', { 
//       month: 'short', 
//       day: 'numeric', 
//       year: 'numeric' 
//     });
//   };

//   return (
//     <View style={[styles.container, { backgroundColor }]}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={goBackToCustomize}>
//           <Text style={styles.backButtonText}>← Back</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Your Photostrip</Text>
//         <View style={styles.placeholder} />
//       </View>

//       {/* Photostrip Container */}
//       <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//         <View style={styles.photostripContainer}>
          
//           {/* This ViewShot wrapper captures everything inside it */}
//           <ViewShot 
//             ref={viewShotRef}
//             options={{
//               format: 'jpg',
//               quality: 0.9,
//               result: 'tmpfile',
//             }}
//             style={styles.viewShotContainer}
//           >
//             <View style={[styles.photostrip, { backgroundColor: stripColor }]}>
              
//               {/* Header Section with Text and Date */}
//               <View style={styles.stripHeader}>
//                 <Text style={styles.customText}>{customText}</Text>
//                 {showDateStamp && (
//                   <Text style={styles.dateText}>{getCurrentDate()}</Text>
//                 )}
//               </View>

//               {/* Photos Section */}
//               <View style={styles.photosContainer}>
//                 {capturedImages.map((imageUri, index) => (
//                   <View key={index} style={styles.photoFrame}>
//                     <View style={styles.bwImageContainer}>
//                       <Image 
//                         source={{ uri: imageUri }} 
//                         style={styles.photostripImage}
//                         resizeMode="cover"
//                       />
//                       <View style={styles.grayscaleOverlay} />
//                     </View>
//                   </View>
//                 ))}
//               </View>

//               {/* Footer */}
//               <View style={styles.stripFooter}>
//                 <View style={styles.stripFooterLine} />
//               </View>
//             </View>
//           </ViewShot>

//           {/* Action Buttons - Outside of ViewShot so they don't get captured */}
//           <View style={styles.actionButtonsContainer}>
//             <TouchableOpacity
//               style={[
//                 styles.actionButton, 
//                 { backgroundColor: stripColor },
//                 isSaving && styles.actionButtonDisabled
//               ]}
//               onPress={saveToGallery}
//               disabled={isSaving}
//             >
//               <Text style={styles.actionButtonText}>
//                 {isSaving ? 'Saving...' : 'Save'}
//               </Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={styles.retakeButton}
//               onPress={() => router.push('/')}
//             >
//               <Text style={[styles.retakeButtonText, { color: stripColor }]}>Take New Photos</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 50,
//     paddingBottom: 20,
//   },
//   backButton: {
//     backgroundColor: '#333',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   backButtonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#8B7355',
//   },
//   placeholder: {
//     width: 60,
//   },
//   scrollContainer: {
//     alignItems: 'center',
//     paddingBottom: 40,
//   },
//   photostripContainer: {
//     alignItems: 'center',
//   },
//   viewShotContainer: {
//     backgroundColor: 'transparent',
//   },
//   photostrip: {
//     width: 300,
//     borderRadius: 15,
//     paddingVertical: 20,
//     paddingHorizontal: 15,
//     marginBottom: 30,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   stripHeader: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   customText: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   dateText: {
//     color: '#fff',
//     fontSize: 14,
//     textAlign: 'center',
//     opacity: 0.9,
//   },
//   photosContainer: {
//     gap: 10,
//   },
//   photoFrame: {
//     width: '100%',
//     height: 150,
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#fff',
//     padding: 3,
//   },
//   bwImageContainer: {
//     flex: 1,
//     position: 'relative',
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   photostripImage: {
//     width: '100%',
//     height: '100%',
//   },
//   grayscaleOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#888888',
//     opacity: 0.4,
//     mixBlendMode: 'saturation',
//   },
//   stripFooter: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   stripFooterLine: {
//     width: '60%',
//     height: 2,
//     backgroundColor: '#fff',
//     opacity: 0.7,
//   },
//   actionButtonsContainer: {
//     width: '100%',
//     paddingHorizontal: 20,
//     gap: 15,
//   },
//   actionButton: {
//     paddingVertical: 15,
//     borderRadius: 25,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   actionButtonDisabled: {
//     opacity: 0.7,
//   },
//   actionButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   retakeButton: {
//     paddingVertical: 15,
//     borderRadius: 25,
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#8B7355',
//     backgroundColor: 'transparent',
//   },
//   retakeButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });




// import * as MediaLibrary from 'expo-media-library'; // this is for saving images in the gallery 
// import { router, useLocalSearchParams } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//     Alert,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
//     Image,
// } from 'react-native';
// import ViewShot from 'react-native-view-shot';
// import { usePhotos } from '../contexts/PhotoContext';
// import BlackWhiteImage from '../components/BlackWhiteImage'; 

// export default function PreviewScreen() {
//   const { capturedImages } = usePhotos();
//   const params = useLocalSearchParams();
//   const viewShotRef = useRef<ViewShot>(null);
//   const [isSaving, setIsSaving] = useState(false);
  
//   const stripColor = params.stripColor as string || '#8B7355';
//   const backgroundColor = params.backgroundColor as string || '#f5f5f0';
//   const showDateStamp = params.showDateStamp === 'true';
//   const blackAndWhite = params.blackAndWhite === 'true';
//   const customText = params.customText as string || '';


//   const goBackToCustomize = () => {
//     router.back();
//   };

//   const requestPermissions = async () => {
//     const { status } = await MediaLibrary.requestPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert(
//         'Permission Required',
//         'Please grant permission to save photos to your gallery.',
//         [{ text: 'OK' }]
//       );
//       return false;
//     }
//     return true;
//   };

//   const saveToGallery = async () => {
//     if (isSaving) return;
    
//     setIsSaving(true);
    
//     try {
//       // Request permissions first
//       const hasPermission = await requestPermissions();
//       if (!hasPermission) {
//         setIsSaving(false);
//         return;
//       }

//       // Capture the photostrip view
//       const uri = await viewShotRef.current?.capture();
      
//       if (uri) {
//         // Save to gallery
//         await MediaLibrary.saveToLibraryAsync(uri);
        
//         Alert.alert(
//           'Success!',
//           'Your photostrip has been saved to your gallery.',
//           [{ text: 'OK' }]
//         );
//       } else {
//         throw new Error('Failed to capture image');
//       }
//     } catch (error) {
//       console.error('Error saving photostrip:', error);
//       Alert.alert(
//         'Error',
//         'Failed to save photostrip. Please try again.',
//         [{ text: 'OK' }]
//       );
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const getCurrentDate = () => {
//     const now = new Date();
//     return now.toLocaleDateString('en-US', { 
//       month: 'short', 
//       day: 'numeric', 
//       year: 'numeric' 
//     });
//   };

//   return (
//     <View style={[styles.container, { backgroundColor }]}>
      
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={goBackToCustomize}>
//           <Text style={styles.backButtonText}>← Back</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Your Photostrip</Text>
//         <View style={styles.placeholder} />
//       </View>

      
//       <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//         <View style={styles.photostripContainer}>
          
          
//           <ViewShot 
//             ref={viewShotRef}
//             options={{
//               format: 'jpg',
//               quality: 0.9,
//               result: 'tmpfile',
//             }}
//             style={styles.viewShotContainer}
//           >
//             <View style={[styles.photostrip, { backgroundColor: stripColor }]}>
              
              
//               <View style={styles.stripHeader}>
//                 <Text style={styles.customText}>{customText}</Text>
//                 {showDateStamp && (
//                   <Text style={styles.dateText}>{getCurrentDate()}</Text>
//                 )}
//               </View>

              
//               <View style={styles.photosContainer}>
//                 {capturedImages.map((imageUri, index) => (
//                   <View key={index} style={styles.photoFrame}>
//                     {blackAndWhite ? (
//                       <BlackWhiteImage
//                         imageUri={imageUri}
//                         width={270}
//                         height={144}
//                         style={styles.skiaImage}
//                       />
//                     ) : (
//                       <View>
//                         <Image
//                           source={{ uri: imageUri }}
//                           style={styles.colorImage}
//                           resizeMode="cover"
//                         />
//                       </View>
//                     )}
//                   </View>
//                 ))}
//               </View>

              
//               <View style={styles.stripFooter}>
//                 <View style={styles.stripFooterLine} />
//               </View>
//             </View>
//           </ViewShot>

//           {/* Action Buttons - Outside of ViewShot so they don't get captured */}
//           <View style={styles.actionButtonsContainer}>
//             <TouchableOpacity
//               style={[
//                 styles.actionButton, 
//                 { backgroundColor: stripColor },
//                 isSaving && styles.actionButtonDisabled
//               ]}
//               onPress={saveToGallery}
//               disabled={isSaving}
//             >
//               <Text style={styles.actionButtonText}>
//                 {isSaving ? 'Saving...' : 'Save'}
//               </Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={styles.retakeButton}
//               onPress={() => router.push('/')}
//             >
//               <Text style={[styles.retakeButtonText, { color: stripColor }]}>Take New Photos</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   colorImage: {
//     width: '100%',
//     height: '100%', 
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 50,
//     paddingBottom: 20,
//   },
//   backButton: {
//     backgroundColor: '#333',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   backButtonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#8B7355',
//   },
//   placeholder: {
//     width: 60,
//   },
//   scrollContainer: {
//     alignItems: 'center',
//     paddingBottom: 40,
//   },
//   photostripContainer: {
//     alignItems: 'center',
//   },
//   viewShotContainer: {
//     backgroundColor: 'transparent',
//   },
//   photostrip: {
//     width: 300,
//     borderRadius: 15,
//     paddingVertical: 20,
//     paddingHorizontal: 15,
//     marginBottom: 30,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   stripHeader: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   customText: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   dateText: {
//     color: '#fff',
//     fontSize: 14,
//     textAlign: 'center',
//     opacity: 0.9,
//   },
//   photosContainer: {
//     gap: 10,
//   },
//   photoFrame: {
//     width: '100%',
//     height: 150,
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#fff',
    
//     padding: 3,
//   },
//   skiaImage: {
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   stripFooter: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   stripFooterLine: {
//     width: '60%',
//     height: 2,
//     backgroundColor: '#fff',
//     opacity: 0.7,
//   },
//   actionButtonsContainer: {
//     width: '100%',
//     paddingHorizontal: 20,
//     gap: 15,
//   },
//   actionButton: {
//     paddingVertical: 15,
//     borderRadius: 25,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   actionButtonDisabled: {
//     opacity: 0.7,
//   },
//   actionButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   retakeButton: {
//     paddingVertical: 15,
//     borderRadius: 25,
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#8B7355',
//     backgroundColor: 'transparent',
//   },
//   retakeButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });



import * as MediaLibrary from 'expo-media-library';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import { usePhotos } from '../contexts/PhotoContext';
import BlackWhiteImage from '../components/BlackWhiteImage'; 
import Svg, { Path, Line } from 'react-native-svg';

export default function PreviewScreen() {
  const { capturedImages } = usePhotos();
  const params = useLocalSearchParams();
  const viewShotRef = useRef<ViewShot>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const stripColor = params.stripColor as string || '#8B7355';
  const backgroundColor = params.backgroundColor as string || '#ffffff';
  const showDateStamp = params.showDateStamp === 'true';
  const blackAndWhite = params.blackAndWhite === 'true';
  const customText = params.customText as string || '';

  const goBackToCustomize = () => {
    router.back();
  };

  const requestPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant permission to save photos to your gallery.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const saveToGallery = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        setIsSaving(false);
        return;
      }

      const uri = await viewShotRef.current?.capture();
      
      if (uri) {
        await MediaLibrary.saveToLibraryAsync(uri);
        
        Alert.alert(
          'Success!',
          'Your photostrip has been saved to your gallery.',
          [{ text: 'OK' }]
        );
      } else {
        throw new Error('Failed to capture image');
      }
    } catch (error) {
      console.error('Error saving photostrip:', error);
      Alert.alert(
        'Error',
        'Failed to save photostrip. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSaving(false);
    }
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBackToCustomize}>
          <Svg style={styles.backArrow} width="28" height="24" viewBox="0 0 28 24" fill="none">
            <Path d="M11.2398 0.345584L0 11.6438L11.2398 22.9421C11.3413 23.0754 11.4702 23.1853 11.6179 23.2644C11.7656 23.3436 11.9286 23.39 12.0958 23.4007C12.263 23.4114 12.4306 23.386 12.5871 23.3263C12.7437 23.2666 12.8856 23.1739 13.0032 23.0546C13.1208 22.9353 13.2114 22.7921 13.2689 22.6347C13.3264 22.4773 13.3494 22.3094 13.3363 22.1423C13.3233 21.9753 13.2745 21.813 13.1932 21.6665C13.112 21.5199 13.0002 21.3925 12.8655 21.2929L4.45614 12.8134L26.8304 12.8134C27.1406 12.8134 27.4381 12.6902 27.6574 12.4709C27.8768 12.2515 28 11.954 28 11.6438C28 11.3336 27.8768 11.0361 27.6574 10.8168C27.4381 10.5975 27.1406 10.4742 26.8304 10.4742L4.45614 10.4742L12.8655 1.99471C13.0842 1.77447 13.2064 1.47638 13.2053 1.16601C13.2042 0.855642 13.0799 0.558422 12.8596 0.339734C12.6394 0.121047 12.3413 -0.00119377 12.031 -9.70724e-05C11.7206 0.000999625 11.4234 0.125345 11.2047 0.345584H11.2398Z" fill="black"/>
          </Svg>
        </TouchableOpacity>
        {/* <View style={styles.placeholder} /> */}
      </View>

      
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>your photostrip</Text>
      </View>

      
      
        <View style={styles.photostripContainer}>
          <ViewShot 
            ref={viewShotRef}
            options={{
              format: 'jpg',
              quality: 0.9,
              result: 'tmpfile',
            }}
            style={styles.viewShotContainer}
          >
            <View style={[styles.photostrip, { backgroundColor: stripColor }]}>
              
              <View style={styles.photosContainer}>
                {capturedImages.map((imageUri, index) => (
                  <View key={index} style={styles.photoFrame}>
                    {blackAndWhite ? (
                      <BlackWhiteImage
                        imageUri={imageUri}
                        width={200}
                        height={120}
                        style={styles.skiaImage}
                      />
                    ) : (
                      <Image
                        source={{ uri: imageUri }}
                        style={styles.colorImage}
                        resizeMode="cover"
                      />
                    )}
                  </View>
                ))}
              </View>

              {/* Strip Footer with custom text and date */}
              <View style={styles.stripFooter}>
                {customText && (
                  <Text style={styles.customText}>{customText}</Text>
                )}
                {showDateStamp && (
                  <Text style={styles.dateText}>{getCurrentDate()}</Text>
                )}
              </View>
            </View>
          </ViewShot>
        </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.makeNewButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.makeNewButtonText}>take new pics</Text>
          <Svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <Path d="M12.353 9.84902L12.0196 0.642482L2.81147 0.928064C2.71511 0.918301 2.61777 0.929355 2.52605 0.96048C2.43433 0.991604 2.35037 1.04207 2.27985 1.10847C2.20933 1.17486 2.1539 1.25563 2.11731 1.34531C2.08072 1.43499 2.06383 1.53149 2.06777 1.62826C2.07172 1.72504 2.09641 1.81984 2.14018 1.90624C2.18394 1.99264 2.24576 2.06864 2.32145 2.12907C2.39714 2.1895 2.48493 2.23297 2.57888 2.25653C2.67283 2.28008 2.77074 2.28318 2.86599 2.2656L9.76649 2.06237L0.933264 11.51C0.810801 11.641 0.745386 11.8153 0.75141 11.9945C0.757433 12.1737 0.834402 12.3432 0.965384 12.4657C1.09637 12.5881 1.27063 12.6535 1.44984 12.6475C1.62906 12.6415 1.79853 12.5645 1.921 12.4335L10.7542 2.98586L11.0148 9.88444C11.0215 10.0637 11.0991 10.233 11.2306 10.3551C11.362 10.4772 11.5366 10.542 11.7159 10.5353C11.8952 10.5287 12.0645 10.4511 12.1866 10.3196C12.3087 10.1881 12.3735 10.0135 12.3668 9.83421L12.353 9.84902Z" fill="black"/>
          </Svg>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.saveButton,
            isSaving && styles.saveButtonDisabled
          ]}
          onPress={saveToGallery}
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? 'SAVING...' : 'SAVE'}
          </Text>
          <Svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <Path d="M12.353 9.84902L12.0196 0.642482L2.81147 0.928064C2.71511 0.918301 2.61777 0.929355 2.52605 0.96048C2.43433 0.991604 2.35037 1.04207 2.27985 1.10847C2.20933 1.17486 2.1539 1.25563 2.11731 1.34531C2.08072 1.43499 2.06383 1.53149 2.06777 1.62826C2.07172 1.72504 2.09641 1.81984 2.14018 1.90624C2.18394 1.99264 2.24576 2.06864 2.32145 2.12907C2.39714 2.1895 2.48493 2.23297 2.57888 2.25653C2.67283 2.28008 2.77074 2.28318 2.86599 2.2656L9.76649 2.06237L0.933264 11.51C0.810801 11.641 0.745386 11.8153 0.75141 11.9945C0.757433 12.1737 0.834402 12.3432 0.965384 12.4657C1.09637 12.5881 1.27063 12.6535 1.44984 12.6475C1.62906 12.6415 1.79853 12.5645 1.921 12.4335L10.7542 2.98586L11.0148 9.88444C11.0215 10.0637 11.0991 10.233 11.2306 10.3551C11.362 10.4772 11.5366 10.542 11.7159 10.5353C11.8952 10.5287 12.0645 10.4511 12.1866 10.3196C12.3087 10.1881 12.3735 10.0135 12.3668 9.83421L12.353 9.84902Z" fill="white"/>
          </Svg>
        </TouchableOpacity>
      </View>

      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginHorizontal: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#B8B8B8',
  },
  backButton: {
    padding: 10,
  },
  titleSection: {
    paddingVertical: 25,
  },
  mainTitle: {
    fontSize: 48,
    color: '#000',
    fontFamily: 'grotesk',
    textTransform: 'uppercase',
  },
  photostripContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    transform: [{ scale: 0.95 }],
    //  borderColor: '#B8B8B8',
    // borderWidth: 2,
  },
  viewShotContainer: {
    backgroundColor: 'transparent',
  },
  photostrip: {
    width: 220,
    borderRadius: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  photosContainer: {
    gap: 8,
  },
  photoFrame: {
    width: 200,
    height: 120,
    borderRadius: 0,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  colorImage: {
    width: '100%',
    height: '100%',
  },
  skiaImage: {
    borderRadius: 0,
  },
  stripFooter: {
    alignItems: 'flex-end',
    marginTop: 15,
    minHeight: 40,
    justifyContent: 'center',
  },
  customText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'grotesk',
    textTransform: 'uppercase',
  },
  dateText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'grotesk',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    
    gap: 15,
    
  },
  makeNewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    backgroundColor: 'transparent',
    gap: 8,
  },
  makeNewButtonText: {
    color: '#000',
    fontSize: 17,
    fontFamily: 'grotesk',
    textTransform: 'uppercase',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    // paddingVertical: 12,
    // paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#000',
    gap: 8,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'grotesk',
    textTransform: 'uppercase',
    fontWeight: 'normal',
  },
  bottomSvgContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});