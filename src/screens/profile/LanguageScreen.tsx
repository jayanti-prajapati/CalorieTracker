import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Check } from 'lucide-react-native';
import { tokens } from '../../theme/tokens';
import { ProfileStackParamList } from '../../features/meal/types';

type LanguageScreenNavigationProp = NativeStackNavigationProp<
    ProfileStackParamList,
    'Language'
>;

interface Language {
    id: string;
    name: string;
    flag: string;
}

const LANGUAGES: Language[] = [
    { id: 'en', name: 'English', flag: '🇺🇸' },
    { id: 'es', name: 'Spanish', flag: '🇪🇸' },
    { id: 'hi', name: 'Hindi', flag: '🇮🇳' },
];

const LanguageScreen: React.FC = () => {
    const navigation = useNavigation<LanguageScreenNavigationProp>();
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const handleBack = () => {
        navigation.goBack();
    };

    const handleSelectLanguage = (languageId: string) => {
        setSelectedLanguage(languageId);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={tokens.colors.neutral.white} />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <ArrowLeft size={24} color={tokens.colors.neutral.gray900} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Choose Language</Text>
                <View style={styles.headerRight} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.languageList}>
                    {LANGUAGES.map((language) => (
                        <TouchableOpacity
                            key={language.id}
                            style={[
                                styles.languageOption,
                                selectedLanguage === language.id && styles.selectedLanguageOption,
                            ]}
                            onPress={() => handleSelectLanguage(language.id)}
                        >
                            <View style={styles.languageContent}>
                                <Text style={styles.flag}>{language.flag}</Text>
                                <Text
                                    style={[
                                        styles.languageName,
                                        selectedLanguage === language.id && styles.selectedLanguageName,
                                    ]}
                                >
                                    {language.name}
                                </Text>
                            </View>
                            {selectedLanguage === language.id && (
                                <Check size={20} color={tokens.colors.neutral.white} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: tokens.colors.neutral.gray50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        backgroundColor: tokens.colors.neutral.white,
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
    },
    languageList: {
        padding: tokens.spacing[4],
        gap: tokens.spacing[3],
    },
    languageOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: tokens.colors.neutral.white,
        paddingVertical: tokens.spacing[4],
        paddingHorizontal: tokens.spacing[5],
        borderRadius: tokens.borderRadius.xl,
        ...tokens.shadows.sm,
    },
    selectedLanguageOption: {
        backgroundColor: tokens.colors.neutral.gray900,
    },
    languageContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing[3],
    },
    flag: {
        fontSize: 24,
    },
    languageName: {
        fontSize: tokens.typography.fontSize.base,
        fontWeight: tokens.typography.fontWeight.medium,
        color: tokens.colors.neutral.gray900,
    },
    selectedLanguageName: {
        color: tokens.colors.neutral.white,
    },
});

export default LanguageScreen;
