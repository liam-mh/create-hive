import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { COLOURS, SIZES } from '@/styles';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLOURS.primary,
        headerTintColor: COLOURS.primary,
        headerShadowVisible: false
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{ 
          title: 'Home', 
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} color={color} size={SIZES.l} />
          ),
        }}/>
      <Tabs.Screen 
        name="explore" 
        options={{ 
          title: 'Explore', 
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'map-marker' : 'map-marker-outline'} color={color} size={SIZES.l} />
          ),
        }}/>
    </Tabs>
  );
}