import { StyleSheet, Text, View} from 'react-native';
import { useRouter, Link } from 'expo-router';
import DisplayAllUsers from '@/components/DisplayAllUsers';

export default function Index() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello world!</Text>
            <DisplayAllUsers />
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