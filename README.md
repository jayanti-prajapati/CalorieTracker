# 🍎 CalorieTracker - AI-Powered Nutrition App

A modern React Native application for tracking calories and nutrition with AI-powered food recognition, built with TypeScript and featuring a beautiful, intuitive user interface.

## ✨ Features

### 📸 Smart Food Scanning
- **Camera Integration**: Scan food items, barcodes, and nutrition labels
- **AI Recognition**: Advanced AI identifies food and calculates calories automatically
- **Simulation Mode**: Fallback UI for development and testing without camera access
- **Image Library**: Select food images from photo library

### 📊 Comprehensive Dashboard
- **Daily Overview**: Track calories, protein, carbs, and fat intake
- **Progress Visualization**: Beautiful charts and progress indicators
- **15-Day Calendar**: Navigate through past and future dates with auto-centering
- **Meal History**: View recent meals with elegant card-based layout

### 🎨 Modern UI/UX
- **Design System**: Consistent typography, colors, and spacing tokens
- **Lucide Icons**: Professional vector icons throughout the app
- **Elegant Components**: Reusable UI components with proper styling
- **Responsive Design**: Optimized for various screen sizes

### 🔐 Authentication & Onboarding
- **User Authentication**: Secure login and registration system
- **Onboarding Flow**: Guided setup for new users
- **Profile Management**: User preferences and goal setting

## 🏗️ Architecture

### Tech Stack
- **React Native 0.84** - Cross-platform mobile development
- **TypeScript** - Type-safe development
- **Zustand** - Lightweight state management
- **React Navigation** - Navigation and routing
- **Lucide React Native** - Modern icon system

### Project Structure
```
src/
├── components/ui/          # Reusable UI components
├── features/
│   ├── dashboard/         # Dashboard screens and components
│   ├── meal/             # Meal tracking functionality
│   └── auth/             # Authentication features
├── navigation/           # Navigation configuration
├── store/               # State management (Zustand)
├── theme/               # Design system and tokens
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

### Key Components
- **MealCard**: Elegant 40/60 layout with image and nutrition info
- **WeeklyCalendar**: 15-day scrollable calendar with auto-centering
- **CameraSimulation**: Fallback UI for camera functionality
- **Design System**: Comprehensive theming and component library

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native development environment
- iOS Simulator or Android Emulator
- Xcode (for iOS development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CalorieTracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   # or
   npx react-native start --reset-cache
   ```

5. **Run the app**
   ```bash
   # iOS
   npm run ios
   # or
   yarn ios
   
   # Android
   npm run android
   # or
   yarn android
   ```

## 📱 App Flow

### Navigation Structure
- **Landing Screen**: Welcome and app introduction
- **Authentication**: Sign in/Sign up flow
- **Main Tab Navigator**:
  - 🏠 **Home**: Dashboard with daily overview
  - 📊 **Progress**: Nutrition tracking and analytics
  - ➕ **Add Meal**: Camera-based food scanning
  - 👥 **Groups**: Social features (coming soon)
  - 👤 **Profile**: User settings and preferences

### Key User Journeys
1. **Onboarding**: Welcome → Sign Up → Profile Setup → Dashboard
2. **Add Meal**: Camera Scan → Food Recognition → Nutrition Review → Save
3. **Track Progress**: Dashboard → Calendar Navigation → Meal History → Analytics

## 🎨 Design System

### Color Palette
- **Primary**: Black (#1A1A1A) for active states and emphasis
- **Secondary**: Gray scale (#F8F9FA to #212529) for hierarchy
- **Accent**: Orange (#E65100) for calories and important actions
- **Semantic**: Themed colors for macros (brown, gold, blue)

### Typography
- **Headings**: Bold weights (600-700) for hierarchy
- **Body**: Regular (400-500) for readability
- **Captions**: Light (300-400) for secondary information

### Components
- **Cards**: Rounded corners (16-20px) with subtle shadows
- **Buttons**: Consistent padding and border radius
- **Icons**: 24px standard size, 14-16px for inline elements

## 🔧 Development

### State Management
Using Zustand for lightweight, TypeScript-friendly state management:
- **Auth Store**: User authentication and profile data
- **Dashboard Store**: Daily nutrition and meal data
- **Meal Store**: Food entries and nutrition calculations

### Navigation
React Navigation v6 with TypeScript support:
- Stack navigation for auth flow
- Tab navigation for main app
- Proper type definitions for all routes

### Styling
- **StyleSheet**: React Native's built-in styling
- **Design Tokens**: Centralized theme configuration
- **Responsive**: Flexible layouts that adapt to screen sizes

## 📦 Dependencies

### Core
- `react-native`: ^0.84.0
- `react`: ^18.3.1
- `typescript`: ^5.0.4

### Navigation & UI
- `@react-navigation/native`: Navigation framework
- `@react-navigation/bottom-tabs`: Tab navigation
- `lucide-react-native`: Modern icon system

### Camera & Media
- `react-native-vision-camera`: Camera functionality
- `react-native-image-picker`: Image selection

### State & Storage
- `zustand`: State management
- `@react-native-async-storage/async-storage`: Local storage

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler cache issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **iOS build issues**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Module resolution errors**
   - Check import paths and ensure files exist
   - Verify TypeScript configuration in `tsconfig.json`

4. **Camera permissions**
   - Ensure proper permissions in `Info.plist` (iOS)
   - Test with simulation mode if camera unavailable

## 🚧 Future Enhancements

- [ ] Barcode scanning integration
- [ ] Nutrition label OCR
- [ ] Social features and meal sharing
- [ ] Advanced analytics and insights
- [ ] Meal planning and recommendations
- [ ] Integration with fitness trackers
- [ ] Offline mode support

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ using React Native and TypeScript
