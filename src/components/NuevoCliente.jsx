import React, { Component, Fragment } from 'react';

class NuevoCliente extends Component {
  state = {
    cliente: {
      nombre: '',
      apellido: '',
      cedula: '',
      telefono: '',
      ciudad: '',
      direccion: '',
      tipo: '',
      email: ''
    }
  }

  render() {
    return (
      <>
        <h2 className="text-center">Nuevo Cliente</h2>
        <div className="row justify-content-center mt-4">
          <form className="col-md-8 m-3"
            onSubmit={e => {
              e.preventDefault();
              const {nombre, apellido, cedula, telefono, ciudad, direccion, tipo,email} = this.state.cliente;
              const input = {
                nombre,
                apellido,
                cedula,
                telefono,
                ciudad,
                direccion,
                tipo,
                email
              }

              console.log(input)
            }}
          >
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Nombre</label>
                <input 
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        nombre: e.target.value
                      }
                    })
                  }} 
                  type="text" 
                  className="form-control" 
                  placeholder="Nombre"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Apellido</label>
                <input 
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        apellido: e.target.value
                      }
                    })
                  }} 
                  type="text" 
                  className="form-control" 
                  placeholder="Apellido"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Cédula</label>
                <input 
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        cedula: e.target.value
                      }
                    })
                  }} 
                  type="number" 
                  className="form-control" 
                  placeholder="Cédula"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Teléfono</label>
                <input 
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        telefono: e.target.value
                      }
                    })
                  }} 
                  type="number" 
                  className="form-control" 
                  placeholder="Teléfono"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Ciudad</label>
                <input 
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        ciudad: e.target.value
                      }
                    })
                  }} 
                  type="text" 
                  className="form-control" 
                  placeholder="Ciudad"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Dirección</label>
                <input 
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        direccion: e.target.value
                      }
                    })
                  }} 
                  type="text" 
                  className="form-control" 
                  placeholder="Dirección" 
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Email</label>
                <input 
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        email: e.target.value
                      }
                    })
                  }} 
                  type="email" 
                  className="form-control" 
                  placeholder="Email" 
                />
              </div>
              <div className="form-group col-md-6">
                <label>Tipo Cliente</label>  
                <select 
                  className="form-control"
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        tipo: e.target.value
                      }
                    })
                  }} 
                >
                  <option value="">Elegir...</option>
                  <option value="BASICO">BÁSICO</option>
                  <option value="PREMIUM">PREMIUM</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success float-right">Guardar Cliente</button>
          </form>
        </div>
      </>
    );
  }
}

export default NuevoCliente;
