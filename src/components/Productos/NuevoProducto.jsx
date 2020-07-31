import React, { Component } from 'react';
import { Link } from 'react-router-dom' 

class NuevoProducto extends Component {
  state = {
    referencia: '',
    descripcion: '',
    precio: '',
    stock: ''
  }

  actualizarState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <>
        <h2 className="text-center">Nuevo Producto</h2>
        <div className="row justify-content-center mt-4">
          <form 
            className="col-md-8"
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
        </div>
      </>
    );
  }
}

export default NuevoProducto;
