import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Switch, 
  ScrollView,
  Alert 
} from 'react-native';
import { router } from 'expo-router';
import { usePhotos } from '../contexts/PhotoContext';

interface CustomizationOptions {
  stripColor: string;
  backgroundColor: string;
  showDateStamp: boolean;
  blackAndWhite: boolean;
  customText: string;
}

export default function CustomizeScreen() {
  const { capturedImages } = usePhotos();
  
  const [customization, setCustomization] = useState<CustomizationOptions>({
    stripColor: '#8B7355', 
    backgroundColor: '#f5f5f0', 
    showDateStamp: true,
    blackAndWhite: true,
    customText: ''
  });

  
  const stripColors = [
    { color: '#8B7355', name: 'Brown' },
    { color: '#9B7CB6', name: 'Purple' },
    { color: '#E8A5A5', name: 'Pink' },
    { color: '#2C2C2C', name: 'Black' }
  ];

  // Background color options
  const backgroundColors = [
    { color: '#f5f5f0', name: 'Cream' },
    { color: '#E8F4F8', name: 'Light Blue' },
    { color: '#F8E8F0', name: 'Light Pink' },
    { color: '#F0F8E8', name: 'Light Green' }
  ];

  const goBackToUpload = () => {
    router.back();
  };

  const navigateToPreview = () => {
    if (!customization.customText.trim()) {
      Alert.alert(
        'Add Your Name',
        'Please add your name or custom text for the photostrip.',
        [{ text: 'OK' }]
      );
      return;
    }

    router.push({
      pathname: '/preview',
      params: {
        stripColor: customization.stripColor,
        backgroundColor: customization.backgroundColor,
        showDateStamp: customization.showDateStamp.toString(),
        customText: customization.customText,
        blackAndWhite: customization.blackAndWhite.toString()
      }
    });
  };

  const updateStripColor = (color: string) => {
    setCustomization(prev => ({ ...prev, stripColor: color }));
  };

  const updateBackgroundColor = (color: string) => {
    setCustomization(prev => ({ ...prev, backgroundColor: color }));
  };

  const toggleDateStamp = () => {
    setCustomization(prev => ({ ...prev, showDateStamp: !prev.showDateStamp }));
  };

  const updateCustomText = (text: string) => {
    setCustomization(prev => ({ ...prev, customText: text }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <TouchableOpacity style={styles.backButton} onPress={goBackToUpload}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.mainTitle}>Customize your photostrip</Text>

      {/* Photo count indicator */}
      <View style={styles.photoCountContainer}>
        <Text style={styles.photoCountText}>
          Ready to create strip with {capturedImages.length} photo{capturedImages.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Photostrip Color Selection */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Photostrip</Text>
        <View style={styles.colorOptionsContainer}>
          {stripColors.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorOption,
                { borderColor: option.color },
                customization.stripColor === option.color && styles.selectedColorOption
              ]}
              onPress={() => updateStripColor(option.color)}
            >
              <View style={[styles.colorCircle, { backgroundColor: option.color }]}>
                {customization.stripColor === option.color && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Background Color Selection */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Background</Text>
        <View style={styles.colorOptionsContainer}>
          {backgroundColors.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorOption,
                { borderColor: option.color === '#f5f5f0' ? '#8B7355' : option.color },
                customization.backgroundColor === option.color && styles.selectedColorOption
              ]}
              onPress={() => updateBackgroundColor(option.color)}
            >
              <View style={[styles.colorCircle, { backgroundColor: option.color }]}>
                {customization.backgroundColor === option.color && (
                  <Text style={[styles.checkmark, { color: option.color === '#f5f5f0' ? '#8B7355' : '#fff' }]}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Custom Text Input */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Add your name</Text>
        <TextInput
          style={styles.textInput}
          value={customization.customText}
          onChangeText={updateCustomText}
          placeholder="Enter your name or custom text"
          placeholderTextColor="#999"
          maxLength={30}
        />
        <Text style={styles.characterCount}>
          {customization.customText.length}/30 characters
        </Text>
      </View>

      {/* Date Stamp Toggle */}
      <View style={styles.sectionContainer}>
        <View style={styles.toggleContainer}>
          <View style={styles.toggleTextContainer}>
            <Text style={styles.sectionTitle}>Display date stamp</Text>
            <Text style={styles.toggleDescription}>
              Show todays date on your photostrip
            </Text>
          </View>
          <Switch
            value={customization.showDateStamp}
            onValueChange={toggleDateStamp}
            trackColor={{ false: '#ccc', true: customization.stripColor }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <View>
        {/* Black & White Toggle */}
        <View style={styles.sectionContainer}>
          <View style={styles.toggleContainer}>
            <View style={styles.toggleTextContainer}>
              <Text style={styles.sectionTitle}>Black & White</Text>
              <Text style={styles.toggleDescription}>
                Apply a classic black and white filter to your photos
              </Text>
            </View>
            <Switch
              value={customization.blackAndWhite}
              onValueChange={() => setCustomization(prev => ({ ...prev, blackAndWhite: !prev.blackAndWhite }))}
              trackColor={{ false: '#ccc', true: customization.stripColor }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </View>

      {/* Preview Section */}
      {/* <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>Preview</Text>
        <View style={[styles.miniPreview, { backgroundColor: customization.backgroundColor }]}>
          <View style={[styles.miniStrip, { backgroundColor: customization.stripColor }]}>
            <Text style={styles.miniStripText}>
              {customization.customText || 'Your Name'}
            </Text>
            {customization.showDateStamp && (
              <Text style={styles.miniDateText}>
                {new Date().toLocaleDateString()}
              </Text>
            )}
          </View>
          <View style={styles.miniPhotos}>
            {[1, 2, 3].map((num) => (
              <View key={num} style={styles.miniPhoto} />
            ))}
          </View>
        </View>
      </View> */}

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          { backgroundColor: customization.stripColor },
          !customization.customText.trim() && styles.continueButtonDisabled
        ]}
        onPress={navigateToPreview}
        disabled={!customization.customText.trim()}
      >
        <Text style={styles.continueButtonText}>
          Create My Photostrip
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f0',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginTop: 40,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B7355',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  photoCountContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  photoCountText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B7355',
    marginBottom: 15,
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  colorOption: {
    padding: 4,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColorOption: {
    borderWidth: 3,
  },
  colorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkmark: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#8B7355',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'right',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8B7355',
  },
  toggleTextContainer: {
    flex: 1,
  },
  toggleDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  previewContainer: {
    marginBottom: 30,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B7355',
    marginBottom: 15,
    textAlign: 'center',
  },
  miniPreview: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8B7355',
  },
  miniStrip: {
    width: 80,
    height: 120,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginRight: 15,
  },
  miniStripText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  miniDateText: {
    color: '#fff',
    fontSize: 8,
    textAlign: 'center',
  },
  miniPhotos: {
    flex: 1,
  },
  miniPhoto: {
    height: 30,
    backgroundColor: '#ddd',
    marginBottom: 5,
    borderRadius: 4,
  },
  continueButton: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});