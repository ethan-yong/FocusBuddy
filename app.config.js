export default {
  expo: {
    name: "FocusBuddy",
    slug: "FocusBuddy",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.focusbuddy.app"
    },
    android: {
      package: "com.focusbuddy.app",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      EXPO_PUBLIC_SUPABASE_URL: "https://iujwklkgtrpwvvrsdckw.supabase.co",
      EXPO_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1andrbGtndHJwd3Z2cnNkY2t3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTM1NzksImV4cCI6MjA4NDQ2OTU3OX0.mBeCAIPe0nm7WjbObhb_0zSAtY6SIqfDVuhk4_fj5lw"
    }
  }
}
