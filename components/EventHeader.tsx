import React from "react";
import TEXT, { COLOURS, SIZES, UNIT } from "@/styles";
import { View, Text, StyleSheet } from "react-native"; 
import EventPrivacyIcon from "./buttons/EventPrivacyIcon";
import SaveButton from "./buttons/Savebutton";
import { getEventIconName, getIcon, IconNameType } from "@/utils/iconUtils";
import { EventType } from "@/models/Event";

interface EventHeaderProps {
  eventId: string;
  eventType: EventType;
  isPrivate: boolean;
  userId: string;
}

const EventHeader: React.FC<EventHeaderProps> = (props) => {
  const iconHeaderName: IconNameType = getEventIconName(props.eventType);
  const icon = getIcon(iconHeaderName, SIZES.l, COLOURS.secondary);

  return (
    <View style={styles.titleContainer}>
      <View style={styles.innerRow}>
        <Text style={TEXT.h1}>{props.eventType}</Text>
        {icon}
      </View>
      <View style={styles.innerRow}>
        <EventPrivacyIcon isPrivate={props.isPrivate} />
        <SaveButton itemId={props.eventId} itemType={"event"} userId={props.userId} isIconButton={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: UNIT,
  },
});

export default EventHeader;