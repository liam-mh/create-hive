import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { COLOURS, SIZES, UNIT } from "@/styles";
import MapFilterDetailsPanel from "./MapFilterDetailsPanel";
import { getIcon, IconNameType } from "@/utils/iconUtils";

import IconChevronUp from '@/assets/icons/chevron-up.svg';
import IconChevronDown from '@/assets/icons/chevron-down.svg';

interface FilterItem {
  filterText: string;
  icon: IconNameType;
  iconFill: IconNameType;
  filterKey: string;
}

const MapFiltersDropdown = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const ICON_SIZE = SIZES.l;

  const filters: FilterItem[] = [
    {
      filterText: 'verified only',
      icon: 'personCheck',
      iconFill: 'personFillCheck',
      filterKey: 'verified'
    },
    {
      filterText: 'hide artwork',
      icon: 'palette',
      iconFill: 'paletteFill',
      filterKey: 'artwork'
    },
    {
      filterText: 'casual',
      icon: 'cupHot',
      iconFill: 'cupHotFill',
      filterKey: 'casual',
    },
    {
      filterText: 'workshop',
      icon: 'brush',
      iconFill: 'brushFill',
      filterKey: 'workshop',
    },
    {
      filterText: 'exhibition',
      icon: 'easel2',
      iconFill: 'easel2Fill',
      filterKey: 'exhibition',
    },
  ];

  const toggleDropdown = () => setExpanded(!expanded);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prevSelected) =>
      prevSelected.includes(filter)
        ? prevSelected.filter((item) => item !== filter)
        : [...prevSelected, filter]
    );
  };

  return (
    <View style={styles.horizontalContainer}>
      {/* Filters */}
      <View style={styles.leftContainer}>
        {expanded &&
          filters.map((filter) => (
            <TouchableOpacity
              key={filter.filterKey}
              style={styles.item}
              onPress={() => toggleFilter(filter.filterKey)}
            >
              <View style={styles.filterRow}>
                  <MapFilterDetailsPanel text={filter.filterText} isSelected={selectedFilters.includes(filter.filterKey)}/>
              </View>
            </TouchableOpacity>
          ))}
      </View>

      {/* Icons */}
      <View style={[styles.container, styles.rightContainer]}>
        {expanded ? (
          <>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.filterKey}
                style={styles.item}
                onPress={() => toggleFilter(filter.filterKey)}
              >
                <View style={styles.filterRow}>
                  {selectedFilters.includes(filter.filterKey) 
                    ? (getIcon(filter.iconFill, ICON_SIZE, COLOURS.primary))
                    : (getIcon(filter.icon, ICON_SIZE, COLOURS.black))
                  }
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={toggleDropdown}>
              {getIcon('chevronUp', ICON_SIZE, COLOURS.black)}
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={toggleDropdown}>
            {getIcon('chevronDown', ICON_SIZE, COLOURS.black)}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: COLOURS.white,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: UNIT / 2,
    paddingHorizontal: UNIT / 2,
    alignSelf: "flex-start",
    marginRight: UNIT / 2,
  },
  rightContainer: {
    marginRight: 0,
  },
  leftContainer: {
    marginRight: UNIT / 2,
    alignItems: 'flex-end',
    paddingVertical: UNIT / 2,
  },
  item: {
    marginBottom: UNIT,
    height: UNIT * 1.5,
    justifyContent: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MapFiltersDropdown;