import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Alert 
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { usePhotos } from '../contexts/PhotoContext';

export default function PreviewScreen() {
  const { capturedImages } = usePhotos();
  const params = useLocalSearchParams();
  
  const stripColor = params.stripColor as string || '#8B7355';
  const backgroundColor = params.backgroundColor as string || '#f5f5f0';
  const showDateStamp = params.showDateStamp === 'true';
  const customText = params.customText as string || '';

  const goBackToCustomize = () => {
    router.back();
  };

  const sharePhotostrip = () => {
    Alert.alert(
      'Share Photostrip',
      'Photostrip saved! You can now share it with friends.',
      [{ text: 'OK' }]
    );
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
              
              {/* Fill empty slots if less than 3 photos */}
              {Array.from({ length: Math.max(0, 3 - capturedImages.length) }).map((_, index) => (
                <View key={`empty-${index}`} style={styles.photoFrame}>
                  <View style={styles.emptyPhoto}>
                    <Text style={styles.emptyPhotoText}>No Photo</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Footer */}
            <View style={styles.stripFooter}>
              <View style={styles.stripFooterLine} />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: stripColor }]}
              onPress={sharePhotostrip}
            >
              <Text style={styles.actionButtonText}>Save & Share</Text>
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
    width: 60, // Same width as back button for centering
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  photostripContainer: {
    alignItems: 'center',
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
  emptyPhoto: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  emptyPhotoText: {
    color: '#999',
    fontSize: 12,
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