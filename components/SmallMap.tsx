import React from 'react';
import MapView, { Region, PROVIDER_DEFAULT } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import CustomMarker from '@/components/CustomMarker';
import { Coordinate } from '@/types/Coordinate';
import { COLOURS, UNIT } from '@/styles';

interface SmallMapProps {
  itemId: string,
  itemType: 'artwork' | 'event';
  pinCoordinate: Coordinate
}

const SmallMap: React.FC<SmallMapProps> = ( props ) => {

  const initialRegion:Region = {
    latitude: props.pinCoordinate.latitude,
    longitude: props.pinCoordinate.longitude,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  }

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_DEFAULT}
      initialRegion={initialRegion}
      showsPointsOfInterest={false}
      userInterfaceStyle={'light'}
      showsCompass={false}
    >
      <CustomMarker 
        coordinate={props.pinCoordinate} 
        type={props.itemType} 
        id={props.itemId} 
        text={null} 
        isSelected={false} 
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: UNIT*15
  },
});

export default SmallMap;