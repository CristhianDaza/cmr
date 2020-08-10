import React from 'react';

const ResumenProducto = ({cantidad, producto}) => {
  function addCommas(nStr) {
    // eslint-disable-next-line no-param-reassign
    nStr += '';
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? `.${x[1]}` : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1.$2');
    }
    return x1 + x2;
  }

  return (
    <>
      <div className="border mb-4 p-4">
        <p className="card-text font-weight-bold">
          Nombre:
          <span className="font-weight-normal"> {producto.descripcion}</span>
        </p>
        <p className="card-text font-weight-bold">
          Cantidad:
          <span className="font-weight-normal"> {cantidad}</span>
        </p>
        <p className="card-text font-weight-bold">
          Precio:
          <span className="font-weight-normal"> ${addCommas(producto.precio)}</span>
        </p>
      </div>
    </>
  );
}

export default ResumenProducto;
