import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import {
  ArrowLeft,
  Share,
  MoreHorizontal,
  Bookmark,
  Edit3,
  Plus,
  ThumbsUp,
  ThumbsDown,
  Wrench,
  Camera,
  AlertTriangle,
  Download,
  Trash2,
  ChevronRight,
} from 'lucide-react-native';
import { MealEntry } from '../types';

interface MealDetailProps {
  meal: MealEntry;
  onBack?: () => void;
  onEdit?: () => void;
  onDone?: () => void;
  onFixIssue?: () => void;
  onRating?: (rating: 'up' | 'down') => void;
  onChangePhoto?: () => void;
  onReportFood?: () => void;
  onSaveImage?: () => void;
  onDeleteFood?: () => void;
}

export const MealDetail: React.FC<MealDetailProps> = ({
  meal,
  onBack,
  onEdit,
  onDone,
  onFixIssue,
  onRating,
  onChangePhoto,
  onReportFood,
  onSaveImage,
  onDeleteFood,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={onBack}>
          <ArrowLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Nutrition</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Share size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowDropdown(true)}
          >
            <MoreHorizontal size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Meal Info Section */}
        <View style={styles.mealInfoCard}>
          <View style={styles.mealImageContainer}>
            {meal.imageUrl && (
              <Image
                source={{ uri: meal.imageUrl }}
                style={styles.mealImage}
                resizeMode="cover"
              />
            )}
          </View>
          <View style={styles.mealHeader}>
            <Bookmark size={20} color="#6C757D" />
            <Text style={styles.timeText}>{formatTime(meal.createdAt)}</Text>
          </View>

          <View style={styles.mealTitleRow}>
            <Text style={styles.mealName}>{meal.name}</Text>
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityText}>1</Text>
              <TouchableOpacity onPress={onEdit}>
                <Edit3 size={16} color="#6C757D" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Nutrition Card */}
        <View style={styles.nutritionCard}>
          {/* Calories Section */}
          <View style={styles.caloriesSection}>
            <View style={styles.caloriesHeader}>
              <View style={styles.calorieIcon}>
                <Text style={styles.calorieIconText}>🔥</Text>
              </View>
              <Text style={styles.caloriesLabel}>Calories</Text>
            </View>
            <Text style={styles.caloriesValue}>{meal.calories}</Text>
          </View>

          {/* Macros Section */}
          <View style={styles.macrosSection}>
            <View style={styles.macroItem}>
              <View style={styles.macroHeader}>
                <View style={[styles.macroIcon, styles.proteinIcon]}>
                  <Text style={styles.macroIconText}>🥩</Text>
                </View>
                <Text style={styles.macroLabel}>Protein</Text>
              </View>
              <Text style={styles.macroValue}>{meal.protein}g</Text>
            </View>

            <View style={styles.macroItem}>
              <View style={styles.macroHeader}>
                <View style={[styles.macroIcon, styles.carbsIcon]}>
                  <Text style={styles.macroIconText}>🌾</Text>
                </View>
                <Text style={styles.macroLabel}>Carbs</Text>
              </View>
              <Text style={styles.macroValue}>{meal.carbs}g</Text>
            </View>

            <View style={styles.macroItem}>
              <View style={styles.macroHeader}>
                <View style={[styles.macroIcon, styles.fatsIcon]}>
                  <Text style={styles.macroIconText}>💧</Text>
                </View>
                <Text style={styles.macroLabel}>Fats</Text>
              </View>
              <Text style={styles.macroValue}>{meal.fat}g</Text>
            </View>
          </View>

          {/* Progress Dots */}
          <View style={styles.progressDots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Ingredients Section */}
        <View style={styles.ingredientsSection}>
          <View style={styles.ingredientsHeader}>
            <Text style={styles.ingredientsTitle}>Ingredients</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={16} color="#6C757D" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ingredientsNotice}>
            <View style={styles.hiddenIcon}>
              <Text style={styles.hiddenIconText}>🚫</Text>
            </View>
            <Text style={styles.hiddenText}>
              Ingredients hidden{' '}
              <Text style={styles.learnMoreText}>Learn why</Text>
            </Text>
          </View>
        </View>

        {/* AI Feedback Section */}
        <View style={styles.aiFeedbackSection}>
          <View style={styles.aiFeedbackHeader}>
            <View style={styles.aiIcon}>
              <Text style={styles.aiIconText}>✨</Text>
            </View>
            <Text style={styles.aiFeedbackText}>How did CalShotAI do?</Text>
          </View>

          <View style={styles.ratingButtons}>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => onRating?.('down')}
            >
              <ThumbsDown size={20} color="#6C757D" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => onRating?.('up')}
            >
              <ThumbsUp size={20} color="#6C757D" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.fixButton} onPress={onFixIssue}>
          <Wrench size={16} color="#6C757D" />
          <Text style={styles.fixButtonText}>Fix Issue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.doneButton} onPress={onDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown Modal */}
      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowDropdown(false)}
        >
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                onChangePhoto?.();
              }}
            >
              <View style={styles.dropdownItemContent}>
                <ChevronRight size={20} color="#1A1A1A" />
                <Text style={styles.dropdownItemText}>Change Photo</Text>
              </View>
              <Camera size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <View style={styles.dropdownSeparator} />

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                onReportFood?.();
              }}
            >
              <View style={styles.dropdownItemContent}>
                <Text style={styles.dropdownItemText}>Report Food</Text>
              </View>
              <AlertTriangle size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <View style={styles.dropdownSeparator} />

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                onSaveImage?.();
              }}
            >
              <View style={styles.dropdownItemContent}>
                <Text style={styles.dropdownItemText}>Save Image</Text>
              </View>
              <Download size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <View style={styles.dropdownSeparator} />

            <TouchableOpacity
              style={[styles.dropdownItem, styles.deleteItem]}
              onPress={() => {
                setShowDropdown(false);
                onDeleteFood?.();
              }}
            >
              <View style={styles.dropdownItemContent}>
                <Text style={[styles.dropdownItemText, styles.deleteText]}>
                  Delete Food
                </Text>
              </View>
              <Trash2 size={20} color="#FF4444" />
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  mealImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E9ECEF',
  },
  mealImageContainer: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mealInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeText: {
    fontSize: 16,
    color: '#6C757D',
    marginLeft: 8,
  },
  mealTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mealName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  nutritionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  caloriesSection: {
    marginBottom: 24,
  },
  caloriesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  calorieIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  calorieIconText: {
    fontSize: 16,
  },
  caloriesLabel: {
    fontSize: 16,
    color: '#6C757D',
  },
  caloriesValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  macrosSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  macroItem: {
    flex: 1,
    alignItems: 'center',
  },
  macroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  macroIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  macroIconText: {
    fontSize: 12,
  },
  proteinIcon: {
    backgroundColor: 'transparent',
  },
  carbsIcon: {
    backgroundColor: 'transparent',
  },
  fatsIcon: {
    backgroundColor: 'transparent',
  },
  macroLabel: {
    fontSize: 14,
    color: '#6C757D',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E9ECEF',
  },
  activeDot: {
    backgroundColor: '#1A1A1A',
  },
  ingredientsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  ingredientsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ingredientsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    fontSize: 16,
    color: '#6C757D',
  },
  ingredientsNotice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hiddenIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  hiddenIconText: {
    fontSize: 14,
  },
  hiddenText: {
    fontSize: 16,
    color: '#6C757D',
  },
  learnMoreText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  aiFeedbackSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  aiFeedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  aiIconText: {
    fontSize: 16,
  },
  aiFeedbackText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  ratingButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  ratingButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 34,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    gap: 12,
  },
  fixButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    gap: 8,
  },
  fixButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C757D',
  },
  doneButton: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#1A1A1A',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Dropdown styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dropdownContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 0,
    minWidth: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    minHeight: 60,
  },
  dropdownItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dropdownItemText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#1A1A1A',
    marginLeft: 12,
  },
  dropdownSeparator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 24,
  },
  deleteItem: {
    // No additional styles needed, handled by deleteText
  },
  deleteText: {
    color: '#FF4444',
  },
});
