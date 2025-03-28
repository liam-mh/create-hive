import React, { useState, useEffect } from "react";
import { COLOURS, SIZES, UNIT } from "@/styles";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import TagButton from "./buttons/TagButton";
import { getIcon } from "@/utils/iconUtils";
import { Medium } from "@/types/Medium";
import { getTagsFromMedium } from "@/utils/mediumUtils";

interface TagManagerProps {
  itemId?: string | null;
  itemType: 'event' | 'artwork';
  medium: Medium;
  editTags?: boolean;
  onEditTags?: (updatedTags: string[]) => void;
}

const TagManager: React.FC<TagManagerProps> = (props) => {
  const [tags, setTags] = useState<string[]>([]);

  let editTags: boolean = false;
  props.editTags ? (editTags = props.editTags) : (editTags = false);

  const getTags = async () => {
    // Example tag retrieval method (not immplemented storage yet)
    try {
      if (props.itemId && props.itemType) {
        const fetchedTags = ['tag1', 'tag2', 'tag3'];
        const mediumTags = getTagsFromMedium(props.medium);
        const combinedTags = [...fetchedTags];
        mediumTags.forEach(mediumTag => {
          if (!combinedTags.includes(mediumTag)) {
            combinedTags.unshift(mediumTag); 
          }
        });
      } else {
        const mediumTags = getTagsFromMedium(props.medium); 
        setTags(mediumTags);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  useEffect(() => {
    getTags();
  }, [props.itemId, props.itemType, props.medium]);

  const handleAdd = () => {
    if (tags[tags.length - 1] !== "") {
      setTags([...tags, ""]);
    }
  };

  const handleTagEdit = (index: number, newTag: string | null) => {
    const mediumTags = getTagsFromMedium(props.medium); 

    if (mediumTags.includes(tags[index])) {
      return;
    }

    if (newTag === null || newTag.trim() === "") {
      const updatedTags = tags.filter((_, i) => i !== index);
      setTags(updatedTags);
    } else {
      const updatedTags = tags.map((tag, i) => (i === index ? newTag : tag));
      setTags(updatedTags);
    }
  };

  useEffect(() => {
    if (props.onEditTags) {
      props.onEditTags(tags);
    }
  }, [tags, props.onEditTags]);

  const iconAdd = getIcon("plusSquareFill", SIZES.l, COLOURS.offwhite);

  return (
    <View style={styles.tagsContainer}>
      {tags.map((tag, key) => (
        <TagButton
          tag={tag}
          key={key}
          edit={editTags}
          onEdit={(newTag) => handleTagEdit(key, newTag)}
          isMedium={getTagsFromMedium(props.medium).includes(tag)}
        />
      ))}
      <TouchableOpacity onPress={handleAdd}>{iconAdd}</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: UNIT / 2,
    alignItems: 'center',
  },
});

export default TagManager;