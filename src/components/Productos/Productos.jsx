import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { OBTENER_PRODUCTOS } from '../../queries';
import { Link } from 'react-router-dom';
import { ELIMINAR_PRODUCTO } from '../../mutations';
import Swal from 'sweetalert2';

class Productos extends Component {
  render() {
    return (
      <>
        <h1 className="text-center mb-5">Productos</h1>
        <Query query={OBTENER_PRODUCTOS} pollInterval={1000}>
          {({ loading, error, data, startPolling, stopPolling }) => {
            if(loading) return 'Cargando...'
            if(error) return `Error: ${error.message}`
            
            return (
              <table className="table">
                <thead>
                  <tr className="table-primary">
                    <th scope="col">REFERENCIA</th>
                    <th scope="col">DESCRIPCIÓN</th>
                    <th scope="col">PRECIO</th>
                    <th scope="col">EXISTENCIAS</th>
                    <th scope="col">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {data.obtenerProductos.map(item => {
                    const { id } = item
                    
                    return (
                      <tr key={id}>
                        <td>{item.referencia}</td>
                        <td>{item.descripcion}</td>
                        <td>{item.precio}</td>
                        <td>{item.stock}</td>
                        <td>
                          <Mutation mutation={ELIMINAR_PRODUCTO}>
                            {eliminarProducto => (
                              <button 
                                type="button" 
                                className="btn btn-danger mr-2"
                                onClick={() => {
                                  Swal.fire({
                                    title: '¿Estas seguro?',
                                    text: "¡No podrás revertir esto!",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    cancelButtonText: 'Cancelar',
                                    confirmButtonText: '¡Si, eliminar!'
                                  }).then((result) => {
                                    if (result.value) {
                                      eliminarProducto({
                                        variables: { id }
                                      })
                                      Swal.fire(
                                        '¡Eliminado!',
                                        'El producto ha sido eliminado.',
                                        'success'
                                      )
                                    }
                                  })
                                }}
                              >
                                &times; Eliminar
                              </button>
                            )}
                          </Mutation>
                          <Link to={`/productos/editar/${id}`}><button type="button" className="btn btn-success">Editar</button></Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )
          }}
        </Query>
      </>
    );
  }
}

export default Productos;