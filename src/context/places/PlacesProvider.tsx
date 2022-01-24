// Lo que guardamos en memoria

import { useEffect, useReducer } from 'react';
import { searchApi } from '../../apis';
import { getUserLocation } from '../../helpers';
import { Feature, PlacesResponse } from '../../interfaces/places';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './PlacesReducer';

export interface PlacesStateProps {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesStateProps = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((coords) =>
      dispatch({ type: 'setUserLocations', payload: coords })
    );
  }, []);

  const searchPlacesByQuery = async (query: string): Promise<Feature[]> => {
    if (!query.length) {
      dispatch({ type: 'setPlaces', payload: [] });
      return [];
    }
    if (!state.userLocation) throw new Error('No hay ubicación');

    dispatch({ type: 'setLoadingPlaces' });
    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(','),
      },
    });

    dispatch({ type: 'setPlaces', payload: resp.data.features });
    return resp.data.features;
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        searchPlacesByQuery,
      }}>
      {children}
    </PlacesContext.Provider>
  );
};
