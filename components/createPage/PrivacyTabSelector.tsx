import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TEXT, { UNIT } from '@/styles';
import SlidingTabSelector from '@/components/SlidingTabSelector';

interface PrivacyTabSelectorProps {
  onSelect: (isPrivate: boolean) => void;
  hideDescription?: boolean;
}

const privacyDescriptions: Record<string, string> = {
  private: 'members have to request access that is approved or declined by the host. event details will be hidden until approved',
  public: 'anybody who registers can attend the event',
};

const tabOptions = [
  { text: 'public', icon: 'peopleFill' },
  { text: 'private', icon: 'lockFill' },
] as const;

const PrivacyTabSelector: React.FC<PrivacyTabSelectorProps> = ({
  onSelect,
  hideDescription,
}) => {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const handleSelect = (isPrivate: boolean) => {
    setIsPrivate(isPrivate);
    onSelect(isPrivate);
  };

  return (
    <View style={styles.container}>
      <SlidingTabSelector
        initialIndex={0}
        tabs={tabOptions.map(({ text, icon }) => ({
          text,
          icon,
          onPress: () => handleSelect(text === 'private'),
        }))}
      />
      {!hideDescription && (
        <Text style={TEXT.regularGrey}>
          {privacyDescriptions[isPrivate ? 'private' : 'public']}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: UNIT,
  },

});

export default PrivacyTabSelector;