import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TEXT, { SHADOWS, SIZES } from '@/styles';

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
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top']} pointerEvents="box-none">
        <View style={styles.paddedContainer}>
          <View style={[SHADOWS.containerShadow]}>
            <Text style={TEXT.h1}>sheffield</Text>
          </View>
        </View>
      </SafeAreaView>
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%', 
    height: '100%',
  },
  paddedContainer: { 
    paddingHorizontal: SIZES.m, 
    paddingVertical: 0, 
  },
});

export default Map;