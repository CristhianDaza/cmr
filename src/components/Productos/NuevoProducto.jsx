import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NUEVO_PRODUCTO } from '../../mutations/';
import { Mutation } from 'react-apollo';
import Swal from 'sweetalert2';

const initialState = {
  referencia: '',
  descripcion: '',
  precio: '',
  stock: ''
}

class NuevoProducto extends Component {
  state = {
    ...initialState
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

  crearNuevoProducto = (e, nuevoProducto) => {
    e.preventDefault();
    // insertar en la base de datos
    nuevoProducto()
      .then(data => {
        Swal.fire(
          '¡Creado!',
          'El producto ha sido creado.',
          'success'
        )

        this.limpiarState()

        this.props.history.push('/productos')
      })
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
        <h2 className="text-center">Nuevo Producto</h2>
        <div className="row justify-content-center mt-4">
          <Mutation mutation={NUEVO_PRODUCTO} variables={{ input }}>
            {(nuevoProducto, { loading, error, data }) => {
              return (
                <form 
                  className="col-md-8"
                  onSubmit={e => this.crearNuevoProducto(e, nuevoProducto)}
                >
                  <div className="form-group">
                    <label>Referencia:</label>
                    <input 
                      type="text"
                      name="referencia" 
                      className="form-control" 
                      placeholder="Referencia del Producto"
                      onChange={this.actualizarState}
                    />
                  </div>
                  <div className="form-group">
                    <label>Descripción:</label>
                    <input 
                      type="text"
                      name="descripcion" 
                      className="form-control" 
                      placeholder="Descripción del Producto"
                      onChange={this.actualizarState}
                    />
                  </div>
                  <div className="form-group">
                    <label>Precio:</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">$</div>
                      </div>
                      <input 
                        type="number" 
                        name="precio" 
                        className="form-control" 
                        placeholder="Precio del Producto"
                        onChange={this.actualizarState}
                      />
                    </div>
                  </div>
                    <div className="form-group">
                      <label>Stock:</label>
                      <input 
                        type="number" 
                        name="stock" 
                        className="form-control" 
                        placeholder="stock del Producto" 
                        onChange={this.actualizarState}
                      />
                    </div>
                    <button 
                      disabled={this.validarForm()}
                      type="submit" 
                      className="btn btn-success float-right">
                        Crear Producto
                    </button>
                    <Link to="/">
                      <button type="button" className="btn btn-danger float-right mr-2">
                        Cancelar
                      </button>
                    </Link>
                </form>
              )
            }}
          </Mutation>
        </div>
      </>
    );
  }
}

export default NuevoProducto;
