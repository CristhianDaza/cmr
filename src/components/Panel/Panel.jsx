import React from 'react';
import Clientes from './Clientes';

const Panel = () => {
  return (
    <>
      <h1 className="text-center my-5">Top 10 Clientes que más compran</h1>
      <Clientes />
    </>
  );
}

export default Panel;
