import React from 'react';
import { Mutation } from 'react-apollo';
import { NUEVO_PEDIDO } from '../../mutations';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const validadPedido = (props) => {
  let noValido = !props.productos || props.total <= 0
  return noValido;
}

const GenerarPedido = (props) => {
  return (
    <>
      <Mutation
        mutation={NUEVO_PEDIDO}
        onCompleted={() => props.history.push('/clientes')}>
        { nuevoPedido => (
          <button
            type="button"
            className="btn btn-warning mt-4"
            disabled={validadPedido(props)}
            onClick={e => {
              const {nombre, precio, stock, ...obj} = props.productos
              const productosInput = props.productos.map(({referencia, descripcion, precio, stock, ...objeto}) => objeto);
              const input = {
                pedido: productosInput,
                total: props.total,
                cliente: props.idCliente
              }
              Swal.fire(
                '¡Creado!',
                'El pedido ha sido creado.',
                'success'
              )
              nuevoPedido({
                variables: {input}
              })
            }}
          >
            Generar Pedido
          </button>
        )}
      </Mutation>
    </>
  );
}

export default withRouter(GenerarPedido);
