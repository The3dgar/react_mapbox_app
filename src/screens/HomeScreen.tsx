import { AppLogo, BtnMyLocation, MapView, SearchBar } from '../components';
import '../assets/styles.css'

export const HomeScreen = () => {
  return (
    <div>
      <MapView/>
      <BtnMyLocation/>
      <AppLogo/>
      <SearchBar/>
    </div>
  );
};
