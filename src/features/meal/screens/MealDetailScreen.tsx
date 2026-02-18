import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { MealDetail } from '../components/MealDetail';
import { useMealStore } from '../stores/mealStore';
import { MealEntry } from '../types';

interface MealDetailScreenProps {
  route: {
    params: {
      mealId: string;
    };
  };
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void;
  };
}

const MealDetailScreen: React.FC<MealDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { mealId } = route.params;
  const { meals, updateMeal, removeMeal, isLoading } = useMealStore();
  const [selectedMeal, setSelectedMeal] = useState<MealEntry | null>(null);

  // Find the meal by ID
  useEffect(() => {
    const meal = meals.find(m => m.id === mealId);
    if (meal) {
      setSelectedMeal(meal);
    } else {
      // Meal not found, go back
      Alert.alert('Error', 'Meal not found', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  }, [mealId, meals, navigation]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    if (selectedMeal) {
      // Navigate to meal edit screen (to be implemented)
      navigation.navigate('EditMeal', { mealId: selectedMeal.id });
    }
  };

  const handleDone = () => {
    navigation.goBack();
  };

  const handleFixIssue = async () => {
    if (!selectedMeal) return;

    Alert.alert(
      'Report Issue',
      'What type of issue would you like to report?',
      [
        {
          text: 'Wrong Calories',
          onPress: () => handleIssueReport('calories'),
        },
        {
          text: 'Wrong Food Item',
          onPress: () => handleIssueReport('food_item'),
        },
        {
          text: 'Wrong Macros',
          onPress: () => handleIssueReport('macros'),
        },
        {
          text: 'Other',
          onPress: () => handleIssueReport('other'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const handleIssueReport = (issueType: string) => {
    // TODO: Implement issue reporting to backend
    console.log('Issue reported:', issueType, 'for meal:', selectedMeal?.id);

    Alert.alert(
      'Issue Reported',
      "Thank you for your feedback. We'll review this meal and improve our AI recognition.",
      [{ text: 'OK' }],
    );
  };

  const handleAIRating = async (rating: 'up' | 'down') => {
    if (!selectedMeal) return;

    try {
      // Update meal with AI rating
      await updateMeal(selectedMeal.id, {
        aiRating: rating,
        aiRatedAt: new Date().toISOString(),
      });

      // Show feedback
      const message =
        rating === 'up'
          ? 'Thanks for the positive feedback! This helps improve our AI.'
          : "Thanks for the feedback. We'll use this to improve our recognition accuracy.";

      Alert.alert('Feedback Received', message, [{ text: 'OK' }]);
    } catch (error) {
      console.error('Failed to submit AI rating:', error);
      Alert.alert('Error', 'Failed to submit rating. Please try again.');
    }
  };

  const handleChangePhoto = () => {
    // TODO: Navigate to camera/photo picker
    Alert.alert(
      'Change Photo',
      'Camera functionality will be implemented here.',
    );
  };

  const handleReportFood = () => {
    if (!selectedMeal) return;

    Alert.alert(
      'Report Food',
      'What would you like to report about this food item?',
      [
        {
          text: 'Wrong Food Item',
          onPress: () => handleIssueReport('wrong_food'),
        },
        {
          text: 'Incorrect Nutrition',
          onPress: () => handleIssueReport('wrong_nutrition'),
        },
        {
          text: 'Poor Image Quality',
          onPress: () => handleIssueReport('poor_image'),
        },
        {
          text: 'Other Issue',
          onPress: () => handleIssueReport('other'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const handleSaveImage = async () => {
    if (!selectedMeal?.imageUrl) {
      Alert.alert('No Image', "This meal doesn't have an image to save.");
      return;
    }

    // TODO: Implement image saving to device gallery
    Alert.alert(
      'Save Image',
      'Image saving functionality will be implemented here.',
    );
  };

  const handleDeleteFood = () => {
    if (!selectedMeal) return;

    Alert.alert(
      'Delete Food',
      'Are you sure you want to delete this meal? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeMeal(selectedMeal.id);
              navigation.goBack();
            } catch (error) {
              console.error('Failed to delete meal:', error);
              Alert.alert('Error', 'Failed to delete meal. Please try again.');
            }
          },
        },
      ],
    );
  };

  // Show loading or error state if meal not found
  if (!selectedMeal) {
    return null; // Could add a loading spinner here
  }

  return (
    <MealDetail
      meal={selectedMeal}
      onBack={handleBack}
      onEdit={handleEdit}
      onDone={handleDone}
      onFixIssue={handleFixIssue}
      onRating={handleAIRating}
      onChangePhoto={handleChangePhoto}
      onReportFood={handleReportFood}
      onSaveImage={handleSaveImage}
      onDeleteFood={handleDeleteFood}
    />
  );
};

export default MealDetailScreen;
