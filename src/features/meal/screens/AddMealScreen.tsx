import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useMealStore } from '../stores/mealStore';
import { mealService } from '../services/meal-service';

import {
  Camera,
  useCameraDevices,
  CameraPermissionStatus,
} from 'react-native-vision-camera';

const { width, height } = Dimensions.get('window');

type ScanMode = 'food' | 'barcode' | 'label';

const AddMealScreen: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<ScanMode>('food');
  const [zoomLevel, setZoomLevel] = useState<'.5x' | '1x'>('1x');
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>('not-determined');
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const camera = useRef<Camera>(null);
  const { addMeal, isLoading } = useMealStore();

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      // For iOS Simulator, grant permission automatically
      if (Platform.OS === 'ios' && __DEV__) {
        setCameraPermission('granted');
        return;
      }

      const permission = await Camera.getCameraPermissionStatus();
      setCameraPermission(permission);

      if (permission === 'not-determined') {
        const newPermission = await Camera.requestCameraPermission();
        setCameraPermission(newPermission);
      }
    } catch (error) {
      console.warn('Camera permission check failed:', error);
      // For simulator, still allow access with mock camera
      if (Platform.OS === 'ios' && __DEV__) {
        setCameraPermission('granted');
      } else {
        setCameraPermission('denied');
      }
    }
  };

  const handleScanModePress = (mode: ScanMode) => {
    setSelectedMode(mode);
  };

  const toggleZoom = () => {
    setZoomLevel(zoomLevel === '1x' ? '.5x' : '1x');
  };

  const takePicture = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      if (camera.current) {
        const photo = await camera.current.takePhoto({
          flash: 'auto',
        });

        console.log('Photo captured:', photo.path);

        // Process the photo based on scan mode
        await processPhoto(photo.path, selectedMode);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to capture photo');
    } finally {
      setIsProcessing(false);
    }
  };

  const processPhoto = async (photoPath: string, mode: ScanMode) => {
    try {
      switch (mode) {
        case 'barcode':
          // In a real app, this would use ML Kit or similar to scan barcode
          await handleBarcodeScanning(photoPath);
          break;
        case 'food':
          // In a real app, this would use food recognition AI
          await handleFoodScanning(photoPath);
          break;
        case 'label':
          // In a real app, this would use OCR to read nutrition labels
          await handleLabelScanning(photoPath);
          break;
      }
    } catch (error) {
      console.error('Error processing photo:', error);
      Alert.alert('Processing Error', 'Failed to process the photo');
    }
  };

  const handleBarcodeScanning = async (photoPath: string) => {
    // Mock barcode scanning - in production, use ML Kit
    const mockBarcode = '123456789012';

    try {
      const response = await mealService.getFoodByBarcode(mockBarcode);
      const food = response.data;

      Alert.alert(
        'Food Found!',
        `Found: ${food.name}\nCalories: ${food.calories} per 100g`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Add to Meal', onPress: () => showAddMealDialog(food) },
        ],
      );
    } catch (error) {
      Alert.alert('Not Found', 'No food found for this barcode');
    }
  };

  const handleFoodScanning = async (photoPath: string) => {
    // Mock food recognition - in production, use food recognition AI
    const mockFoodResults = ['apple', 'banana', 'orange'];
    const randomFood =
      mockFoodResults[Math.floor(Math.random() * mockFoodResults.length)];

    if (!randomFood) return;

    try {
      const response = await mealService.searchFoods(randomFood);
      const foods = response.data;

      if (foods.length > 0) {
        const food = foods[0];
        if (food) {
          Alert.alert(
            'Food Recognized!',
            `Detected: ${food.name}\nCalories: ${food.calories} per 100g`,
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Add to Meal', onPress: () => showAddMealDialog(food) },
            ],
          );
        }
      } else {
        Alert.alert(
          'Not Recognized',
          'Could not identify the food in the image',
        );
      }
    } catch (error) {
      Alert.alert('Recognition Error', 'Failed to recognize food in image');
    }
  };

  const handleLabelScanning = async (photoPath: string) => {
    // Mock nutrition label scanning - in production, use OCR
    Alert.alert(
      'Label Scanning',
      'Nutrition label scanning is not yet implemented. This would use OCR to read nutrition facts.',
      [{ text: 'OK' }],
    );
  };

  const showAddMealDialog = (food: any) => {
    Alert.prompt(
      'Add to Meal',
      `How many grams of ${food.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add',
          onPress: (quantity?: string) => {
            if (quantity && !isNaN(Number(quantity))) {
              addFoodToMeal(food, Number(quantity));
            } else {
              Alert.alert('Invalid Quantity', 'Please enter a valid number');
            }
          },
        },
      ],
      'plain-text',
      '100',
    );
  };

  const addFoodToMeal = async (food: any, quantity: number) => {
    try {
      const today = new Date().toISOString().split('T')[0] || '';
      const mealEntry = {
        foodId: food.id,
        food: food,
        quantity: quantity,
        mealType: 'snack' as const,
        date: today,
      };

      await addMeal(mealEntry);
      Alert.alert(
        'Success',
        `Added ${quantity}g of ${food.name} to your meals!`,
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to add meal');
    }
  };

  const openImageLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (response.assets && response.assets[0]) {
          const asset = response.assets[0];
          console.log('Image selected:', asset.uri);
          Alert.alert(
            'Image Selected',
            `Scan mode: ${selectedMode}\nImage: ${asset.fileName}`,
          );
        }
      },
    );
  };

  if (cameraPermission === 'denied') {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            Camera permission is required
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={checkCameraPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>No camera device found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Camera or Mock for Simulator */}
      {device ? (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isCameraActive}
          photo={true}
          zoom={zoomLevel === '1x' ? 1 : 0.5}
        />
      ) : (
        <View style={styles.cameraBackground}>
          <View style={styles.simulatorOverlay}>
            <Text style={styles.simulatorText}>📱 iOS Simulator</Text>
            <Text style={styles.simulatorSubtext}>
              Camera preview not available
            </Text>
            <Text style={styles.simulatorSubtext}>
              Use a physical device for real camera
            </Text>
          </View>
        </View>
      )}

      {/* Header */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpIcon}>?</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Scanning Frame */}
      <View style={styles.scanningArea}>
        <View style={styles.scanFrame}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
      </View>

      {/* Zoom Controls */}
      <View style={styles.zoomContainer}>
        <TouchableOpacity
          style={[
            styles.zoomButton,
            zoomLevel === '.5x' && styles.zoomButtonActive,
          ]}
          onPress={toggleZoom}
        >
          <Text
            style={[
              styles.zoomText,
              zoomLevel === '.5x' && styles.zoomTextActive,
            ]}
          >
            .5x
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.zoomButton,
            zoomLevel === '1x' && styles.zoomButtonActive,
          ]}
          onPress={toggleZoom}
        >
          <Text
            style={[
              styles.zoomText,
              zoomLevel === '1x' && styles.zoomTextActive,
            ]}
          >
            1x
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scan Mode Options */}
      <View style={styles.scanOptions}>
        <TouchableOpacity
          style={[
            styles.scanOption,
            selectedMode === 'food' && styles.scanOptionActive,
          ]}
          onPress={() => handleScanModePress('food')}
        >
          <View style={styles.scanOptionIcon}>
            <Text style={styles.scanOptionIconText}>🍎</Text>
          </View>
          <Text
            style={[
              styles.scanOptionText,
              selectedMode === 'food' && styles.scanOptionTextActive,
            ]}
          >
            Scan Food
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.scanOption,
            selectedMode === 'barcode' && styles.scanOptionActive,
          ]}
          onPress={() => handleScanModePress('barcode')}
        >
          <View style={styles.scanOptionIcon}>
            <Text style={styles.scanOptionIconText}>|||</Text>
          </View>
          <Text
            style={[
              styles.scanOptionText,
              selectedMode === 'barcode' && styles.scanOptionTextActive,
            ]}
          >
            Barcode
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.scanOption,
            selectedMode === 'label' && styles.scanOptionActive,
          ]}
          onPress={() => handleScanModePress('label')}
        >
          <View style={styles.scanOptionIcon}>
            <Text style={styles.scanOptionIconText}>📄</Text>
          </View>
          <Text
            style={[
              styles.scanOptionText,
              selectedMode === 'label' && styles.scanOptionTextActive,
            ]}
          >
            Food label
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonIcon}>✨</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.captureButton,
            isProcessing && styles.captureButtonProcessing,
          ]}
          onPress={takePicture}
          disabled={isProcessing}
        >
          <View
            style={[
              styles.captureButtonInner,
              isProcessing && styles.captureButtonInnerProcessing,
            ]}
          />
          {isProcessing && (
            <Text style={styles.processingText}>Processing...</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={openImageLibrary}
        >
          <Text style={styles.bottomButtonIcon}>🖼️</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Indicator */}
      <View style={styles.bottomIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1a1a1a',
    opacity: 0.8,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  helpButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scanningArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  scanFrame: {
    width: width - 80,
    height: width - 80,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 20,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 20,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 20,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 20,
  },
  zoomContainer: {
    position: 'absolute',
    top: height * 0.6,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 4,
  },
  zoomButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  zoomButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  zoomText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  zoomTextActive: {
    color: '#000000',
  },
  scanOptions: {
    position: 'absolute',
    bottom: 140,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  scanOption: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 80,
  },
  scanOptionActive: {
    backgroundColor: '#FFFFFF',
  },
  scanOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  scanOptionIconText: {
    fontSize: 20,
  },
  scanOptionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  scanOptionTextActive: {
    color: '#000000',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 60,
  },
  bottomButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonIcon: {
    fontSize: 24,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  captureButtonProcessing: {
    opacity: 0.7,
  },
  captureButtonInnerProcessing: {
    backgroundColor: '#CCCCCC',
  },
  processingText: {
    position: 'absolute',
    bottom: -25,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomIndicator: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 134,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 2.5,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  simulatorOverlay: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    transform: [{ translateY: -50 }],
  },
  simulatorText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  simulatorSubtext: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default AddMealScreen;
