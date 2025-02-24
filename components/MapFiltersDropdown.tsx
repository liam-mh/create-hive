import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { COLOURS, UNIT } from "@/styles";
import DetailsPanel from "./DetailsPanel";

import IconVerified from '@/assets/icons/person-check.svg';
import IconVerifiedFill from '@/assets/icons/person-fill-check.svg';
import IconArtwork from '@/assets/icons/palette.svg';
import IconArtworkFill from '@/assets/icons/palette-fill.svg';
import IconCasual from '@/assets/icons/cup-hot.svg';
import IconCasualFill from '@/assets/icons/cup-hot-fill.svg';
import IconWorkshop from '@/assets/icons/brush.svg';
import IconWorkshopFill from '@/assets/icons/brush-fill.svg';
import IconExhibition from '@/assets/icons/easel2.svg';
import IconExhibitionFill from '@/assets/icons/easel2-fill.svg';

import IconChevronUp from '@/assets/icons/chevron-up.svg';
import IconChevronDown from '@/assets/icons/chevron-down.svg';

interface FilterItem {
  filterText: string;
  icon: React.ComponentType<any>;
  iconFill: React.ComponentType<any>;
  filterKey: string;
}

const MapFiltersDropdown = () => {
  const ICON_SIZE = UNIT * 1.5;

  const [expanded, setExpanded] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters: FilterItem[] = [
    {
      filterText: "verified only",
      icon: IconVerified,
      iconFill: IconVerifiedFill,
      filterKey: "verified",
    },
    {
      filterText: "hide artwork",
      icon: IconArtwork,
      iconFill: IconArtworkFill,
      filterKey: "artwork",
    },
    {
      filterText: "casual",
      icon: IconCasual,
      iconFill: IconCasualFill,
      filterKey: "casual",
    },
    {
      filterText: "workshop",
      icon: IconWorkshop,
      iconFill: IconWorkshopFill,
      filterKey: "workshop",
    },
    {
      filterText: "exhibition",
      icon: IconExhibition,
      iconFill: IconExhibitionFill,
      filterKey: "exhibition",
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
                  <DetailsPanel text={filter.filterText} isSelected={selectedFilters.includes(filter.filterKey)}/>
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
                  {selectedFilters.includes(filter.filterKey) ? (
                    <filter.iconFill
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      fill={COLOURS.primary}
                    />
                  ) : (
                    <filter.icon
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      fill={COLOURS.black}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={toggleDropdown}>
              <IconChevronUp width={ICON_SIZE} height={ICON_SIZE} fill={COLOURS.black} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={toggleDropdown}>
            <IconChevronDown width={ICON_SIZE} height={ICON_SIZE} fill={COLOURS.black} />
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