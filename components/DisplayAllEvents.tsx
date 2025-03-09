import { useState, useEffect } from 'react';
import { Event } from '@/models/Event';
import { getEvent } from '@/services/eventService';
import { View, Text, FlatList, StyleSheet } from 'react-native'; 

const DisplayAllEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedEvents = await getEvent();
                setEvents(fetchedEvents);
            } catch (err) {
                setError("Failed to load events.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <Text>Loading events...</Text>; 
    }

    if (error) {
        return <Text>{error}</Text>; 
    }

    return (
        <FlatList
            data={events}
            keyExtractor={(item) => item.eventId}
            renderItem={({ item }) => (
                <View style={styles.listItem}> 
                    <Text>{JSON.stringify(item, null, 2)}</Text> 
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    listItem: { 
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});

export default DisplayAllEvents;