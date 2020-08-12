import React, { Component } from 'react';

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
class Producto extends Component {
  render() {
    const { producto } = this.props;
    const { referencia, descripcion, stock, precio, id } = producto;
    return (
      <>
        <tr>
          <td>{ referencia }</td>
          <td>{ descripcion }</td>
          <td>${ addCommas(precio) }</td>
          <td>{ stock }</td>
          <td>
            <input
              min="1"
              type="number"
              className="form-control"
              onChange={e => {
                if (e.target.value > producto.stock) {
                  e.target.value = 0;
                }
                this.props.actualizarCantidad(e.target.value, this.props.index)
              }}/>
          </td>
          <td><button type="button" className="btn btn-danger font-weight-bold" onClick={e => this.props.eliminarProducto(id)}>Eliminar</button></td>
        </tr>
      </>
    );
  }
}

export default Producto;
