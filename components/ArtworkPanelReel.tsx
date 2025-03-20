import { UNIT, SHADOWS } from "@/styles";
import { View, Text, StyleSheet } from "react-native";
import ArtworkPanel from "./ArtworkPanel";

interface ArtworkPanelReelProps {
  artworkPanelProps: {
    artworkId: string;
    likes: number;
  }[];
}

const ArtworkPanelReel: React.FC<ArtworkPanelReelProps> = (props) => {
  if (!props || props.artworkPanelProps.length === 0) {
    return <Text>No artwork panels</Text>;
  }

  const panels = props.artworkPanelProps;
  const renderedRows = [];

  for (let i = 0; i < panels.length; i += 2) {
    const row = (
      <View key={`row-${i}`} style={styles.gridRow}>
        <View key={panels[i].artworkId} style={[styles.gridItem, SHADOWS.containerShadow]}>
          <ArtworkPanel artworkId={panels[i].artworkId} likes={panels[i].likes} />
        </View>
        {panels[i + 1] ? (
          <View key={panels[i + 1].artworkId} style={[styles.gridItem, SHADOWS.containerShadow]}>
            <ArtworkPanel artworkId={panels[i + 1].artworkId} likes={panels[i + 1].likes} />
          </View>
        ) : (
          <View style={styles.gridItem} /> 
        )}
      </View>
    );
    renderedRows.push(row);
  }

  return <View style={styles.gridContainer}>{renderedRows}</View>;
};

const styles = StyleSheet.create({
  gridContainer: {
    gap: UNIT,
  },
  gridRow: {
    flexDirection: "row",
    gap: UNIT,
  },
  gridItem: {
    flex: 1,
  },
});

export default ArtworkPanelReel;