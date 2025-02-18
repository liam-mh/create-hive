import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as expoLocation from 'expo-location'; 
import { useState } from 'react';
import TEXT, { SHADOWS, SIZES } from '@/styles';
import { Location } from '@/types/Location';
import { Region } from 'react-native-maps';
import { useCityFromCoordinates } from '@/hooks/useCityFromCoordinates';

const Map = () => {

  const inputLocation: Location = {
    latitude: 53.380871,
    longitude: -1.4701,
  };

  const initialRegion: Region = {
    latitude: inputLocation.latitude,
    longitude: inputLocation.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05 
  };

  const [currentRegion, setCurrentRegion] = useState<Region>(initialRegion);
  const city = useCityFromCoordinates(currentRegion.latitude, currentRegion.longitude);

  return (
    <MapView 
      style={styles.map} 
      provider={PROVIDER_DEFAULT}
      initialRegion={initialRegion}
      showsUserLocation
      showsMyLocationButton
      onRegionChangeComplete={(region) => setCurrentRegion(region)}
    >
      <SafeAreaView style={{ flex: 1 }} pointerEvents="box-none">
        <View style={styles.paddedContainer}>
          <View style={[SHADOWS.containerShadow]}>
            <Text style={TEXT.h1}>{city}</Text>
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