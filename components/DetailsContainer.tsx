import React from 'react';
import { View, StyleSheet } from 'react-native';
import { UNIT } from '@/styles';

interface DetailsContainerProps {
  children: React.ReactNode;
}

const DetailsContainer: React.FC<DetailsContainerProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    gap: UNIT / 2,
  },
});

export default DetailsContainer;