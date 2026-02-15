import { create } from 'zustand';
import { storage } from '../../../utils/storage';
import { DashboardState, DashboardData } from '../types';
import { dashboardService, isApiError, getErrorMessage } from '../services/dashboard-service';
import { useAuthStore } from '../../auth/stores/authStore';

// Using safe storage wrapper that handles AsyncStorage errors

export const useDashboardStore = create<DashboardState>((set, get) => ({
    data: null,
    selectedDate: new Date().toISOString().split('T')[0] || '',
    isLoading: false,
    isRefreshing: false,
    error: null,

    loadDashboard: async (date: string) => {
        set({ isLoading: true, error: null });
        try {
            const user = useAuthStore.getState().user;
            const response = await dashboardService.getDashboardData(date, user?.id);

            console.log('Dashboard data loaded successfully:', response.data);

            // Cache dashboard data
            await storage.setItem(`dashboard_${date}`, JSON.stringify(response.data));

            set({
                data: response.data,
                selectedDate: date,
                isLoading: false,
                error: null,
            });
        } catch (error) {
            console.error('Failed to load dashboard:', error);

            // Try to load cached data as fallback
            try {
                const cachedData = await storage.getItem(`dashboard_${date}`);
                if (cachedData) {
                    const parsedData = JSON.parse(cachedData) as DashboardData;
                    set({
                        data: parsedData,
                        selectedDate: date,
                        isLoading: false,
                        error: 'Using cached data - network unavailable',
                    });
                    return;
                }
            } catch (cacheError) {
                console.warn('Failed to load cached dashboard data:', cacheError);
            }

            const errorMessage = getErrorMessage(error);
            set({
                isLoading: false,
                error: errorMessage,
            });
        }
    },

    refreshDashboard: async () => {
        const { selectedDate } = get();
        set({ isRefreshing: true, error: null });

        try {
            const user = useAuthStore.getState().user;
            const response = await dashboardService.getDashboardData(selectedDate, user?.id);

            console.log('Dashboard data refreshed successfully:', response.data);

            // Update cache
            await storage.setItem(`dashboard_${selectedDate}`, JSON.stringify(response.data));

            set({
                data: response.data,
                isRefreshing: false,
                error: null,
            });
        } catch (error) {
            console.error('Failed to refresh dashboard:', error);

            const errorMessage = getErrorMessage(error);
            set({
                isRefreshing: false,
                error: errorMessage,
            });
        }
    },

    setSelectedDate: (date: string) => {
        const currentState = get();
        if (currentState.selectedDate !== date) {
            set({ selectedDate: date });
            // Auto-load data for new date
            currentState.loadDashboard(date);
        }
    },

    clearError: () => {
        set({ error: null });
    },
}));

// Initialize dashboard store
const initializeDashboardStore = async (): Promise<void> => {
    try {
        const today = new Date().toISOString().split('T')[0] || '';

        // Try to load cached data first for faster initial load
        const cachedData = await storage.getItem(`dashboard_${today}`);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData) as DashboardData;
            useDashboardStore.setState({
                data: parsedData,
                selectedDate: today,
                isLoading: false,
                error: null,
            });

            console.log('Dashboard store initialized with cached data');
        }

        // Then load fresh data in the background
        useDashboardStore.getState().loadDashboard(today);
    } catch (error) {
        console.warn('Failed to initialize dashboard store:', error);
        // Load fresh data if cache fails
        const today = new Date().toISOString().split('T')[0] || '';
        useDashboardStore.getState().loadDashboard(today);
    }
};

// Initialize on module load
initializeDashboardStore();