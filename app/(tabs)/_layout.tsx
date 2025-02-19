import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLOURS, SIZES } from '@/styles';

import IconHouse from '@/assets/icons/house-door.svg';
import IconHouseFill from '@/assets/icons/house-door-fill.svg';
import IconPin from '@/assets/icons/geo-alt.svg';
import IconPinFill from '@/assets/icons/geo-alt-fill.svg';
import IconSearch from '@/assets/icons/search.svg';
import IconCreate from '@/assets/icons/plus-square.svg';
import IconCreateFill from '@/assets/icons/plus-square-fill.svg';
import IconPerson from '@/assets/icons/person.svg';
import IconPersonFill from '@/assets/icons/person-fill.svg';

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
            focused ? 
              <IconHouseFill width={SIZES.l} height={SIZES.l} fill={color} /> 
              : 
              <IconHouse width={SIZES.l} height={SIZES.l} fill={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="search"
        options={{ 
          title: 'Search', 
          tabBarIcon: ({ color, focused }) => (
            focused ? 
              <IconSearch width={SIZES.l} height={SIZES.l} fill={color} /> 
              : 
              <IconSearch width={SIZES.l} height={SIZES.l} fill={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="create"
        options={{ 
          title: 'Create', 
          tabBarIcon: ({ color, focused }) => (
            focused ? 
              <IconCreateFill width={SIZES.l} height={SIZES.l} fill={color} /> 
              : 
              <IconCreate width={SIZES.l} height={SIZES.l} fill={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="explore"
        options={{ 
          title: 'Explore', 
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            focused ? 
              <IconPinFill width={SIZES.l} height={SIZES.l} fill={color} /> 
              : 
              <IconPin width={SIZES.l} height={SIZES.l} fill={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="more"
        options={{ 
          title: 'More', 
          tabBarIcon: ({ color, focused }) => (
            focused ? 
              <IconPersonFill width={SIZES.l} height={SIZES.l} fill={color} /> 
              : 
              <IconPerson width={SIZES.l} height={SIZES.l} fill={color} />
          ),
        }}
      />
    </Tabs>
  );
}