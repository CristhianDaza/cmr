import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { AUTENTICAR_USAURIO } from '../../mutations';
import Swal from 'sweetalert2';

const initialState = {
    usuario : '',
    password: ''
}
class Login extends Component {
  state = {
    ...initialState
  }
  actualizarState = e => {
    const { name, value} = e.target;

    this.setState({
      [name] : value
    })
  }

  limpiarState = () => {
    this.setState({...initialState});
  }
  iniciarSesion = (e, usuarioAutenticar) => {
    e.preventDefault();
    usuarioAutenticar()
      .then(async ({data}) => {
        localStorage.setItem('token', data.autenticarUsuario.token)
        this.limpiarState()

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Inicio de sesión exitosamente.'
        })
      })
  }
  validarForm = () => {
    const {usuario, password} = this.state;
    const noValido = !usuario || !password;
    return noValido;
  }
  render() { 
    const {usuario, password} = this.state;
    return ( 
      <>
        <h1 className="text-center mb-5">Iniciar Sesión</h1>
        <div className="row  justify-content-center">
          <Mutation 
            mutation={AUTENTICAR_USAURIO}
            variables={{usuario, password}}    
          >
            {( usuarioAutenticar, {loading, error, data}) => {
              return (
                <form 
                  onSubmit={ e => this.iniciarSesion(e, usuarioAutenticar) } 
                  className="col-md-8"
                >
                  <div className="form-group">
                    <label>Usuario</label>
                    <input 
                      onChange={this.actualizarState} 
                      value={usuario}
                      type="text" 
                      name="usuario" 
                      className="form-control" 
                      placeholder="Nombre Usuario" 
                    />
                  </div>
                  <div className="form-group">
                  <label>Password</label>
                  <input 
                    onChange={this.actualizarState} 
                    value={password}
                    type="password" 
                    name="password" 
                    className="form-control" 
                    placeholder="Password"
                  />
                  </div>
                  <button 
                    disabled={ 
                      loading || this.validarForm()
                    }
                    type="submit" 
                    className="btn btn-success float-right">
                      Iniciar Sesión
                  </button>
              </form>
              )     
            }}
          </Mutation>
        </div>
      </>
    );
  }
}
 
export default withRouter(Login);