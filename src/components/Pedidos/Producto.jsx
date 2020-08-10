import React, { Component } from 'react';

class Producto extends Component {
  render() {
    const { producto } = this.props;
    const { referencia, descripcion, stock, precio, id } = producto;
    return (
      <>
        <tr>
          <td>{ referencia }</td>
          <td>{ descripcion }</td>
          <td>${ precio }</td>
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
          <td><button type="button" className="btn btn-danger font-weight-bold" onClick={e => this.props.eliminarProducto(id)}>&times; Eliminar</button></td>
        </tr>
      </>
    );
  }
}

export default Producto;
