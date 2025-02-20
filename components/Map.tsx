import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import TEXT, { SHADOWS, SIZES } from '@/styles';
import { Location } from '@/types/Location';
import { Region } from 'react-native-maps';
import { useCityFromCoordinates } from '@/hooks/useCityFromCoordinates';
import MapFiltersDropdown from './MapFiltersDropdown';
import CustomMarker from './CustomMarker';

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
    <View style={{ flex: 1 }}>  
      <MapView 
        style={styles.map} 
        provider={PROVIDER_DEFAULT}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
        onRegionChangeComplete={(region) => setCurrentRegion(region)}
      >
        <Marker 
          coordinate={inputLocation}
          tracksViewChanges={false}
          image={require('@/assets/icons/bookmark-fill.svg')}
        />

        <CustomMarker
          coordinate={inputLocation}
          folder='artwork'
          filename='acrylic-landscapes-beginners.jpg'
        />

        <SafeAreaView style={[styles.headerContainer, [SHADOWS.containerShadow]]}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={TEXT.h1}>{city}</Text>
            <MapFiltersDropdown />
          </View>
        </SafeAreaView>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%', 
    height: '100%',
  },
  headerContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: SIZES.m, 
    paddingVertical: SIZES.s,
  },
});

export default Map;
