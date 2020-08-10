import React from 'react';
import { Query } from 'react-apollo';
import { OBTENER_PRODUCTO } from '../../queries';
import ResumenProducto from './ResumenProducto';

const Pedido = (props) => {
  const { pedido } = props
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
  return (
    <div className="col-md-4">
      <div className={`card mb-3`} >
        <div className="card-body">
          <p className="card-text font-weight-bold ">Estado:
            <select
              value={pedido.estado}
              className="form-control my-3"
            >
              <option value="PENDIENTE">PENDIENTE</option>
              <option value="COMPLETADO">COMPLETADO</option>
              <option value="CANCELADO">CANCELADO</option>
            </select>
          </p> 
          <p className="card-text font-weight-bold">Pedido ID:
            <span className="font-weight-normal"> {pedido.id}</span>
          </p> 
          <p className="card-text font-weight-bold">Fecha Pedido:
            <span className="font-weight-normal"> {fecha.toLocaleString('es-CO')}</span>
          </p>
          <p className="card-text font-weight-bold">Total: 
            <span className="font-weight-normal"> ${addCommas(pedido.total)}</span>
          </p>
          <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
          { pedido.pedido.map((producto, index) => {
            const { id } = producto
            return (
              <Query key={index+id} query={OBTENER_PRODUCTO} variables={{id}}>
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
        </div>
      </div>
    </div>
  );
}

export default Pedido;
