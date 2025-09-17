import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import { Alert, Button, Image, StyleSheet, View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [currentPhotoNumber, setCurrentPhotoNumber] = useState(1);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

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
      setCameraPermission(true);
      setShowCameraModal(true);
      setCapturedImages([]);
      setCurrentPhotoNumber(1);
    }
  };

  const startCountdown = () => {
    setIsCountingDown(true);
    setCountdown(4);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isCountingDown && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (isCountingDown && countdown === 0) {
      // Take photo
      takePhoto();
      setIsCountingDown(false);
    }

    return () => clearInterval(interval);
  }, [countdown, isCountingDown]);

  const takePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        const newImage = result.assets[0].uri;
        setCapturedImages(prev => [...prev, newImage]);
        
        if (currentPhotoNumber < 3) {
          // Prepare for next photo
          setCurrentPhotoNumber(prev => prev + 1);
          setTimeout(() => {
            startCountdown();
          }, 1000);
        } else {
          // All photos taken
          setTimeout(() => {
            setShowCameraModal(false);
            Alert.alert(
              'Photos Captured!',
              'All 3 photos have been taken. Click "See Pics" to view them.',
              [{ text: 'OK' }]
            );
          }, 1000);
        }
      }
    } catch (error) {
      console.log('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const closeCameraModal = () => {
    setShowCameraModal(false);
    setIsCountingDown(false);
    setCountdown(0);
    setCurrentPhotoNumber(1);
    setCameraPermission(false);
  };

  const showImageGallery = () => {
    if (capturedImages.length > 0) {
      setShowGallery(true);
    } else {
      Alert.alert('No Photos', 'No photos have been captured yet.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Upload Photo" onPress={pickImageFromGallery} />
      <View style={styles.buttonSpacing} />
      <Button title="Use Camera" onPress={startCameraFlow} />
      <View style={styles.buttonSpacing} />
      <Button 
        title={`See Pics (${capturedImages.length})`} 
        onPress={showImageGallery}
        disabled={capturedImages.length === 0}
      />

      {image && <Image source={{ uri: image }} style={styles.image} />}

      {/* Camera Permission and Countdown Modal */}
      <Modal
        visible={showCameraModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {!isCountingDown ? (
              <>
                <Text style={styles.modalTitle}>Camera Ready</Text>
                <Text style={styles.modalText}>
                  Ready to take photo {currentPhotoNumber} of 3?
                </Text>
                <Text style={styles.instructionText}>
                  Be ready for photo {currentPhotoNumber}!
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={styles.startButton} 
                    onPress={startCountdown}
                  >
                    <Text style={styles.buttonText}>Start Countdown</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.cancelButton} 
                    onPress={closeCameraModal}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.photoNumberText}>
                  Photo {currentPhotoNumber} of 3
                </Text>
                <Text style={styles.countdownText}>{countdown}</Text>
                <Text style={styles.readyText}>
                  Be ready for photo {currentPhotoNumber}!
                </Text>
              </>
            )}
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
            <Text style={styles.galleryTitle}>Captured Photos</Text>
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
  },
  buttonSpacing: {
    height: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
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
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  instructionText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 25,
    color: '#007AFF',
  },
  photoNumberText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  countdownText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 20,
  },
  readyText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#007AFF',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  startButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    minWidth: 120,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    minWidth: 120,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
  imageLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  galleryImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});