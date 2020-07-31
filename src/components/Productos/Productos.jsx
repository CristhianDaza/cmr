import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { OBTENER_PRODUCTOS } from '../../queries';
import { Link } from 'react-router-dom';

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
                          <button type="button" className="btn btn-danger mr-2">&times; Eliminar</button>
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
