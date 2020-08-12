import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { OBTENER_PRODUCTO, CLIENTE_QUERY } from '../../queries';
import ResumenProducto from './ResumenProducto';
import { ACTUALIZAR_ESTADO } from '../../mutations';
import ReactHTML from 'react-html-table-to-excel';
import '../../pedidos.css'

const Pedido = (props) => {
  const { pedido } = props
  const id = props.cliente;
  console.log(id)

  const fecha = new Date(Number(pedido.fecha))

  function addCommas(nStr) {
    nStr += '';
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? `.${x[1]}` : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1.$2');
    }
    return x1 + x2;
  }

  const { estado } = pedido;
  let clase;
  if(estado === 'PENDIENTE') {
    clase = 'border-light'
  } else if (estado === 'CANCELADO') {
    clase = 'border-danger'
  } else {
    clase = 'border-success'
  }

  return (
    <div className="col-md-6">
      <div className={`card mb-3 ${clase}`} >
        <div className="card-body">
          <p className="card-text font-weight-bold ">Estado:
            <Mutation mutation={ACTUALIZAR_ESTADO}>
              {actualizarEstado => (
              <select
                  value={pedido.estado}
                  onChange={e => {
                    const input = {
                      id: pedido.id,
                      pedido: pedido.pedido,
                      fecha: pedido.fecha,
                      total: pedido.total,
                      cliente: props.cliente,
                      estado: e.target.value
                    }
                    actualizarEstado({
                      variables: {input}
                    })
                  }}
                  className="form-control my-3"
                >
                  <option value="PENDIENTE">PENDIENTE</option>
                  <option value="COMPLETADO">COMPLETADO</option>
                  <option value="CANCELADO">CANCELADO</option>
                </select>
              )}
            </Mutation>
          </p>
          <p className="card-text font-weight-bold">Fecha Pedido:
            <span className="font-weight-normal"> {fecha.toLocaleString('es-CO')}</span>
          </p>
          <table className="table table-hover" id={pedido.id}>
            <thead>
              <tr className="table-primary">
                <th scope="col">Referencia</th>
                <th scope="col">Descripción del producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio Unitario</th>
                <th scope="col">Precio Total</th>
              </tr>
            </thead>
            <tbody>
              { pedido.pedido.map((producto, index) => {
                const { id } = producto
                return (
                  <Query key={index+pedido.id} query={OBTENER_PRODUCTO} variables={{id}}>
                    {({loading, error, data}) => {
                      if(loading) return 'Cargando...'
                      if(error) return `Error ${error.message}`
                      return (
                        <ResumenProducto
                          producto={data.obtenerProducto}
                          cantidad={producto.cantidad}
                          key={producto.id}
                        />
                      )
                    }}
                  </Query>
                )
                }) }
            </tbody>
          </table>
          <div className="d-flex align-items-center justify-content-end">
            <p className="card-text resaltar-texto bg-info">Total: </p>
            <p className="font-weight-normal ml-1 inc-texto">$ {addCommas(pedido.total)}</p>
          </div>
          <Query query={CLIENTE_QUERY} variables={{id}} pollInterval={500}>
            {({ loading, error, data, startPolling, stopPolling }) => {
              if(loading) return 'Cargando...'
              if(error) return `Error: ${error.message}`;
              const { nombre, apellido  } = data.getCliente;
              console.log(data)
              return (
                <ReactHTML
                  className="btn btn-success btn-block"
                  id={id+1}
                  table={pedido.id}
                  filename={`${nombre} ${apellido}`}
                  sheet="Hoja 1"
                  buttonText="Exportar Excel"
                />
              )
            }}
          </Query>
        </div>
      </div>
    </div>
  );
}

export default Pedido;
