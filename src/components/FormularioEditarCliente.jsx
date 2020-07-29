import React, { Component } from 'react';
import { ACTUALIZAR_CLIENTE } from '../mutations'
import { Mutation } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom' 

class FormularioEditarCliente extends Component {
  state =  {
    cliente: this.props.cliente,
    emails: this.props.cliente.emails
  }

  nuevoCampo = () => {
    this.setState({
      emails: this.state.emails.concat([{email:''}])
    })
  }

  leerCampo = i => e => {
    const nuevoMail = this.state.emails.map((email, index) => {
      if (i !== index) return email;
      return { ...email, email: e.target.value };
    });
    this.setState({ emails: nuevoMail });
  }

  quitarCampo = i => () => {
    this.setState({
      emails: this.state.emails.filter((s, index) => i !== index)
    });
  }

  render() {
    const {nombre, apellido, cedula, telefono, ciudad, direccion, tipo} = this.state.cliente
    const {emails} = this.state;
    return (
      <Mutation
        mutation={ACTUALIZAR_CLIENTE}
        onCompleted={() => this.props.refetch().then(() => this.props.history.push('/'))}
      >
        {actualizarCliente => (
          <form 
            className="col-md-8 m-3" 
            onSubmit={e => {
              e.preventDefault();
              const {id, nombre, apellido, cedula, telefono, ciudad, direccion, tipo} = this.state.cliente;
              const { emails } = this.state.cliente;
              const input = {
                id,
                nombre,
                apellido,
                cedula,
                telefono,
                ciudad,
                direccion,
                tipo,
                emails
              }
              actualizarCliente({
                variables: { input }
              })
            }}

          >
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Nombre</label>
                <input
                  type="text" 
                  className="form-control"
                  defaultValue={nombre}
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        nombre: e.target.value
                      }
                    })
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Apellido</label>
                <input 
                  type="text" 
                  className="form-control"
                  defaultValue={apellido}
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        apellido: e.target.value
                      }
                    })
                  }}
                  />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Cédula</label>
                <input
                  type="number" 
                  className="form-control" 
                  defaultValue={cedula}
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        cedula: e.target.value
                      }
                    })
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Teléfono</label>
                <input 
                  type="number" 
                  className="form-control" 
                  defaultValue={telefono}
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        telefono: e.target.value
                      }
                    })
                  }}
                  />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Ciudad</label>
                <input
                  type="text" 
                  className="form-control" 
                  defaultValue={ciudad}
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        ciudad: e.target.value
                      }
                    })
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Dirección</label>
                <input 
                  type="text" 
                  className="form-control" 
                  defaultValue={direccion}
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        direccion: e.target.value
                      }
                    })
                  }}
                  />
              </div>
            </div>
                
            <div className="form-row">
              <div className="form-group col-md-12">
                <label>Tipo Cliente</label>  
                <select 
                  className="form-control"
                  defaultValue={tipo}
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
                  <option value="PREMIUM">PREMIUM</option>
                  <option value="BASICO">BÁSICO</option>
                </select>
              </div>

              {emails.map((input, index) => (
                <div key={index} className="form-group col-md-12">
                  <label>Email {index + 1} : </label>
                  <div className="input-group">
                    <input 
                      type="email"
                      placeholder={`Email`}
                      className="form-control" 
                      onChange={this.leerCampo(index)}
                      defaultValue={input.email}
                      onChange={e => {
                        this.setState({
                          cliente: {
                            ...this.state.cliente,
                            no: e.target.value
                          }
                        })
                      }}
                    />
                    <div className="input-group-append">
                      <button 
                        className="btn btn-danger" 
                        type="button" 
                        onClick={this.quitarCampo(index)}> 
                        &times; Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="form-group d-flex justify-content-center col-md-12">
                <button 
                  onClick={this.nuevoCampo}
                  type="button" 
                  className="btn btn-warning"
                >+ Agregar Email</button>
              </div>
            </div>
            <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
            <Link to="/">
              <button type="button" className="btn btn-danger float-right mr-2">
                  Cancelar
              </button>
            </Link>
          </form>
        )}
      </Mutation>
    )      
  }
}
 

export default withRouter(FormularioEditarCliente);