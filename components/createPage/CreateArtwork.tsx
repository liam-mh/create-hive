import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TEXT, { COLOURS, UNIT } from '@/styles';
import { Coordinate } from '@/types/Coordinate';
import { Event } from '@/models/Event';
import RefreshButton from '../buttons/RefreshButton';

interface CreateArtworkProps {
  userId: string;
  userLocation: Coordinate;
  onSuccess: (event: Event) => void;
  onRefresh: () => void;
}

const CreateArtwork: React.FC<CreateArtworkProps> = (props) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('error making artwork');
  const [validationError, setValidationError] = useState<string | null>(null);

  if (loading) {
    return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={TEXT.regularError}>{error}</Text>
        <RefreshButton onRefresh={props.onRefresh} />
      </View>
    );
  }

  return (
    <View style={styles.contentContainer}>
      <Text style={TEXT.regular}>create artwork</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: UNIT,
    overflow: 'visible',
    paddingBottom: UNIT,
  },
  errorContainer: {
    flex: 1,
    gap: UNIT,
    backgroundColor: COLOURS.white,
    justifyContent: 'center', 
    alignItems: 'center',     
  },
});

export default CreateArtwork;