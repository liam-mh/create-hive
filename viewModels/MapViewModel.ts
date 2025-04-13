import { Region } from 'react-native-maps';
import { CustomMarkerProps } from '@/components/CustomMarker';
import { Coordinate } from '@/types/Coordinate';
import { getCityFromCoordinates } from '@/utils/locationUtils';
import useMarkers from '@/hooks/useMarkers';

export class MapViewModel {
  private _delta: number = 0.05;
  private _currentRegion: Region;
  private _city: string | null = null;
  private _loading: boolean = false;
  private _error: string | null = null;
  private _markers: CustomMarkerProps[] = [];

  constructor(inputLocation: Coordinate) {
    this._currentRegion = {
      latitude: inputLocation.latitude,
      longitude: inputLocation.longitude,
      latitudeDelta: this._delta,
      longitudeDelta: this._delta
    }
    this.fetchCity();
    this.fetchMarkers();
  }

  get currentRegion() {
    return this._currentRegion;
  }

  setCurrentRegion(region: Region) {
    this._currentRegion = region;
    this.fetchCity();
  }

  get city() {
    return this._city;
  }

  get markers() {
    return this._markers;
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
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
}