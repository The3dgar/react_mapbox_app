import ReactDOM from 'react-dom';
import { MapsApp } from './MapsApp';
//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

// remove token value from code
mapboxgl.accessToken =
  'pk.eyJ1IjoiZWRnYXJvbGl2YXIxNiIsImEiOiJja3lrczhxMncyMnd4Mm5yc2hpMDNqc2M3In0.3qE3cyaLwwinmliPywNwMw';

if (!navigator.geolocation) {
  alert('Geolocation is not supported by your browser');
  throw new Error('Geolocation is not supported by your browser');
}

ReactDOM.render(<MapsApp />, document.getElementById('root'));
