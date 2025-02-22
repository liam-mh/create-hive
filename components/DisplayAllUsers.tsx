import { useState, useEffect } from 'react';
import { User } from '@/models/User';
import { getUser } from '@/services/userService';
import { View, Text, FlatList, StyleSheet } from 'react-native'; 

const DisplayAllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUser();
                setUsers(fetchedUsers);
            } catch (err) {
                setError("Failed to load users.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <Text>Loading users...</Text>; 
    }

    if (error) {
        return <Text>{error}</Text>; 
    }

    return (
        <FlatList
            data={users}
            keyExtractor={(item) => item.userId}
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

export default DisplayAllUsers;