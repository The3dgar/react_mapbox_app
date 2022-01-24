import { useContext, useState } from 'react';
import { MapContext, PlacesContext } from '../context';
import { Feature } from '../interfaces/places';

export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);

  const [active, setActive] = useState('');

  const onPlaceCLick = (place: Feature) => {
    const [lng, lat] = place.center;
    setActive(place.id);
    map!.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  const getRoute = async (place: Feature) => {
    if(!userLocation) return;
    const [lng, lat] = place.center;
    getRouteBetweenPoints(userLocation, [lng, lat]);
  };

  if (isLoadingPlaces) return <LoadingPlaces />;
  if (!places.length) return <></>;

  return (
    <ul className='list-group mt-3'>
      {places.map((place) => (
        <li
          key={place.id}
          onClick={() => onPlaceCLick(place)}
          className={`list-group-item list-group-item-action pointer ${
            active === place.id ? 'active' : ''
          }`}>
          <h6>{place.text_es}</h6>
          <p style={{ fontSize: 12 }}>{place.place_name}</p>

          <button
            onClick={() => getRoute(place)}
            className={`btn btn-sm ${
              active === place.id ? 'btn-outline-light' : 'btn-outline-primary'
            }`}>
            <i className='fas fa-directions'></i>
          </button>
        </li>
      ))}
    </ul>
  );
};

const LoadingPlaces = () => (
  <div className='alert alert-primary mt-2'>
    <h6>Searching...</h6>
    <p>Wait a moment...</p>
  </div>
);
