import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { NUEVO_CLIENTE } from '../mutations';

class NuevoCliente extends Component {
  state = {
    cliente: {
      nombre: '',
      apellido: '',
      cedula: '',
      telefono: '',
      ciudad: '',
      direccion: '',
      tipo: ''
    },
    error: false,
    emails: []
  }

  nuevoCampo = () => {
    this.setState({
      emails: this.state.emails.concat([{email: ''}])
    })
  }

  quitarCampo = i => () => {
    this.setState({
      emails: this.state.emails.filter((email, index) => i !== index)
    })
  }

  leerCampo = i => e => {
    const nuevoEmail = this.state.emails.map((email, index) => {
      if(i !== index) return email
      return {
        ...email,
        email: e.target.value
      }
    })
    this.setState({
      emails: nuevoEmail
    })
  }

  render() {
    const { error } = this.state
    let respuesta = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son Obligatorios</p> : '';
    return (
      <>
        <h2 className="text-center">Nuevo Cliente</h2>
        {respuesta}
        <div className="row justify-content-center mt-4">
          <Mutation 
            mutation={NUEVO_CLIENTE}
            onCompleted={() => this.props.history.push('/')}
          >
            { crearCliente => (
              <form className="col-md-8 m-3"
                onSubmit={e => {
                  e.preventDefault();
                  const {nombre, apellido, cedula, telefono, ciudad, direccion, tipo} = this.state.cliente;
                  const { emails } = this.state

                  if(nombre === '' || apellido === '' || telefono === '' || ciudad === '' || direccion === '' || tipo === '') {
                    this.setState({
                      error: true
                    });
                    setTimeout(() => {
                      this.setState({
                        error: false
                      })
                    }, 3000);
                    return
                  }

                  this.setState({
                    error: false
                  })

                  const input = {
                    nombre,
                    apellido,
                    cedula,
                    telefono,
                    ciudad,
                    direccion,
                    tipo,
                    emails
                  }

                  crearCliente({
                    variables: { input }
                  })
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
                  <div className="form-group col-md-12">
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
                  { this.state.emails.map((input, index) => (
                    <div key={index} className="form-group col-md-12">
                      <label>Correo {index + 1}</label>
                      <div className="input-group">
                        <input
                          type="email"
                          placeholder={`Correo ${index + 1}`}
                          className="form-control"
                          onChange={this.leerCampo(index)}
                        />
                        <div className="input-group-append">
                          <button type="button" className="btn btn-danger" onClick={this.quitarCampo(index)}>&times; Eliminar</button>
                        </div>
                      </div>
                    </div>
                  )) }
                  <div className="form-group d-flex justify-content-center col-md-12">
                      <button 
                        type="button"
                        className="btn btn-warning"
                        onClick={this.nuevoCampo}
                      >
                        + Agregar Email
                      </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-success float-right">Agregar Cliente</button>
              </form>
            )}
          </Mutation>
        </div>
      </>
    );
  }
}

export default NuevoCliente;
