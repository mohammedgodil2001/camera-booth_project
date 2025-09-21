import * as MediaLibrary from 'expo-media-library';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import { usePhotos } from '../contexts/PhotoContext';

export default function PreviewScreen() {
  const { capturedImages } = usePhotos();
  const params = useLocalSearchParams();
  const viewShotRef = useRef<ViewShot>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const stripColor = params.stripColor as string || '#8B7355';
  const backgroundColor = params.backgroundColor as string || '#f5f5f0';
  const showDateStamp = params.showDateStamp === 'true';
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
      // Request permissions first
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        setIsSaving(false);
        return;
      }

      // Capture the photostrip view
      const uri = await viewShotRef.current?.capture();
      
      if (uri) {
        // Save to gallery
        const asset = await MediaLibrary.saveToLibraryAsync(uri);
        
        Alert.alert(
          'Success!',
          'Your photostrip has been saved to your gallery.',
          [
            { text: 'OK' },
          ]
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBackToCustomize}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Photostrip</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Photostrip Container */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.photostripContainer}>
          
          {/* This ViewShot wrapper captures everything inside it */}
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
              
              {/* Header Section with Text and Date */}
              <View style={styles.stripHeader}>
                <Text style={styles.customText}>{customText}</Text>
                {showDateStamp && (
                  <Text style={styles.dateText}>{getCurrentDate()}</Text>
                )}
              </View>

              {/* Photos Section */}
              <View style={styles.photosContainer}>
                {capturedImages.map((imageUri, index) => (
                  <View key={index} style={styles.photoFrame}>
                    <View style={styles.bwImageContainer}>
                      <Image 
                        source={{ uri: imageUri }} 
                        style={styles.photostripImage}
                        resizeMode="cover"
                      />
                      <View style={styles.grayscaleOverlay} />
                    </View>
                  </View>
                ))}
              </View>

              {/* Footer */}
              <View style={styles.stripFooter}>
                <View style={styles.stripFooterLine} />
              </View>
            </View>
          </ViewShot>

          {/* Action Buttons - Outside of ViewShot so they don't get captured */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton, 
                { backgroundColor: stripColor },
                isSaving && styles.actionButtonDisabled
              ]}
              onPress={saveToGallery}
              disabled={isSaving}
            >
              <Text style={styles.actionButtonText}>
                {isSaving ? 'Saving...' : 'Save & Share'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={() => router.push('/')}
            >
              <Text style={[styles.retakeButtonText, { color: stripColor }]}>Take New Photos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B7355',
  },
  placeholder: {
    width: 60,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  photostripContainer: {
    alignItems: 'center',
  },
  viewShotContainer: {
    backgroundColor: 'transparent',
  },
  photostrip: {
    width: 300,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  stripHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  customText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  dateText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.9,
  },
  photosContainer: {
    gap: 10,
  },
  photoFrame: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    padding: 3,
  },
  bwImageContainer: {
    flex: 1,
    position: 'relative',
    borderRadius: 5,
    overflow: 'hidden',
  },
  photostripImage: {
    width: '100%',
    height: '100%',
  },
  grayscaleOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#888888',
    opacity: 0.4,
    mixBlendMode: 'saturation',
  },
  stripFooter: {
    alignItems: 'center',
    marginTop: 20,
  },
  stripFooterLine: {
    width: '60%',
    height: 2,
    backgroundColor: '#fff',
    opacity: 0.7,
  },
  actionButtonsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    gap: 15,
  },
  actionButton: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  actionButtonDisabled: {
    opacity: 0.7,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  retakeButton: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8B7355',
    backgroundColor: 'transparent',
  },
  retakeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});