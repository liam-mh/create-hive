import { Dispatch, RefObject } from 'react';
import MapView, { Region } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { CustomMarkerProps } from '@/components/CustomMarker';
import { Coordinate } from '@/types/Coordinate';
import { getCityFromCoordinates } from '@/utils/locationUtils';
import useMarkers from '@/hooks/useMarkers';

export class MapViewModel {
  private _inputLocation: Coordinate = {
    latitude: 53.380871,
    longitude: -1.4701,
  };

  private _initialRegion: Region = {
    latitude: this._inputLocation.latitude,
    longitude: this._inputLocation.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  private _currentRegion: Region;
  private _city: string | null = null;
  private _loading: boolean = false;
  private _error: string | null = null;
  private _markers: CustomMarkerProps[] = [];

  constructor() {
    this._currentRegion = this._initialRegion;
    this.fetchCity();
    this.fetchMarkers();
  }

  private async fetchCity() {
    const coordinate: Coordinate = {
      latitude: this._currentRegion.latitude,
      longitude: this._currentRegion.longitude,
    };

    const fetchedCity = await getCityFromCoordinates(coordinate);
    this._city = fetchedCity;
  }

  private async fetchMarkers() {
    this._loading = true;
    const { markers, loading, error } = useMarkers();
    this._loading = loading;
    this._error = error;
    this._markers = markers;
  }

  get currentRegion() {
    return this._currentRegion;
  }

  get city() {
    return this._city;
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }

  get markers() {
    return this._markers;
  }

  setCurrentRegion(region: Region) {
    this._currentRegion = region;
    this.fetchCity();
  }
}