import DisplayAllUsers from '@/components/DisplayAllUsers';
import { Button, StyleSheet, Text, View} from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello world!</Text>
            <DisplayAllUsers />
            <Button
                title="Go to Explore"
                onPress={() => router.push('/explore')} 
            />
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