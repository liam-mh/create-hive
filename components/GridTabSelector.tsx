import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLOURS, CORNERS, UNIT } from '@/styles';
import { ButtonStateConfig } from '@/types/Button';
import { getIcon } from '@/utils/iconUtils';

interface GridTabSelectorProps {
  tabs: ButtonStateConfig[];
  columns?: number;
  initialIndex?: number;
  style?: StyleProp<ViewStyle>;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  sliderColor?: string;
  noBorder?: boolean;
  allowMultiple?: boolean; // NEW PROP
}

const GridTabSelector: React.FC<GridTabSelectorProps> = ({
  tabs,
  columns = 3,
  initialIndex,
  style,
  activeColor = COLOURS.primary,
  inactiveColor = COLOURS.primary,
  backgroundColor = COLOURS.offwhite,
  sliderColor = COLOURS.white,
  noBorder = false,
  allowMultiple = false, // default: single select
}) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>(
    initialIndex !== undefined ? [initialIndex] : []
  );

  const isSelected = (index: number) => selectedIndices.includes(index);

  const handleTabPress = (index: number) => {
    if (allowMultiple) {
      setSelectedIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setSelectedIndices([index]);
    }
    tabs[index]?.onPress?.();
  };

  return (
    <View
      style={[
        {
          paddingInline: UNIT / 4,
          paddingTop: UNIT / 4,
          backgroundColor,
          borderRadius: noBorder ? undefined : CORNERS.default,
        },
        style,
      ]}
    >
      {Array.from({ length: Math.ceil(tabs.length / columns) }, (_, rowIndex) => {
        const rowTabs = tabs.slice(rowIndex * columns, rowIndex * columns + columns);
        return (
          <View key={rowIndex} style={styles.row}>
            {rowTabs.map((tab, indexInRow) => {
              const index = rowIndex * columns + indexInRow;
              const isActive = isSelected(index);
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tab,
                    {
                      backgroundColor: isActive ? COLOURS.white : undefined,
                      flex: 1,
                    },
                  ]}
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
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: UNIT / 4,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: CORNERS.default,
    padding: UNIT / 2,
  },
});

export default GridTabSelector;