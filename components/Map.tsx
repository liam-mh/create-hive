import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import { StyleSheet } from 'react-native';

const Map = () => {

    const INITIAL_REGION = {
        latitude: 53.380871,
        longitude: -1.4701,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05 
    };

    return (
        <MapView 
            style={styles.map} 
            provider={PROVIDER_DEFAULT}
            initialRegion={INITIAL_REGION}
            showsUserLocation
            showsMyLocationButton
        />
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: '100%', 
        height: '100%',
    }
});

export default Map;