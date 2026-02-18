export const PROFILE_SECTIONS = {
    inviteFriends: {
        title: 'Refer a friend and earn $10',
        description: 'Earn $10 per friend that signs up with your promo code.',
    },
    account: [
        {
            id: 'personal-details',
            title: 'Personal Details',
            icon: 'id-card',
            route: 'PersonalDetails',
        },
        {
            id: 'preferences',
            title: 'Preferences',
            icon: 'settings',
            route: 'Preferences',
        },
        {
            id: 'language',
            title: 'Language',
            icon: 'globe',
            route: 'Language',
        },
        {
            id: 'family-plan',
            title: 'Upgrade to Family Plan',
            icon: 'users',
            route: null,
        },
    ],
    goalsTracking: [
        {
            id: 'apple-health',
            title: 'Apple Health',
            icon: 'heart',
            status: 'Connected',
            isConnected: true,
        },
    ],
    accountActions: [
        {
            id: 'logout',
            title: 'Logout',
            icon: 'log-out',
            status: 'Logout',
            isConnected: false,
        },
        {
            id: 'delete-account',
            title: 'Delete Account',
            icon: 'trash-2',
            status: 'Delete',
            isConnected: false,
            isDanger: true,
        },
    ],
};