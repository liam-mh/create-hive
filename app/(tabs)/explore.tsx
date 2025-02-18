import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Map from '@/components/Map';
import DisplayAllUsers from '@/components/DisplayAllUsers';

export default function Explore() {
  const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}> 
                <Map /> 
            </View>
            <SafeAreaView style={styles.safeArea}> 
                <DisplayAllUsers />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: { 
    flex: 1,
  },
});