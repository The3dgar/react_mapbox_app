// Lo que exponemos fuera

import { createContext } from 'react';
import { Feature } from '../../interfaces/places';

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  searchPlacesByQuery?: (query: string) => Promise<Feature[]>;
  places: Feature[];
  isLoadingPlaces: boolean;
}

export const PlacesContext = createContext<PlacesContextProps>(
  {} as PlacesContextProps
);
