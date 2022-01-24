import { Feature } from '../../interfaces/places';
import { PlacesStateProps } from './PlacesProvider';

type PlacesReducerAction =
  | {
      type: 'setUserLocations';
      payload: [number, number];
    }
  | { type: 'setPlaces'; payload: Feature[] }
  | { type: 'setLoadingPlaces' };

export const placesReducer = (
  state: PlacesStateProps,
  action: PlacesReducerAction
): PlacesStateProps => {
  switch (action.type) {
    case 'setUserLocations':
      return { ...state, userLocation: action.payload, isLoading: false };
    case 'setLoadingPlaces':
      return { ...state, isLoadingPlaces: true, places: [] };
    case 'setPlaces':
      return { ...state, isLoadingPlaces: false, places: action.payload };
    default:
      return state;
  }
};
