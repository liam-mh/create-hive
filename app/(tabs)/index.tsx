import { StyleSheet, Text, View} from 'react-native';
import { useRouter, Link } from 'expo-router';
import DisplayAllUsers from '@/components/DisplayAllUsers';
import DisplayAllEvents from '@/components/DisplayAllEvents';

export default function Index() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Users</Text>
            <DisplayAllUsers />
            <Text style={styles.text}>Events</Text>
            <DisplayAllEvents />
            <Link href='/explore'>
                Explore
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'red',
    },
});