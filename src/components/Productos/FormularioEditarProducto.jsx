import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const initialState = {
  referencia: '',
  descripcion: '',
  precio: '',
  stock: ''
}

class FormularioEditarProducto extends Component {
  state = {
    ...this.props.producto.obtenerProducto
  }

  limpiarState = () => {
    this.setState({
      ...initialState
    })
  }

  actualizarState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  validarForm = () => {
    const { referencia, descripcion, precio, stock } = this.state;
    const noValido = !referencia || !descripcion || !precio || !stock;

    return noValido;
  }

  render() {
    const { referencia, descripcion, precio, stock } = this.state;
    const input = {
      referencia,
      descripcion,
      precio: Number(precio),
      stock: Number(stock)
    }

    return (
      <>
        <form 
          className="col-md-8"
        >
          <div className="form-group">
            <label>Referencia:</label>
            <input 
              onChange={this.actualizarState}
              type="text"
              name="referencia" 
              className="form-control" 
              placeholder="Referencia del Producto"
              value={referencia}
            />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <input 
              onChange={this.actualizarState}
              type="text"
              name="descripción" 
              className="form-control" 
              placeholder="Descripción del Producto"
              value={descripcion}
            />
          </div>
          <div className="form-group">
            <label>Precio:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">$</div>
              </div>
              <input 
                onChange={this.actualizarState}
                type="number" 
                name="precio" 
                className="form-control" 
                placeholder="Precio del Producto"
                value={precio}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Stock:</label>
            <input 
              onChange={this.actualizarState}
              type="number" 
              name="stock" 
              className="form-control" 
              placeholder="stock del Producto"
              value={stock}
            />
          </div>
          <button 
            disabled={ this.validarForm() }
            type="submit" 
            className="btn btn-success float-right">
              Guardar Cambios
          </button>
          <Link to="/productos">
            <button type="button" className="btn btn-danger float-right mr-2">
              Cancelar
            </button>
          </Link>
        </form>
      </>
    );
  }
}

export default FormularioEditarProducto;
