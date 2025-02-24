import TEXT, { COLOURS, SHADOWS, UNIT } from "@/styles";
import { View, Text, StyleSheet } from "react-native";

interface DetailsPanelProps {
  text: string;
  isSelected: boolean;
}

const DetailsPanel = ({ text, isSelected }: DetailsPanelProps) => {
  return (
    <View
      style={[
        styles.container,
        SHADOWS.containerShadow,
        isSelected && styles.selectedContainer,
      ]}
    >
      <Text style={[TEXT.small, isSelected && styles.selectedText]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.white,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: UNIT / 4,
    paddingHorizontal: UNIT / 2,
    alignSelf: "flex-start",
  },
  selectedContainer: {
    backgroundColor: COLOURS.primary,
  },
  selectedText: {
    color: COLOURS.white,
  },
});

export default DetailsPanel;