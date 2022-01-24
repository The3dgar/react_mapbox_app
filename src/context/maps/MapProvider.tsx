// Lo que guardamos en memoria
//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from '!mapbox-gl';
import { useContext, useEffect, useReducer } from 'react';
import { PlacesContext } from '..';
import { directionsApi } from '../../apis';
import { DirectionsResponse } from '../../interfaces/directions';
import { MapContext } from './MapContext';
import { mapReducer } from './MapReducer';

export interface MapStateProps {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapStateProps = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);
  const { markers, map } = state;
  useEffect(() => {
    markers.forEach((m) => m.remove());
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(
        `<h6>${place.text_es}</h6>
        <p class='text-muted' style='font-size: 12px'>${place.place_name}</p>
        `
      );

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(map!);

      newMarkers.push(newMarker);
    }

    dispatch({ type: 'setMarkers', payload: newMarkers });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup({}).setHTML(`<h1>My Location</h1>`);

    new Marker({
      color: 'red',
    })
      .setLngLat(map.getCenter())
      .addTo(map)
      .setPopup(myLocationPopup);

    dispatch({
      type: 'setMap',
      payload: map,
    });
  };

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionsApi.get<DirectionsResponse>(
      `/${start.join(',')};${end.join(',')}`
    );

    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates } = geometry;

    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;

    const minutes = Math.floor(duration / 60);

    const bounds = new LngLatBounds(start, start);
    for (let coord of coordinates) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    console.log(kms, minutes);

    map?.fitBounds(bounds, { padding: 200 });

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates,
            },
          },
        ],
      },
    };
    const sourceId = 'route';
    if (map?.getLayer(sourceId)) {
      map.removeLayer(sourceId);
      map.removeSource(sourceId);
    }

    map?.addSource(sourceId, sourceData).addLayer({
      id: sourceId,
      type: 'line',
      source: sourceId,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#3b9ddd',
        'line-width': 4,
      },
    });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
        getRouteBetweenPoints,
      }}>
      {children}
    </MapContext.Provider>
  );
};
