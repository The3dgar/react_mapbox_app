import { useContext, useRef } from 'react';
import { SearchResults } from '.';
import { PlacesContext } from '../context';

export const SearchBar = () => {
  const debounceRef = useRef<NodeJS.Timeout>();
  const { searchPlacesByQuery } = useContext(PlacesContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchPlacesByQuery!(value);
    }, 1000);
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
        left: '20px',
        padding: '5px',
        position: 'fixed',
        top: 20,
        width: '250px',
        zIndex: 999,
      }}>
      <input
        onChange={handleChange}
        type='text'
        className='form-control'
        placeholder='Search place...'
      />
      <SearchResults/>
    </div>
  );
};
