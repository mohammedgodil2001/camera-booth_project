import * as MediaLibrary from 'expo-media-library';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import CustomButton from '../components/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';

import { usePhotoStore } from '../stores/photoStore';
import BlackWhiteImage from '../components/BlackWhiteImage'; 


export default function PreviewScreen() {
  
  const capturedImages = usePhotoStore(state => state.capturedImages);
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

      <View style={styles.newContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBackToCustomize}>
            <Ionicons name="arrow-back" size={35}/>
          </TouchableOpacity>
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

        
        <View style={styles.actionButtonsContainer}>
          <CustomButton
            title="take new pics"
            onPress={() => router.push('/')}
            style={styles.makeNewButton}
            textStyle={styles.makeNewButtonText}
            arrowColor="#000"
            checkPhotoLimit={false}
          />
          <CustomButton
            title="save"
            onPress={saveToGallery}
            loading={isSaving}
            loadingText="saving..."
            style={styles.saveButton}
            textStyle={styles.saveButtonText}
            disabledStyle={styles.saveButtonDisabled}
            arrowColor="#fff"
            checkPhotoLimit={false}
          />
        </View>
      </View>
      

      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ffffff',
  },
  newContainer: {
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    transform: [{ scale: 0.95 }],
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
    justifyContent: 'flex-end',
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
    paddingVertical: 20,
    gap: 15,
    alignSelf : 'flex-end',
    
  },
  makeNewButton: {
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