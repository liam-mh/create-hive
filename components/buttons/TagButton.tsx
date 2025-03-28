import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import BaseButton from '@/components/buttons/BaseButton';
import { useRouter } from 'expo-router';
import { COLOURS, CORNERS, UNIT } from '@/styles';

interface TagButtonProps {
  tag: string;
  edit?: boolean;
  onEdit?: (text: string) => void;
  isMedium?: boolean;
}

const TagButton: React.FC<TagButtonProps> = (props) => {
  const router = useRouter();
  const [tagText, setTagText] = useState<string>(props.tag);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (props.edit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.edit]);

  const handlePress = () => {
    router.push({
      pathname: '/search',
      params: {
        tag: tagText,
      },
    });
  };

  const handleTextChange = (text: string) => {
    setTagText(text);
    if (props.onEdit) {
      props.onEdit(text);
    }
  };

  if (!props.edit) {
    return (
      <BaseButton
        text={tagText}
        icon="tag"
        iconFill="tagFill"
        pending={false}
        onPress={handlePress}
        isSelected={false}
        isIconButton={false}
      />
    );
  } else {
    if (!props.isMedium) {
      return (
        <View style={styles.textInput}>
          <TextInput
            ref={inputRef}
            value={tagText}
            onChangeText={handleTextChange}
          />
        </View>
      );
    } else {
      return (
        <View style={[styles.textInput, {borderColor: COLOURS.primary}]}>
          <Text >{tagText}</Text>
        </View>
      )
    }
  }
};

const styles = StyleSheet.create({
  textInput: {
    flexDirection: 'row',
    gap: UNIT,
    borderWidth: 2,
    borderColor: COLOURS.offwhite,
    borderRadius: CORNERS.default,
    padding: UNIT,
  },
});

export default TagButton;