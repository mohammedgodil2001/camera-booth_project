import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { usePhotoStore } from '../stores/photoStore';
import Svg, { Line } from 'react-native-svg';
import CustomButton from '../components/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';



export default function UploadScreen() {
 
  const capturedImages = usePhotoStore(state => state.capturedImages);
  const replaceImage = usePhotoStore(state => state.replaceImage);
  const removeImage = usePhotoStore(state => state.removeImage);
  const canAddMore = usePhotoStore(state => state.canAddMore());
  const MAX_IMAGES = usePhotoStore(state => state.MAX_IMAGES);

  const selectPhotoForBox = async (boxIndex: number) => {
    if (!canAddMore) {
      Alert.alert(
        'Maximum Photos Reached',
        `You can only have ${MAX_IMAGES} photos total. Please remove some photos first.`
      );
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImage = result.assets[0].uri;
        replaceImage(boxIndex, newImage);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const removePhoto = (index: number) => {
    Alert.alert(
      'Remove Photo',
      'Are you sure you want to remove this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => removeImage(index)
        }
      ]
    );
  };

  const navigateToCustomize = () => {
    router.push('/customize');
  };

  const goBackToHome = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={goBackToHome}
        >
          <Ionicons name="arrow-back" size={35}/>
        </TouchableOpacity>
        
        <View style={styles.photoCounter}>
          <Text style={styles.counterText}>{capturedImages.length}/{MAX_IMAGES}</Text>
          <Text style={styles.photosLabel}>PHOTOS</Text>
        </View>
      </View>

      
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>upload your photos</Text>
      </View>



      <View style={styles.photoSection}>
        <View style={styles.photoBoxesContainer}>
          {[0, 1, 2].map((index) => {
            const hasImage = capturedImages[index];
            const canAddHere = canAddMore || hasImage;
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.photoBox,
                  hasImage && styles.photoBoxFilled,
                  !canAddHere && !hasImage && styles.photoBoxDisabled
                ]}
                onPress={() => hasImage ? removePhoto(index) : selectPhotoForBox(index)}
                disabled={!canAddHere && !hasImage}
              >
                {hasImage ? (
                  <>
                    <Image source={{ uri: hasImage }} style={styles.boxImage} />
                    <View style={styles.removeOverlay}>
                      <Text style={styles.removeText}>
                        <Ionicons name="close" size={20} color="black" />
                      </Text>
                      
                    </View>
                  </>
                ) : (
                  <Text style={[
                    styles.boxNumber,
                    !canAddHere ? styles.boxNumberDisabled : null
                  ]}>
                    {canAddHere ? `${index + 1}` : '✕'}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      
      <View style={styles.instructionSection}>
        <Text style={styles.instructionText}>
          Tap the empty boxes to upload the photos and tap the wrong icon to remove them
        </Text>
        <Text style={styles.instructionText}>
        </Text>
      </View>

        <CustomButton
          title="customise photos"
          onPress={navigateToCustomize}
          disabled={capturedImages.length === 0}
          style={styles.continueButton}
          textStyle={styles.continueButtonText}
          disabledStyle={styles.continueButtonDisabled}
          disabledTextStyle={styles.continueButtonTextDisabled}
          arrowColor={capturedImages.length === 0 ? "#ccc" : "#000"}
          checkPhotoLimit={false}
        />
      
      <View style={styles.bottomSvgContainer}>
        <Svg width="349" height="100" viewBox="0 0 349 100" fill="none" >
        <Line x1="144.5" y1="-2.18557e-08" x2="144.5" y2="100" stroke="black"/>
        <Line x1="102.5" y1="-2.18557e-08" x2="102.5" y2="100" stroke="black"/>
        <Line x1="60.5" y1="-2.18557e-08" x2="60.5" y2="100" stroke="black"/>
        <Line x1="18.5" y1="-2.18557e-08" x2="18.5" y2="100" stroke="black"/>
        <Line x1="138.5" y1="-2.18557e-08" x2="138.5" y2="100" stroke="black"/>
        <Line x1="96.5" y1="-2.18557e-08" x2="96.5" y2="100" stroke="black"/>
        <Line x1="54.5" y1="-2.18557e-08" x2="54.5" y2="100" stroke="black"/>
        <Line x1="12.5" y1="-2.18557e-08" x2="12.5" y2="100" stroke="black"/>
        <Line x1="138.5" y1="-2.18557e-08" x2="138.5" y2="100" stroke="black"/>
        <Line x1="96.5" y1="-2.18557e-08" x2="96.5" y2="100" stroke="black"/>
        <Line x1="54.5" y1="-2.18557e-08" x2="54.5" y2="100" stroke="black"/>
        <Line x1="12.5" y1="-2.18557e-08" x2="12.5" y2="100" stroke="black"/>
        <Line x1="6.5" y1="-2.18557e-08" x2="6.5" y2="100" stroke="black"/>
        <Line x1="0.5" y1="-2.18557e-08" x2="0.500004" y2="100" stroke="black"/>
        <Line x1="150.5" y1="-2.18557e-08" x2="150.5" y2="100" stroke="black"/>
        <Line x1="108.5" y1="-2.18557e-08" x2="108.5" y2="100" stroke="black"/>
        <Line x1="66.5" y1="-2.18557e-08" x2="66.5" y2="100" stroke="black"/>
        <Line x1="24.5" y1="-2.18557e-08" x2="24.5" y2="100" stroke="black"/>
        <Line x1="156.5" y1="-2.18557e-08" x2="156.5" y2="100" stroke="black"/>
        <Line x1="114.5" y1="-2.18557e-08" x2="114.5" y2="100" stroke="black"/>
        <Line x1="72.5" y1="-2.18557e-08" x2="72.5" y2="100" stroke="black"/>
        <Line x1="30.5" y1="-2.18557e-08" x2="30.5" y2="100" stroke="black"/>
        <Line x1="162.5" y1="-2.18557e-08" x2="162.5" y2="100" stroke="black"/>
        <Line x1="120.5" y1="-2.18557e-08" x2="120.5" y2="100" stroke="black"/>
        <Line x1="78.5" y1="-2.18557e-08" x2="78.5" y2="100" stroke="black"/>
        <Line x1="36.5" y1="-2.18557e-08" x2="36.5" y2="100" stroke="black"/>
        <Line x1="168.5" y1="-2.18557e-08" x2="168.5" y2="100" stroke="black"/>
        <Line x1="126.5" y1="-2.18557e-08" x2="126.5" y2="100" stroke="black"/>
        <Line x1="84.5" y1="-2.18557e-08" x2="84.5" y2="100" stroke="black"/>
        <Line x1="42.5" y1="-2.18557e-08" x2="42.5" y2="100" stroke="black"/>
        <Line x1="174.5" y1="-2.18557e-08" x2="174.5" y2="100" stroke="black"/>
        <Line x1="132.5" y1="-2.18557e-08" x2="132.5" y2="100" stroke="black"/>
        <Line x1="90.5" y1="-2.18557e-08" x2="90.5" y2="100" stroke="black"/>
        <Line x1="48.5" y1="-2.18557e-08" x2="48.5" y2="100" stroke="black"/>
        <Line x1="180.5" y1="-2.18557e-08" x2="180.5" y2="100" stroke="black"/>
        <Line x1="186.5" y1="-2.18557e-08" x2="186.5" y2="100" stroke="black"/>
        <Line x1="192.5" y1="-2.18557e-08" x2="192.5" y2="100" stroke="black"/>
        <Line x1="198.5" y1="-2.18557e-08" x2="198.5" y2="100" stroke="black"/>
        <Line x1="204.5" y1="-2.18557e-08" x2="204.5" y2="100" stroke="black"/>
        <Line x1="210.5" y1="-2.18557e-08" x2="210.5" y2="100" stroke="black"/>
        <Line x1="216.5" y1="-2.18557e-08" x2="216.5" y2="100" stroke="black"/>
        <Line x1="222.5" y1="-2.18557e-08" x2="222.5" y2="100" stroke="black"/>
        <Line x1="228.5" y1="-2.18557e-08" x2="228.5" y2="100" stroke="black"/>
        <Line x1="234.5" y1="-2.18557e-08" x2="234.5" y2="100" stroke="black"/>
        <Line x1="240.5" y1="-2.18557e-08" x2="240.5" y2="100" stroke="black"/>
        <Line x1="246.5" y1="-2.18557e-08" x2="246.5" y2="100" stroke="black"/>
        <Line x1="252.5" y1="-2.18557e-08" x2="252.5" y2="100" stroke="black"/>
        <Line x1="258.5" y1="-2.18557e-08" x2="258.5" y2="100" stroke="black"/>
        <Line x1="264.5" y1="-2.18557e-08" x2="264.5" y2="100" stroke="black"/>
        <Line x1="270.5" y1="-2.18557e-08" x2="270.5" y2="100" stroke="black"/>
        <Line x1="276.5" y1="-2.18557e-08" x2="276.5" y2="100" stroke="black"/>
        <Line x1="282.5" y1="-2.18557e-08" x2="282.5" y2="100" stroke="black"/>
        <Line x1="288.5" y1="-2.18557e-08" x2="288.5" y2="100" stroke="black"/>
        <Line x1="294.5" y1="-2.18557e-08" x2="294.5" y2="100" stroke="black"/>
        <Line x1="300.5" y1="-2.18557e-08" x2="300.5" y2="100" stroke="black"/>
        <Line x1="306.5" y1="-2.18557e-08" x2="306.5" y2="100" stroke="black"/>
        <Line x1="312.5" y1="-2.18557e-08" x2="312.5" y2="100" stroke="black"/>
        <Line x1="318.5" y1="-2.18557e-08" x2="318.5" y2="100" stroke="black"/>
        <Line x1="324.5" y1="-2.18557e-08" x2="324.5" y2="100" stroke="black"/>
        <Line x1="330.5" y1="-2.18557e-08" x2="330.5" y2="100" stroke="black"/>
        <Line x1="336.5" y1="-2.18557e-08" x2="336.5" y2="100" stroke="black"/>
        <Line x1="342.5" y1="-2.18557e-08" x2="342.5" y2="100" stroke="black"/>
        <Line x1="348.5" y1="-2.18557e-08" x2="348.5" y2="100" stroke="black"/>
        </Svg>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingBottom: 10,
    marginBottom: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#B8B8B8',
  },
  backButton: {
    padding: 10,
  },
  backArrow: {
    marginRight: 0,
  },
  photoCounter: {
    alignItems: 'flex-end',
    paddingBottom: 8,
    minWidth: 80,
  },
  counterText: {
    fontSize: 35,
    fontWeight: 'normal',
    color: '#000',
    fontFamily: 'grotesk',
  },
  photosLabel: {
    fontSize: 20,
    color: '#000',
    marginTop: 2,
  },
  titleSection: {
    marginBottom: 60,
    borderBottomWidth: 2,
    borderBottomColor: '#B8B8B8',
    paddingBottom: 25,
  },
  mainTitle: {
    fontSize: 48,
    color: '#000',
    fontFamily: 'grotesk',
    textTransform: 'uppercase',
  },
  photoSection: {
    marginBottom: 20,
  },
  photoBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoBox: {
    width: 105,
    height: 100,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoBoxFilled: {
    backgroundColor: '#fff',
  },
  photoBoxDisabled: {
    backgroundColor: '#f5f5f5',
    opacity: 0.5,
  },
  boxImage: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
  instructionSection: {
    // marginBottom: 30,
  },
  instructionText: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: 'grotesk',
  },
  continueButton: {
    flexDirection: 'row',
    borderRadius: 25,
    alignSelf: 'flex-end',
    borderColor: '#000',
    borderWidth: 1,
    color: '#000000',
    paddingVertical: 4,
    paddingHorizontal: 10,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'trasparent',
  },
  continueButtonDisabled: {
    color: '#ccc',
    borderColor: '#ccc',
  },
  continueButtonText: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontFamily: 'grotesk',
  },
  continueButtonTextDisabled: {
    color: '#ccc',
  },
  bottomSvgContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
    minHeight: 100,
  },



boxNumber: {
  fontSize: 24,
  color: '#000000',
  fontFamily: 'grotesk',
},
boxNumberDisabled: {
  color: '#ccc',
  fontSize: 20,
},
removeOverlay: {
  position: 'absolute',
  top: -10,
  right: -10,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: 2,
  borderColor: 'black',
  borderWidth: 1,
  borderRadius: '50%',
},
removeText: {
  color: 'white',
  fontSize: 12,
  textAlign: 'center',
  fontFamily: 'grotesk',
},
});