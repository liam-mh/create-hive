import TEXT, { COLOURS, UNIT } from '@/styles';
import { getIcon } from '@/utils/iconUtils';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface ContentDropdownContainerProps {
  title: string;
  children: React.ReactNode;
  expanded?: boolean;
  addPadding?: boolean;
  isPrimary?: boolean;
}

const ContentDropdownContainer: React.FC<ContentDropdownContainerProps> = ({
  title,
  children,
  expanded = false,
  addPadding = false, 
  isPrimary = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  const colour = isPrimary ? COLOURS.primary : COLOURS.darkgrey;
  const iconName = isExpanded ? 'chevronUp' : 'chevronDown';
  const icon = getIcon(iconName, undefined, colour);
  const text = isPrimary ? TEXT.boldPrimary : TEXT.regularGrey;

  const contentContainerStyle = [
    styles.contentContainer,
    addPadding && styles.paddedContentContainer,
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
        <Text style={text}>{title}</Text>
        {icon}
      </TouchableOpacity>
      {isExpanded && (
        <ScrollView style={contentContainerStyle}>
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
    overflow: 'visible'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    overflow: 'visible'
  },
  paddedContentContainer: {
    paddingTop: UNIT/2, 
  },
});

export default ContentDropdownContainer;