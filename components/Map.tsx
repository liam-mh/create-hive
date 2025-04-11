import React, { useEffect, useRef, useState } from 'react';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TEXT, SHADOWS, SIZES } from '@/styles';
import MapFiltersDropdown from './MapFiltersDropdown';
import MarkerManager from './MarkerManager';
import BottomSheet from '@gorhom/bottom-sheet';
import MarkerDetailsSheet from './MarkerDetailsSheet';
import { CustomMarkerProps } from '@/components/CustomMarker';
import { MapViewModel } from '@/viewModels/MapViewModel';
import { Coordinate } from '@/types/Coordinate';
import { getCityFromCoordinates } from '@/utils/locationUtils';

interface MapProps {
  inputLocation: Coordinate;
}

const Map: React.FC<MapProps> = ( props ) => {
  const viewModel = new MapViewModel(props.inputLocation); 
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [selectedMarkerData, setSelectedMarkerData] = useState<CustomMarkerProps | null>(null);
  const [city, setCity] = useState<string>();

  const handleRegionChange = async ( region: Coordinate ) => {
    const fetchedCity = await getCityFromCoordinates(region);
    if (fetchedCity) {
      setCity(fetchedCity)
    }
  }

  useEffect(() => {
    const fetchCity = async () => {
      const fetchedCity = await getCityFromCoordinates(props.inputLocation);
      if (fetchedCity) {
        setCity(fetchedCity);
      }
    };
  
    fetchCity();
  }, []);  

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={viewModel.currentRegion}
        onRegionChangeComplete={(region) => handleRegionChange(region)}
        showsPointsOfInterest={false}
        userInterfaceStyle={'light'}
        showsCompass={false}
      >
        <MarkerManager
          markers={viewModel.markers}
          mapRef={mapRef}
          bottomSheetRef={bottomSheetRef}
          setSelectedMarkerData={setSelectedMarkerData}
          selectedMarkerData={null}
        />
        <SafeAreaView style={[styles.headerContainer, [SHADOWS.containerShadow]]}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={TEXT.h1}>{city}</Text>
            <MapFiltersDropdown />
          </View>
        </SafeAreaView>
      </MapView>
      <MarkerDetailsSheet
        bottomSheetRef={bottomSheetRef}
        selectedMarkerData={selectedMarkerData}
      />
      {viewModel.loading && <Text>Loading...</Text>}
      {viewModel.error && <Text>{viewModel.error}</Text>}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.m,
    paddingVertical: SIZES.s,
  },
});

export default Map;