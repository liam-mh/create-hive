import { Tabs } from "expo-router";
import { COLOURS } from '@/styles';
import { getIcon } from "@/utils/iconUtils";

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
          tabBarIcon: ({ color, focused }) => {
            return !focused 
              ? getIcon('houseDoor', undefined, color) 
              : getIcon('houseDoorFill', undefined, color);
          },
        }}
      />
      <Tabs.Screen 
        name="search"
        options={{ 
          title: 'Search', 
          tabBarIcon: ({ color, focused }) => {
            return !focused 
              ? getIcon('search', undefined, color) 
              : getIcon('search', undefined, color);
          },
        }}
      />
      <Tabs.Screen 
        name="create"
        options={{ 
          title: 'Create', 
          tabBarIcon: ({ color, focused }) => {
            return !focused 
              ? getIcon('plusSquare', undefined, color) 
              : getIcon('plusSquareFill', undefined, color);
          },
        }}
      />
      <Tabs.Screen 
        name="explore"
        options={{ 
          title: 'Explore', 
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return !focused 
              ? getIcon('geoAlt', undefined, color) 
              : getIcon('geoAltFill', undefined, color);
          },
        }}
      />
      <Tabs.Screen 
        name="more"
        options={{ 
          title: 'More', 
          tabBarIcon: ({ color, focused }) => {
            return !focused 
              ? getIcon('person', undefined, color) 
              : getIcon('personFill', undefined, color);
          },
        }}
      />
      <Tabs.Screen 
        name="eventInformation"
        options={{ 
          headerShown: false,
          href: null
        }}
      />
    </Tabs>
  );
}