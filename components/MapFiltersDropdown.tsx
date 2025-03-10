import React, { useState, useMemo, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { COLOURS, SIZES, UNIT } from "@/styles";
import MapFilterDetailsPanel from "./MapFilterDetailsPanel";
import { getIcon } from "@/utils/iconUtils";
import { MapFiltersDropdownViewModel } from "@/viewModels/MapFilterDropdownViewModel";

const MapFiltersDropdown = () => {
  const viewModel = useMemo(() => new MapFiltersDropdownViewModel(), []);
  const [isExpanded, setIsExpanded] = useState(viewModel.expanded);
  const [localSelectedFilters, setLocalSelectedFilters] = useState(viewModel.selectedFilters);

  const ICON_SIZE = SIZES.l;

  useEffect(() => {
    setLocalSelectedFilters(viewModel.selectedFilters);
  }, [viewModel.selectedFilters]);

  const toggleDropdown = () => {
    viewModel.toggleDropdown();
    setIsExpanded(viewModel.expanded);
  };

  const toggleFilter = (filter: string) => {
    const updatedFilters = viewModel.toggleFilter(filter);
    setLocalSelectedFilters(updatedFilters); 
  };

  return (
    <View style={styles.horizontalContainer}>
      {/* Filters */}
      <View style={styles.leftContainer}>
        {isExpanded &&
          viewModel.filters.map((filter) => (
            <TouchableOpacity
              key={filter.filterKey}
              style={styles.item}
              onPress={() => toggleFilter(filter.filterKey)}
            >
              <View style={styles.filterRow}>
                <MapFilterDetailsPanel
                  text={filter.filterText}
                  isSelected={localSelectedFilters.includes(filter.filterKey)}
                />
              </View>
            </TouchableOpacity>
          ))}
      </View>

      {/* Icons */}
      <View style={[styles.container, styles.rightContainer]}>
        {isExpanded ? (
          <>
            {viewModel.filters.map((filter) => (
              <TouchableOpacity
                key={filter.filterKey}
                style={styles.item}
                onPress={() => toggleFilter(filter.filterKey)}
              >
                <View style={styles.filterRow}>
                  {localSelectedFilters.includes(filter.filterKey)
                    ? getIcon(filter.iconFill, ICON_SIZE, COLOURS.primary)
                    : getIcon(filter.icon, ICON_SIZE, COLOURS.black)}
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={toggleDropdown}>
              {getIcon("chevronUp", ICON_SIZE, COLOURS.black)}
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={toggleDropdown}>
            {getIcon("chevronDown", ICON_SIZE, COLOURS.black)}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: "row",
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
    alignItems: "flex-end",
    paddingVertical: UNIT / 2,
  },
  item: {
    marginBottom: UNIT,
    height: UNIT * 1.5,
    justifyContent: "center",
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default MapFiltersDropdown;