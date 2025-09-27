import React, { useState, useRef } from 'react';
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
import Svg, { Path } from 'react-native-svg';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CustomizationOptions {
  stripColor: string;
  backgroundColor: string;
  showDateStamp: boolean;
  blackAndWhite: boolean;
  customText: string;
}

export default function CustomizeScreen() {
  const [customization, setCustomization] = useState<CustomizationOptions>({
    stripColor: '#8B7355', 
    backgroundColor: '#f5f5f0', 
    showDateStamp: true,
    blackAndWhite: true,
    customText: ''
  });

  const textInputRef = useRef<TextInput>(null);

  const stripColors = [
    { color: '#8B7355', name: 'Brown' },
    { color: '#9B7CB6', name: 'Purple' },
    { color: '#E8A5A5', name: 'Pink' },
    { color: '#2C2C2C', name: 'Black' }
  ];

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

  const toggleBlackAndWhite = () => {
    setCustomization(prev => ({ ...prev, blackAndWhite: !prev.blackAndWhite }));
  };

  const updateCustomText = (text: string) => {
    setCustomization(prev => ({ ...prev, customText: text }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBackToUpload}>
          <Ionicons name="arrow-back" size={35}/>
        </TouchableOpacity>
      </View>

      
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>customise photo strip</Text>
      </View>

      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>photo strip</Text>
        <View style={styles.colorOptionsContainer}>
          {stripColors.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorOption,
              ]}
              onPress={() => updateStripColor(option.color)}
            >
              <View style={[styles.colorCircle, { backgroundColor: option.color }]}>
                {customization.stripColor === option.color && (
                  <Text style={styles.checkmark}>
                    <Ionicons name="checkmark" size={24}  />
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.sectionUnderline} />
      </View>

      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>background</Text>
        <View style={styles.colorOptionsContainer}>
          {backgroundColors.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorOption,
              ]}
              onPress={() => updateBackgroundColor(option.color)}
            >
              <View style={[styles.colorCircle, { backgroundColor: option.color }]}>
                {customization.backgroundColor === option.color && (
                  <Text style={[
                    styles.checkmark, 
                    { color: option.color === '#f5f5f0' ? '#8B7355' : '#000' }
                  ]}>
                    <Ionicons name="checkmark" size={24}  />
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.sectionUnderline} />
      </View>

      
      
      <View style={styles.sectionContainer}>
        <TouchableOpacity 
          onPress={() => textInputRef.current?.focus()}
          activeOpacity={1}
        >
          <Text style={styles.sectionTitle}>ADD YOUR NAME</Text>
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            value={customization.customText}
            onChangeText={updateCustomText}
            placeholder=""
            placeholderTextColor="#999"
            maxLength={30}
          />
        </TouchableOpacity>
        <View style={styles.sectionUnderline} />
      </View>

      
      <View style={styles.sectionContainer}>
        <View style={styles.toggleRow}>
          <Text style={styles.sectionTitle}>DATE STAMP</Text>
          <Switch
            value={customization.showDateStamp}
            onValueChange={toggleDateStamp}
            trackColor={{ false: '#ccc', true: '#000' }}
            thumbColor="#fff"
            style={styles.switch}
          />
        </View>
        <View style={styles.sectionUnderline} />
      </View>

      
      <View style={styles.sectionContainer}>
        <View style={styles.toggleRow}>
          <Text style={styles.sectionTitle}>BLACK & WHITE</Text>
          <Switch
            value={customization.blackAndWhite}
            onValueChange={toggleBlackAndWhite}
            trackColor={{ false: '#ccc', true: '#000' }}
            thumbColor="#fff"
            style={styles.switch}
          />
        </View>
        <View style={styles.sectionUnderline} />
      </View>

      
      <TouchableOpacity
        style={[
          styles.continueButton,
          !customization.customText.trim() && styles.continueButtonDisabled
        ]}
        onPress={navigateToPreview}
        disabled={!customization.customText.trim()}
      >
        <Text style={[
          styles.continueButtonText,
          !customization.customText.trim() && styles.continueButtonTextDisabled
        ]}>
          create my photostrip
        </Text>
        <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" >
          <Path d="M12.353 9.84902L12.0196 0.642482L2.81147 0.928064C2.71511 0.918301 2.61777 0.929355 2.52605 0.96048C2.43433 0.991604 2.35037 1.04207 2.27985 1.10847C2.20933 1.17486 2.1539 1.25563 2.11731 1.34531C2.08072 1.43499 2.06383 1.53149 2.06777 1.62826C2.07172 1.72504 2.09641 1.81984 2.14018 1.90624C2.18394 1.99264 2.24576 2.06864 2.32145 2.12907C2.39714 2.1895 2.48493 2.23297 2.57888 2.25653C2.67283 2.28008 2.77074 2.28318 2.86599 2.2656L9.76649 2.06237L0.933264 11.51C0.810801 11.641 0.745386 11.8153 0.75141 11.9945C0.757433 12.1737 0.834402 12.3432 0.965384 12.4657C1.09637 12.5881 1.27063 12.6535 1.44984 12.6475C1.62906 12.6415 1.79853 12.5645 1.921 12.4335L10.7542 2.98586L11.0148 9.88444C11.0215 10.0637 11.0991 10.233 11.2306 10.3551C11.362 10.4772 11.5366 10.542 11.7159 10.5353C11.8952 10.5287 12.0645 10.4511 12.1866 10.3196C12.3087 10.1881 12.3735 10.0135 12.3668 9.83421L12.353 9.84902Z" 
          fill={!customization.customText.trim() ? "#ccc" : "#000"}/>
        </Svg>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#B8B8B8',
  },
  backButton: {
    padding: 10,
    alignSelf: 'flex-start',
  },
  titleSection: {
    marginBottom: 40,
    paddingTop: 25,
  },
  mainTitle: {
    fontSize: 50,
    color: '#000',
    fontFamily: 'grotesk',
    textTransform: 'uppercase',
    borderBottomWidth: 2,
    borderBottomColor: '#B8B8B8',
    paddingBottom: 25,
  },
  sectionContainer: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 21,
    color: '#000',
    fontFamily: 'grotesk',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  colorOption: {
    padding: 2,
  },
  colorCircle: {
    width: 65,
    height: 65,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  checkmark: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
    fontSize: 18,
    color: '#000',
    fontFamily: 'grotesk',
    marginBottom: 10,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  sectionUnderline: {
    height: 2,
    backgroundColor: '#B8B8B8',
    width: '100%',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    marginTop: 40,
    gap: 15,
  },
  continueButtonDisabled: {
    borderColor: '#ccc',
  },
  continueButtonText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'grotesk',
    textTransform: 'uppercase',
  },
  continueButtonTextDisabled: {
    color: '#ccc',
  },
});