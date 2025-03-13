import TEXT, { COLOURS, UNIT } from '@/styles';
import { getIcon } from '@/utils/iconUtils';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface ContentDropdownContainerProps {
  title: string;
  children: React.ReactNode;
  expanded?: boolean;
}

const ContentDropdownContainer: React.FC<ContentDropdownContainerProps> = ({ title, children, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  const iconName = isExpanded ? 'chevronUp' : 'chevronDown';
  const icon = getIcon(iconName, undefined, COLOURS.primary);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
        <Text style={TEXT.boldPrimary}>{title}</Text>
        {icon}
      </TouchableOpacity>
      {isExpanded && (
        <ScrollView style={styles.contentContainer}>
          <View>
            {children}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: UNIT,
  },
  contentContainer: {
    overflow: 'hidden',
  },
});

export default ContentDropdownContainer;