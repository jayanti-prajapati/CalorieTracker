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
import { useNavigation } from '@react-navigation/native';
import { useMealStore } from '../stores/mealStore';
import { mealService } from '../services/meal-service';
import { MealEntry } from '../types';
import { CameraSimulation } from '../components/CameraSimulation';

// Conditional import with error handling for react-native-vision-camera
let Camera: any = null;
let useCameraDevices: any = () => [];
let getCameraPermissionStatus: any = () => Promise.resolve('denied');
let requestCameraPermission: any = () => Promise.resolve('denied');

type CameraPermissionStatus =
  | 'granted'
  | 'denied'
  | 'not-determined'
  | 'restricted';

try {
  const VisionCamera = require('react-native-vision-camera');
  Camera = VisionCamera.Camera;
  useCameraDevices = VisionCamera.useCameraDevices;
  getCameraPermissionStatus =
    VisionCamera.Camera?.getCameraPermissionStatus ||
    (() => Promise.resolve('denied'));
  requestCameraPermission =
    VisionCamera.Camera?.requestCameraPermission ||
    (() => Promise.resolve('denied'));
} catch (error) {
  console.warn('react-native-vision-camera not available:', error);
}

const { width, height } = Dimensions.get('window');

type ScanMode = 'food' | 'barcode' | 'label';

const AddMealScreen: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<ScanMode>('food');
  const [zoomLevel, setZoomLevel] = useState<'.5x' | '1x'>('1x');
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>('not-determined');
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [simulationMode, setSimulationMode] = useState(false);

  const devices = useCameraDevices();
  const device = devices.find((d: any) => d.position === 'back');
  const camera = useRef<any>(null);
  const { addMeal, isLoading } = useMealStore();
  const navigation = useNavigation();

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      // For iOS Simulator or when camera module is not available, enable simulation mode
      if ((Platform.OS === 'ios' && __DEV__) || !Camera || !device) {
        setCameraPermission('granted');
        setSimulationMode(true);
        console.log('🎭 Simulation mode enabled - no camera/device available');
        return;
      }

      const permission = await getCameraPermissionStatus();
      setCameraPermission(permission);

      if (permission === 'not-determined') {
        const newPermission = await requestCameraPermission();
        setCameraPermission(newPermission);
      }
    } catch (error) {
      console.warn('Camera permission check failed:', error);
      // Enable simulation mode when camera is not available
      setCameraPermission('granted');
      setSimulationMode(true);
      console.log('🎭 Simulation mode enabled - camera error fallback');
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

      if (simulationMode) {
        // Simulate photo capture and processing
        console.log('🎭 Simulating photo capture for mode:', selectedMode);
        await simulatePhotoCapture(selectedMode);
      } else if (camera.current) {
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

  const simulatePhotoCapture = async (mode: ScanMode) => {
    // Add realistic delay to simulate processing
    await new Promise<void>(resolve => setTimeout(resolve, 1500));

    console.log('🎭 Processing simulated photo for mode:', mode);

    // Simulate different scanning results based on mode
    switch (mode) {
      case 'barcode':
        await simulateBarcodeScanning();
        break;
      case 'food':
        await simulateFoodScanning();
        break;
      case 'label':
        await simulateLabelScanning();
        break;
    }
  };

  const simulateBarcodeScanning = async () => {
    // Simulate barcode scanning with random success/failure
    const mockBarcodes = ['123456789012', '987654321098', '456789123456'];
    const randomBarcode =
      mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)] ||
      '123456789012';

    try {
      console.log('🎭 Simulating barcode scan:', randomBarcode);
      const response = await mealService.getFoodByBarcode(randomBarcode);
      const food = response.data;

      showAddMealDialog(food);
    } catch (error) {
      Alert.alert(
        '🎭 Simulation: Not Found',
        `No food found for barcode: ${randomBarcode}`,
      );
    }
  };

  const simulateFoodScanning = async () => {
    // Simulate food recognition with realistic results

    try {
      const response = await mealService.searchFoods('');
      const foods = response.data;

      if (foods.length > 0) {
        const food = foods[0];
        if (food) {
          showAddMealDialog(food);
        }
      } else {
        Alert.alert(
          '🎭 Simulation: Not Recognized',
          'Could not identify the food in the image. Try a different angle or lighting.',
        );
      }
    } catch (error) {
      Alert.alert(
        '🎭 Simulation: Recognition Error',
        'Failed to process the food image',
      );
    }
  };

  const simulateLabelScanning = async () => {
    // Simulate nutrition label OCR scanning
    const mockNutritionLabels = [
      { name: 'Granola Bar', calories: 150, protein: 3, carbs: 23, fat: 6 },
      { name: 'Yogurt Cup', calories: 120, protein: 12, carbs: 18, fat: 2 },
      { name: 'Protein Shake', calories: 160, protein: 25, carbs: 8, fat: 3 },
      { name: 'Trail Mix', calories: 180, protein: 5, carbs: 16, fat: 12 },
    ];

    const randomLabel =
      mockNutritionLabels[
        Math.floor(Math.random() * mockNutritionLabels.length)
      ] || mockNutritionLabels[0];

    console.log('🎭 Simulating nutrition label scan:', randomLabel?.name);

    // Create a mock food object from the nutrition label
    const mockFood = {
      id: `sim_${Date.now()}`,
      name: randomLabel?.name,
      calories: randomLabel?.calories,
      protein: randomLabel?.protein,
      carbs: randomLabel?.carbs,
      fat: randomLabel?.fat,
      brand: 'Scanned Label',
      category: 'packaged',
    };
    showAddMealDialog(mockFood);
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
      showAddMealDialog(food);
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
      const mealEntry: MealEntry = {
        quantity: quantity,
        mealType: 'snack' as const,
        date: today,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        brand: food.brand,
        category: food.category,
        barcode: food.barcode,
        imageUrl: food.imageUrl,
        name: food.name,
        createdAt: new Date().toISOString(),
        id: `meal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };

      await mealService.addMeal(mealEntry);

      setTimeout(() => {
        navigation.navigate('Dashboard' as never);
      }, 1000);
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

  // Remove the early return for no device - let simulation mode handle it
  // if (!device) {
  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.permissionContainer}>
  //         <Text style={styles.permissionText}>No camera device found</Text>
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Camera or Mock for Simulator/No Camera Module */}
      {device && Camera ? (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isCameraActive}
          photo={true}
          zoom={zoomLevel === '1x' ? 1 : 0.5}
        />
      ) : (
        <CameraSimulation
          simulationMode={simulationMode}
          selectedMode={selectedMode}
          Camera={Camera}
        />
      )}

      {/* Header */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
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
      {/* <View style={styles.zoomContainer}>
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
      </View> */}

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
        {/* <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonIcon}>✨</Text>
        </TouchableOpacity> */}

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

        {/* <TouchableOpacity
          style={styles.bottomButton}
          onPress={openImageLibrary}
        >
          <Text style={styles.bottomButtonIcon}>🖼️</Text>
        </TouchableOpacity> */}
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
  simulationIndicator: {
    marginTop: 20,
    alignItems: 'center',
  },
  simulationBadge: {
    backgroundColor: 'rgba(255, 193, 7, 0.9)',
    color: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddMealScreen;
