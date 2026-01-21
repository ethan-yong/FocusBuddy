# FocusBuddy - Setup Guide

## Overview

FocusBuddy is a production-ready React Native app built with Expo and TypeScript. This guide will help you get started with development.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Expo Go app installed on your Android device (for testing)
- Or Android Studio with an emulator configured

## Installation

The project is already initialized. If you need to reinstall dependencies:

```bash
npm install
```

## Running the App

### Start the Development Server

```bash
npm start
```

This will start the Expo development server and display a QR code.

### Run on Android

**Option 1: Using Expo Go (Recommended for Quick Testing)**
1. Install the Expo Go app from Google Play Store
2. Run `npm start`
3. Scan the QR code with the Expo Go app

**Option 2: Using Android Emulator**
1. Ensure Android Studio and an emulator are set up
2. Run the emulator
3. Run `npm run android`

**Option 3: Press 'a' in Terminal**
After running `npm start`, press `a` in the terminal to automatically open the app in your emulator.

## Project Structure

```
FocusBuddy/
├── src/
│   ├── screens/          # Screen components (main app pages)
│   │   └── HomeScreen.tsx
│   ├── components/       # Reusable UI components
│   ├── services/         # API calls, data fetching, business logic
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Helper functions and utilities
│   └── navigation/       # Navigation configuration
│       └── AppNavigator.tsx
├── App.tsx               # App entry point
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Folder Responsibilities

- **screens/**: Full-page components that represent different screens in the app
- **components/**: Reusable UI components (buttons, cards, inputs, etc.)
- **services/**: Business logic, API integrations, data management
- **hooks/**: Custom React hooks for shared logic
- **utils/**: Pure utility functions (formatters, validators, etc.)
- **navigation/**: React Navigation setup and route configuration

## TypeScript Path Aliases

The project is configured with path aliases for cleaner imports:

```typescript
// Instead of:
import HomeScreen from '../../../screens/HomeScreen';

// You can use:
import HomeScreen from '@/screens/HomeScreen';
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm run web` - Run in web browser

## Navigation

The app uses React Navigation with a Stack Navigator. Navigation is configured in `src/navigation/AppNavigator.tsx`.

### Adding a New Screen

1. Create a new screen component in `src/screens/`
2. Add the screen to `RootStackParamList` type in `AppNavigator.tsx`
3. Add a `Stack.Screen` component in the navigator

Example:

```typescript
// In AppNavigator.tsx
export type RootStackParamList = {
  Home: undefined;
  NewScreen: { userId: string }; // Add your screen
};

// In the Stack.Navigator
<Stack.Screen 
  name="NewScreen" 
  component={NewScreenComponent}
  options={{ title: 'New Screen' }}
/>
```

## Next Steps

Now that the foundation is set up, you can start building features:

1. **Authentication**: Create Login and Signup screens
2. **Task Tracking**: Build task creation and management features
3. **Social Features**: Implement friend connections and progress sharing
4. **AI Insights**: Integrate AI-driven productivity insights
5. **Gamification**: Add streaks, badges, and reflective prompts

## Troubleshooting

### App won't start
- Clear the cache: `npx expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### TypeScript errors
- Restart the TypeScript server in your IDE
- Check `tsconfig.json` is properly configured

### Navigation not working
- Ensure all React Navigation packages are installed
- Check that NavigationContainer wraps the entire app

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [React Native Docs](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Development Tips

1. Use Expo Go for rapid testing without rebuilding
2. Enable Fast Refresh for instant updates during development
3. Use TypeScript strictly to catch errors early
4. Keep components small and focused
5. Organize imports: React → Third-party → Local
6. Use meaningful commit messages for version control

---

**Happy coding! 🚀**
