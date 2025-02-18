import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00626B',
        headerTintColor: '#00626B',
        headerShadowVisible: false
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{ 
          title: 'Home', 
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} color={color} size={24} />
          ),
        }}/>
      <Tabs.Screen 
        name="explore" 
        options={{ 
          title: 'Explore', 
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'map-marker' : 'map-marker-outline'} color={color} size={24} />
          ),
        }}/>
    </Tabs>
  );
}