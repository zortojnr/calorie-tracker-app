import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="add-food" 
        options={{ 
          presentation: "modal",
          title: "Add New Food",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }} 
      />
      <Stack.Screen 
        name="add-entry" 
        options={{ 
          presentation: "modal",
          title: "Add Food to Meal",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }} 
      />
      <Stack.Screen 
        name="food-details" 
        options={{ 
          title: "Food Details",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }} 
      />
    </Stack>
  );
}