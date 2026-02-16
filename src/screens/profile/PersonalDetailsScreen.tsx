import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Modal,
    TextInput,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Edit2, X } from 'lucide-react-native';
import { tokens } from '../../theme/tokens';
import { ProfileStackParamList } from '../../features/meal/types';
import { useAuthStore } from '../../features/auth/stores/authStore';

type PersonalDetailsScreenNavigationProp = NativeStackNavigationProp<
    ProfileStackParamList,
    'PersonalDetails'
>;

interface DetailField {
    id: string;
    label: string;
    value: string | number;
    unit?: string;
    editable: boolean;
    isGoal?: boolean;
    type?: 'number' | 'text' | 'select';
}

const PersonalDetailsScreen: React.FC = () => {
    const navigation = useNavigation<PersonalDetailsScreenNavigationProp>();
    const { user, updateUser } = useAuthStore();

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [goalModalVisible, setGoalModalVisible] = useState(false);
    const [selectedField, setSelectedField] = useState<DetailField | null>(null);
    const [editValue, setEditValue] = useState('');
    const [genderModalVisible, setGenderModalVisible] = useState(false);

    const [fields, setFields] = useState<DetailField[]>([
        {
            id: 'goalWeight',
            label: 'Goal Weight',
            value: user?.goalWeight || 0,
            unit: 'kg',
            editable: false,
            isGoal: true,
            type: 'number',
        },
        {
            id: 'currentWeight',
            label: 'Current weight',
            value: user?.currentWeight || 0,
            unit: 'kg',
            editable: true,
            type: 'number',
        },
        {
            id: 'height',
            label: 'Height',
            value: user?.height || 0,
            unit: 'cm',
            editable: true,
            type: 'number',
        },
        {
            id: 'dateOfBirth',
            label: 'Date of birth',
            value: user?.dateOfBirth || '',
            editable: true,
            type: 'text',
        },
        {
            id: 'gender',
            label: 'Gender',
            value: user?.gender === 'male' ? 'Male' : user?.gender === 'female' ? 'Female' : '',
            editable: true,
            type: 'select',
        },
        {
            id: 'dailyStepGoal',
            label: 'Daily step goal',
            value: user?.dailyStepGoal || 0,
            unit: 'steps',
            editable: true,
            type: 'number',
        },
    ]);

    useEffect(() => {
        setFields([
            {
                id: 'goalWeight',
                label: 'Goal Weight',
                value: user?.goalWeight || 0,
                unit: 'kg',
                editable: false,
                isGoal: true,
                type: 'number',
            },
            {
                id: 'currentWeight',
                label: 'Current weight',
                value: user?.currentWeight || 0,
                unit: 'kg',
                editable: true,
                type: 'number',
            },
            {
                id: 'height',
                label: 'Height',
                value: user?.height || 0,
                unit: 'cm',
                editable: true,
                type: 'number',
            },
            {
                id: 'dateOfBirth',
                label: 'Date of birth',
                value: user?.dateOfBirth || '',
                editable: true,
                type: 'text',
            },
            {
                id: 'gender',
                label: 'Gender',
                value: user?.gender === 'male' ? 'Male' : user?.gender === 'female' ? 'Female' : '',
                editable: true,
                type: 'select',
            },
            {
                id: 'dailyStepGoal',
                label: 'Daily step goal',
                value: user?.dailyStepGoal || 0,
                unit: 'steps',
                editable: true,
                type: 'number',
            },
        ]);
    }, [user]);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleEdit = (field: DetailField) => {
        if (field.type === 'select' && field.id === 'gender') {
            setGenderModalVisible(true);
            setSelectedField(field);
        } else {
            setSelectedField(field);
            setEditValue(field.value.toString());
            setEditModalVisible(true);
        }
    };

    const handleChangeGoal = () => {
        const goalField = fields.find(f => f.id === 'goalWeight');
        if (goalField) {
            setSelectedField(goalField);
            setEditValue(goalField.value.toString());
            setGoalModalVisible(true);
        }
    };

    const handleSave = async () => {
        if (!selectedField || !user) return;

        try {
            let updateData: any = {};

            switch (selectedField.id) {
                case 'currentWeight':
                    const weight = parseFloat(editValue);
                    if (isNaN(weight) || weight <= 0) {
                        Alert.alert('Invalid Input', 'Please enter a valid weight');
                        return;
                    }
                    updateData = { currentWeight: weight, weight: weight };
                    break;
                case 'height':
                    const height = parseFloat(editValue);
                    if (isNaN(height) || height <= 0) {
                        Alert.alert('Invalid Input', 'Please enter a valid height');
                        return;
                    }
                    updateData = { height };
                    break;
                case 'dateOfBirth':
                    updateData = { dateOfBirth: editValue };
                    break;
                case 'dailyStepGoal':
                    const steps = parseInt(editValue);
                    if (isNaN(steps) || steps <= 0) {
                        Alert.alert('Invalid Input', 'Please enter a valid step goal');
                        return;
                    }
                    updateData = { dailyStepGoal: steps };
                    break;
                case 'goalWeight':
                    const goalWeight = parseFloat(editValue);
                    if (isNaN(goalWeight) || goalWeight <= 0) {
                        Alert.alert('Invalid Input', 'Please enter a valid goal weight');
                        return;
                    }
                    updateData = { goalWeight };
                    break;
            }

            await updateUser(updateData);
            setEditModalVisible(false);
            setGoalModalVisible(false);
            Alert.alert('Success', 'Your details have been updated');
        } catch (error) {
            Alert.alert('Error', 'Failed to update details. Please try again.');
        }
    };

    const handleGenderSelect = async (gender: 'male' | 'female') => {
        try {
            await updateUser({ gender });
            setGenderModalVisible(false);
            Alert.alert('Success', 'Gender updated successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to update gender. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={tokens.colors.neutral.white} />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <ArrowLeft size={24} color={tokens.colors.neutral.gray900} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Personal Details</Text>
                <View style={styles.headerRight} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.goalCard}>
                    <View style={styles.goalContent}>
                        <Text style={styles.goalLabel}>Goal Weight</Text>
                        <Text style={styles.goalValue}>
                            {user?.goalWeight || 0} kg
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.changeGoalButton} onPress={handleChangeGoal}>
                        <Text style={styles.changeGoalText}>Change Goal</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.fieldsList}>
                    <View style={styles.fieldRow}>
                        <Text style={styles.fieldLabel}>Current weight</Text>
                        <View style={styles.fieldRight}>
                            <Text style={styles.fieldValue}>
                                {user?.currentWeight || 0} kg
                            </Text>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => fields[1] && handleEdit(fields[1])}
                            >
                                <Edit2 size={20} color={tokens.colors.neutral.gray500} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldRow}>
                        <Text style={styles.fieldLabel}>Height</Text>
                        <View style={styles.fieldRight}>
                            <Text style={styles.fieldValue}>
                                {user?.height || 0} cm
                            </Text>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => fields[2] && handleEdit(fields[2])}
                            >
                                <Edit2 size={20} color={tokens.colors.neutral.gray500} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldRow}>
                        <Text style={styles.fieldLabel}>Date of birth</Text>
                        <View style={styles.fieldRight}>
                            <Text style={styles.fieldValue}>
                                {user?.dateOfBirth || ''}
                            </Text>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => fields[3] && handleEdit(fields[3])}
                            >
                                <Edit2 size={20} color={tokens.colors.neutral.gray500} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldRow}>
                        <Text style={styles.fieldLabel}>Gender</Text>
                        <View style={styles.fieldRight}>
                            <Text style={styles.fieldValue}>
                                {user?.gender === 'male' ? 'Male' : user?.gender === 'female' ? 'Female' : ''}
                            </Text>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => fields[4] && handleEdit(fields[4])}
                            >
                                <Edit2 size={20} color={tokens.colors.neutral.gray500} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.fieldRow, styles.lastFieldRow]}>
                        <Text style={styles.fieldLabel}>Daily step goal</Text>
                        <View style={styles.fieldRight}>
                            <Text style={styles.fieldValue}>
                                {user?.dailyStepGoal || 0} steps
                            </Text>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => fields[5] && handleEdit(fields[5])}
                            >
                                <Edit2 size={20} color={tokens.colors.neutral.gray500} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomSpacing} />
            </ScrollView>

            <Modal
                visible={editModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                Edit {selectedField?.label}
                            </Text>
                            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                                <X size={24} color={tokens.colors.neutral.gray600} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.input}
                            value={editValue}
                            onChangeText={setEditValue}
                            placeholder={`Enter ${selectedField?.label}`}
                            keyboardType={selectedField?.type === 'number' ? 'numeric' : 'default'}
                            autoFocus
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setEditModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={handleSave}
                            >
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={goalModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setGoalModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Change Goal Weight</Text>
                            <TouchableOpacity onPress={() => setGoalModalVisible(false)}>
                                <X size={24} color={tokens.colors.neutral.gray600} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.input}
                            value={editValue}
                            onChangeText={setEditValue}
                            placeholder="Enter goal weight"
                            keyboardType="numeric"
                            autoFocus
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setGoalModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={handleSave}
                            >
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={genderModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setGenderModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Gender</Text>
                            <TouchableOpacity onPress={() => setGenderModalVisible(false)}>
                                <X size={24} color={tokens.colors.neutral.gray600} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.genderOptions}>
                            <TouchableOpacity
                                style={styles.genderOption}
                                onPress={() => handleGenderSelect('male')}
                            >
                                <Text style={styles.genderOptionText}>Male</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.genderOption}
                                onPress={() => handleGenderSelect('female')}
                            >
                                <Text style={styles.genderOptionText}>Female</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.genderCancelButton}
                            onPress={() => setGenderModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: tokens.colors.neutral.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        borderBottomWidth: 1,
        borderBottomColor: tokens.colors.neutral.gray100,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: tokens.colors.neutral.gray100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: tokens.typography.fontSize.lg,
        fontWeight: tokens.typography.fontWeight.semibold,
        color: tokens.colors.neutral.gray900,
    },
    headerRight: {
        width: 40,
    },
    scrollView: {
        flex: 1,
        backgroundColor: tokens.colors.neutral.gray50,
    },
    goalCard: {
        backgroundColor: tokens.colors.neutral.white,
        marginHorizontal: tokens.spacing[4],
        marginTop: tokens.spacing[5],
        marginBottom: tokens.spacing[1],
        padding: tokens.spacing[5],
        borderRadius: tokens.borderRadius.xl,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...tokens.shadows.sm,
    },
    goalContent: {
        flex: 1,
    },
    goalLabel: {
        fontSize: tokens.typography.fontSize.base,
        fontWeight: tokens.typography.fontWeight.medium,
        color: tokens.colors.neutral.gray900,
        marginBottom: 6,
    },
    goalValue: {
        fontSize: tokens.typography.fontSize['3xl'],
        fontWeight: tokens.typography.fontWeight.bold,
        color: tokens.colors.neutral.gray900,
    },
    changeGoalButton: {
        backgroundColor: tokens.colors.neutral.gray900,
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[2] + 2,
        borderRadius: tokens.borderRadius.md,
    },
    changeGoalText: {
        fontSize: tokens.typography.fontSize.sm,
        fontWeight: tokens.typography.fontWeight.semibold,
        color: tokens.colors.neutral.white,
    },
    fieldsList: {
        backgroundColor: tokens.colors.neutral.white,
        marginTop: tokens.spacing[1],
    },
    fieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[5],
        borderBottomWidth: 1,
        borderBottomColor: tokens.colors.neutral.gray100,
    },
    lastFieldRow: {
        borderBottomWidth: 0,
    },
    fieldLabel: {
        fontSize: tokens.typography.fontSize.base,
        fontWeight: tokens.typography.fontWeight.normal,
        color: tokens.colors.neutral.gray900,
    },
    fieldRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing[3],
    },
    fieldValue: {
        fontSize: tokens.typography.fontSize.lg,
        fontWeight: tokens.typography.fontWeight.bold,
        color: tokens.colors.neutral.gray900,
    },
    editButton: {
        padding: tokens.spacing[1],
    },
    bottomSpacing: {
        height: tokens.spacing[8],
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: tokens.spacing[4],
    },
    modalContent: {
        backgroundColor: tokens.colors.neutral.white,
        borderRadius: tokens.borderRadius.xl,
        padding: tokens.spacing[6],
        width: '100%',
        maxWidth: 400,
        ...tokens.shadows.lg,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: tokens.spacing[4],
    },
    modalTitle: {
        fontSize: tokens.typography.fontSize.xl,
        fontWeight: tokens.typography.fontWeight.bold,
        color: tokens.colors.neutral.gray900,
    },
    input: {
        borderWidth: 1,
        borderColor: tokens.colors.neutral.gray300,
        borderRadius: tokens.borderRadius.lg,
        padding: tokens.spacing[3],
        fontSize: tokens.typography.fontSize.base,
        color: tokens.colors.neutral.gray900,
        marginBottom: tokens.spacing[4],
    },
    modalButtons: {
        flexDirection: 'row',
        gap: tokens.spacing[3],
    },
    modalButton: {
        flex: 1,
        paddingVertical: tokens.spacing[3],
        borderRadius: tokens.borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: tokens.colors.neutral.gray200,
    },
    cancelButtonText: {
        fontSize: tokens.typography.fontSize.base,
        fontWeight: tokens.typography.fontWeight.semibold,
        color: tokens.colors.neutral.gray700,
    },
    saveButton: {
        backgroundColor: tokens.colors.neutral.gray900,
    },
    saveButtonText: {
        fontSize: tokens.typography.fontSize.base,
        fontWeight: tokens.typography.fontWeight.semibold,
        color: tokens.colors.neutral.white,
    },
    genderOptions: {
        marginBottom: tokens.spacing[4],
    },
    genderOption: {
        paddingVertical: tokens.spacing[4],
        paddingHorizontal: tokens.spacing[4],
        borderRadius: tokens.borderRadius.lg,
        backgroundColor: tokens.colors.neutral.gray100,
        marginBottom: tokens.spacing[3],
        alignItems: 'center',
    },
    genderOptionText: {
        fontSize: tokens.typography.fontSize.base,
        fontWeight: tokens.typography.fontWeight.semibold,
        color: tokens.colors.neutral.gray900,
    },
    genderCancelButton: {
        width: '100%',
        paddingVertical: tokens.spacing[3],
        borderRadius: tokens.borderRadius.lg,
        backgroundColor: tokens.colors.neutral.gray200,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PersonalDetailsScreen;
