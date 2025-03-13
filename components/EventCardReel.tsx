import { SHADOWS, UNIT } from "@/styles";
import { View, Text, StyleSheet } from "react-native";
import EventCard from "./EventCard";
import { Event } from '@/models/Event';

interface EventCardReelProps {
  events: Event[];
}

const EventCardReel: React.FC<EventCardReelProps> = ( props ) => {

  if (!props.events || props.events.length === 0) {
    return <View style={styles.container}><Text>No events to show.</Text></View>;
  }

  return (
    <View style={styles.container}>
      {props.events.map((event) => (
        <EventCard key={event.eventId} eventId={event.eventId} inputEvent={event} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: UNIT,
    gap: UNIT
  }
});

export default EventCardReel;