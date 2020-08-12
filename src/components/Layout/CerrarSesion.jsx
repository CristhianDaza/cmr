import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

const cerrarSesionUsuario = (cliente, history) => {
  localStorage.removeItem('token', '');
  cliente.resetStore()

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
    title: 'Se cerro sesión exitosamente.'
  })
  history.push('/login')
}

const CerrarSesion = ({ history }) => (
  <ApolloConsumer>
    { cliente => {
      return ( 
        <button
          onClick={() => cerrarSesionUsuario(cliente, history)}
          className="btn btn-light ml-md-2 mt-2 mt-md-0"
        >
          Cerrar Sesión
        </button>
      );
    }}
  </ApolloConsumer>
)
 
export default withRouter(CerrarSesion);