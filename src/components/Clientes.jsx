import React from 'react';
import { Link } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo';
import { CLIENTES_QUERY } from '../queries';
import { ELIMINAR_CLIENTE } from '../mutations';
import Swal from 'sweetalert2'

const Clientes = () => (
  <Query query={CLIENTES_QUERY} pollInterval={1000}>
    {({ loading, error, data, startPolling, stopPolling }) => {
      if(loading) return 'Cargando...'
      if(error) return `Error: ${error.message}`
      
      return (
        <>
          <h2 className="text-center">Listado Clientes</h2>
          <ul className="list-group mt-4">
            {data.getClientes.map(item => {
              const { id } = item
              return (
                <li key={item.id} className="list-group-item">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                      {item.nombre} {item.apellido}
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                      <Mutation mutation={ELIMINAR_CLIENTE}>
                        {eliminarCliente => (
                          <button 
                          type="button"
                          className="btn btn-danger db-block d-md-inline-block mr-2"
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
                                eliminarCliente({
                                  variables: { id }
                                })
                                Swal.fire(
                                  '¡Eliminado!',
                                  'El cliente ha sido eliminado.',
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
                      <Link className="btn btn-success d-block d-md-inline-block" to={`/cliente/editar/${item.id}`}>
                        Editar Cliente
                      </Link>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )
    }}
  </Query>
);

export default Clientes;
