import React from 'react';

export const Loading = () => {
  return (
    <div
      className='d-flex flex-column justify-content-center align-items-center'
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: '100vw',
        height: '100vh',
        color: 'white',
      }}>
      <div className='spinner-border' role='status' />
      <div className='text-center'>
      <h3>Cargando....</h3>

      </div>
    </div>
  );
};
