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

  const valorTotal = Number(producto.precio) * Number(cantidad)

  return (
    <tr>
      <td>{producto.referencia}</td>
      <td>{producto.descripcion}</td>
      <td>{cantidad}</td>
      <td>${addCommas(producto.precio)}</td>
      <td>${addCommas(valorTotal)}</td>
    </tr>
  );
}

export default ResumenProducto;
