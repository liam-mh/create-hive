import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { COLOURS, UNIT } from "@/styles";

import IconVerified from '@/assets/icons/person-check.svg';
import IconVerifiedFill from '@/assets/icons/person-fill-check.svg';
import IconCasual from '@/assets/icons/cup-hot.svg';
import IconCasualFill from '@/assets/icons/cup-hot-fill.svg';
import IconWorkshop from '@/assets/icons/brush.svg';
import IconWorkshopFill from '@/assets/icons/brush-fill.svg';
import IconExhibition from '@/assets/icons/easel2.svg';
import IconExhibitionFill from '@/assets/icons/easel2-fill.svg';

import IconChevronUp from '@/assets/icons/chevron-up.svg';
import IconChevronDown from '@/assets/icons/chevron-down.svg';

const MapFiltersDropdown = () => {
  const ICON_SIZE = UNIT * 1.5;

  const [expanded, setExpanded] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleDropdown = () => setExpanded(!expanded);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prevSelected) =>
      prevSelected.includes(filter)
        ? prevSelected.filter((item) => item !== filter)
        : [...prevSelected, filter] 
    );
  };

  return (
    <View style={styles.container}>
      {expanded ? (
        <>
          <TouchableOpacity style={styles.item} onPress={() => toggleFilter("verified")}>
            {selectedFilters.includes("verified") ? (
              <IconVerifiedFill width={ICON_SIZE} height={ICON_SIZE} fill={COLOURS.primary} />
            ) : (
              <IconVerified width={ICON_SIZE} height={ICON_SIZE} fill={COLOURS.black} />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => toggleFilter("casual")}>
            {selectedFilters.includes("casual") ? (
              <IconCasualFill width={ICON_SIZE} height={ICON_SIZE} fill={COLOURS.primary} />
            ) : (
              <IconCasual width={ICON_SIZE} height={ICON_SIZE} fill={COLOURS.black} />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => toggleFilter("workshop")}>
            {selectedFilters.includes("workshop") ? (
              <IconWorkshopFill width={ICON_SIZE} height={ICON_SIZE} fill={COLOURS.primary} />
            ) : (
              <IconWorkshop width={ICON_SIZE} height={ICON_SIZE} fill={COLOURS.black} />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => toggleFilter("exhibition")}>
            {selectedFilters.includes("exhibition") ? (
              <IconExhibitionFill width={ICON_SIZE} height={ICON_SIZE} fill={COLOURS.primary} />
            ) : (
              <IconExhibition width={ICON_SIZE} height={ICON_SIZE} fill={COLOURS.black} />
            )}
          </TouchableOpacity>

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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.white,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: UNIT,
    paddingHorizontal: UNIT / 2,
    alignSelf: "flex-start",
  },
  item: {
    marginBottom: UNIT,
  },
});

export default MapFiltersDropdown;