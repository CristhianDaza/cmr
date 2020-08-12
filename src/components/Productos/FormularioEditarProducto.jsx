import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ACTUALIZAR_PRODUCTO } from '../../mutations';
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

  editarProductoForm = (e, actualizarProducto) => {
    e.preventDefault();

    actualizarProducto()
      .then(data => {
        Swal.fire(
          '¡Editado!',
          'El producto ha sido modificado.',
          'success'
        )

        this.limpiarState()

        this.props.history.push('/productos')
      })
  }

  render() {
    const { referencia, descripcion, precio, stock } = this.state;
    const { id } = this.props;
    const input = {
      id,
      referencia,
      descripcion,
      precio: Number(precio),
      stock: Number(stock)
    }

    return (
      <>
        <Mutation mutation={ACTUALIZAR_PRODUCTO} variables ={{ input }} key={id}>
          {(actualizarProducto, {loading, error, data}) => {
            return (
              <form 
                className="col-md-8"
                onSubmit={e => this.editarProductoForm(e, actualizarProducto)}
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
                  <label>Nombre:</label>
                  <input 
                    onChange={this.actualizarState}
                    type="text"
                    name="descripción" 
                    className="form-control" 
                    placeholder="Nombre del Producto"
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
            )
          }}
        </Mutation>
      </>
    );
  }
}

export default withRouter(FormularioEditarProducto);
