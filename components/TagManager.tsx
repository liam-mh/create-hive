import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
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
}

export interface TagManagerRef {
  getFinalTags: () => string[];
}

const TagManager = forwardRef<TagManagerRef, TagManagerProps>((props, ref) => {
  const [tags, setTags] = useState<string[]>([]);
  const [noneEditTags, setNoneEditTags] = useState<string[]>([
    props.medium.primary, props.medium.secondary, props.itemType,
  ]);

  const getTags = async () => {
    try {
      let initialTags: string[] = [];

      if (props.itemId && props.itemType) {
        // Example fetch until tags stored
        const fetchedTags = ['tag1', 'tag2', 'tag3'];
        const combined = [...noneEditTags];
        fetchedTags.forEach(tag => {
          if (!combined.includes(tag)) {
            combined.push(tag);
          }
        });
        initialTags = combined;

      } else {
        initialTags = [...noneEditTags];
      }
      setTags(initialTags.filter(tag => tag.trim() !== ''));

    } catch (error) {
      console.error('Error fetching tags:', error);
      setTags(getTagsFromMedium(props.medium).filter(tag => tag.trim() !== ''));
    }
  };

  useEffect(() => {
    getTags();
  }, [props.itemId, props.itemType, props.medium]);

  useImperativeHandle(ref, () => ({
    getFinalTags: () => {
      return tags.filter(tag => tag.trim() !== '');
    },
  }));

  const handleAdd = () => {
    if (tags.length === 0 || tags[tags.length - 1].trim() !== "") {
      setTags([...tags, ""]);
    }
  };

  const handleTagEdit = (index: number, newTag: string | null) => {
    const mediumTags = getTagsFromMedium(props.medium);
    const typeTag = props.itemType;

    if (mediumTags.includes(tags[index]) || typeTag === tags[index]) {
      console.log("Cannot edit or remove medium-derived or item type tags.");
      return;
    }

    let updatedTags;
    if (newTag === null || newTag.trim() === "") {
      updatedTags = tags.filter((_, i) => i !== index);
    } else {
      updatedTags = tags.map((tag, i) => (i === index ? newTag.trim() : tag));
    }
    setTags(updatedTags);
  };

  const iconAdd = getIcon("plusSquareFill", SIZES.l, COLOURS.offwhite);

  return (
    <View style={styles.tagsContainer}>
      {tags.map((tag, key) => (
        <TagButton
          tag={tag}
          key={key}
          edit={props.editTags && !getTagsFromMedium(props.medium).includes(tag) && tag !== props.itemType}
          onEdit={(newTag) => handleTagEdit(key, newTag)}
          cannotEdit={getTagsFromMedium(props.medium).includes(tag) || tag === props.itemType}
        />
      ))}
      {props.editTags && (
        <TouchableOpacity onPress={handleAdd}>{iconAdd}</TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: UNIT / 2,
    alignItems: 'center',
  },
});

export default TagManager;