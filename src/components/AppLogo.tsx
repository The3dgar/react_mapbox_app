import reactLogo from '../logo.svg';

export const AppLogo = () => {
  return (
    <>
      <img
        src={reactLogo}
        alt='App logo'
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          width: '130px',
        }}
      />
    </>
  );
};
