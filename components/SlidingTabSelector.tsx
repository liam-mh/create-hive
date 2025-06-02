import { COLOURS, CORNERS, UNIT } from '@/styles';
import { ButtonStateConfig } from '@/types/Button';
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { getIcon } from '@/utils/iconUtils'; 

interface SlidingTabSelectorProps {
  tabs: ButtonStateConfig[];
  initialIndex?: number;
  style?: StyleProp<ViewStyle>;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  sliderColor?: string;
  noBorder?: boolean;
}

const SlidingTabSelector: React.FC<SlidingTabSelectorProps> = ({
  tabs,
  initialIndex = 0,
  style,
  activeColor = COLOURS.primary,
  inactiveColor = COLOURS.primary,
  backgroundColor = COLOURS.offwhite,
  sliderColor = COLOURS.white,
  noBorder = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [containerWidth, setContainerWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const tabWidth = containerWidth / tabs.length;

  useEffect(() => {
    translateX.setValue(initialIndex * tabWidth);
  }, [initialIndex, tabWidth]);

  const handleTabPress = (index: number) => {
    setSelectedIndex(index);
    Animated.spring(translateX, {
      toValue: index * tabWidth,
      useNativeDriver: true,
    }).start();

    tabs[index]?.onPress?.();
  };

  return (
    <View
      style={[
        {
          padding: UNIT / 4,
          backgroundColor,
          borderRadius: noBorder ? undefined : CORNERS.default,
        },
        style,
      ]}
    >
      <View
        style={styles.container}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        {containerWidth > 0 && (
          <Animated.View
            style={[
              styles.slider,
              {
                backgroundColor: sliderColor,
                width: tabWidth,
                transform: [{ translateX }],
              },
            ]}
          />
        )}

        {tabs.map((tab, index) => {
          const isActive = selectedIndex === index;
          return (
            <TouchableOpacity
              key={index}
              style={styles.tab}
              onPress={() => handleTabPress(index)}
            >
              {tab.icon &&
                getIcon(
                  tab.icon,
                  UNIT * 1.25,
                  isActive ? activeColor : inactiveColor
                )}
              {tab.text && (
                <Text
                  style={{
                    color: isActive ? activeColor : inactiveColor,
                    fontWeight: isActive ? '700' : '500',
                    marginTop: tab.icon ? 4 : 0,
                  }}
                >
                  {tab.text}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    padding: UNIT / 2,
    borderRadius: CORNERS.default,
    overflow: 'hidden',
    gap: UNIT
  },
  slider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: CORNERS.default,
    zIndex: 0,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default SlidingTabSelector;