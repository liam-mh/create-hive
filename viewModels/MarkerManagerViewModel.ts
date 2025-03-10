import { Dispatch, RefObject } from 'react';
import MapView, { Region } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { CustomMarkerProps } from '@/components/CustomMarker';

export class MarkerManagerViewModel {
  private _markers: CustomMarkerProps[];
  private _mapRef: RefObject<MapView>;
  private _bottomSheetRef: RefObject<BottomSheet>;
  private _setSelectedMarkerData: Dispatch<React.SetStateAction<CustomMarkerProps | null>>;
  private _selectedMarkerData: CustomMarkerProps | null;

  constructor(
    markers: CustomMarkerProps[],
    mapRef: RefObject<MapView>,
    bottomSheetRef: RefObject<BottomSheet>,
    setSelectedMarkerData: Dispatch<React.SetStateAction<CustomMarkerProps | null>>,
    selectedMarkerData: CustomMarkerProps | null
  ) {
    this._markers = markers;
    this._mapRef = mapRef;
    this._bottomSheetRef = bottomSheetRef;
    this._setSelectedMarkerData = setSelectedMarkerData;
    this._selectedMarkerData = selectedMarkerData;
  }

  get markers() {
    return this._markers;
  }

  get selectedMarkerData() {
    return this._selectedMarkerData;
  }

  handleMarkerPress = (markerData: CustomMarkerProps) => {
    this._setSelectedMarkerData((prevSelectedMarkerData) => {
      if (
        prevSelectedMarkerData &&
        prevSelectedMarkerData.id === markerData.id &&
        prevSelectedMarkerData.type === markerData.type
      ) {
        this._bottomSheetRef.current?.close();
        return null;
      } else {
        this._bottomSheetRef.current?.expand();
        return markerData;
      }
    });

    if (this._mapRef.current) {
      const region: Region = {
        latitude: markerData.coordinate.latitude - 0.004,
        longitude: markerData.coordinate.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      this._mapRef.current.animateToRegion(region, 350);
    }
  };
}