import React, { useState } from 'react';
import MapView, { Region, PROVIDER_DEFAULT, LatLng, Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { UNIT } from '@/styles';
import CustomMarker from './CustomMarker';

export interface Coordinate {
  latitude: number;
  longitude: number;
}

interface InputPinProps {
  itemId: string;
  itemType: 'artwork' | 'event';
}

interface OutputPinProps {
  onPinDrop: (coordinate: Coordinate | null) => void;
}

interface SmallMapProps {
  inputPin?: InputPinProps;
  outputPin?: OutputPinProps;
  initialCoordinate: Coordinate;
}

const SmallMap: React.FC<SmallMapProps> = (props) => {
  const initialRegion: Region = {
    latitude: props.initialCoordinate.latitude,
    longitude: props.initialCoordinate.longitude,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  };

  const [pinLocation, setPinLocation] = useState<Coordinate | null>({
    latitude: props.initialCoordinate.latitude,
    longitude: props.initialCoordinate.longitude,
  }); 

  const handleMapPress = (event: { nativeEvent: { coordinate: LatLng } }) => {
    try {
      if (!props.outputPin?.onPinDrop) {
        console.warn("onPinDrop is missing");
        return;
      }

      const { coordinate } = event.nativeEvent;
      const convertedCoordinate: Coordinate = {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      };

      setPinLocation(convertedCoordinate);
      props.outputPin.onPinDrop(convertedCoordinate);
    } catch (error) {
      console.error("Error handling map press:", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={initialRegion}
        showsPointsOfInterest={false}
        userInterfaceStyle={'light'}
        showsCompass={false}
        onPress={handleMapPress}
      >
        {props.outputPin && pinLocation && ( 
          <Marker coordinate={pinLocation} />
        )}
        {props.inputPin && (
          <CustomMarker
            coordinate={{
              latitude: props.initialCoordinate.latitude,
              longitude: props.initialCoordinate.longitude,
            }}
            type={props.inputPin.itemType}
            id={props.inputPin.itemId}
            text={null}
            isSelected={false}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: UNIT * 15,
  },
});

export default SmallMap;