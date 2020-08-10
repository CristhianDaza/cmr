import React from 'react';

const validadPedido = (props) => {
  let noValido = !props.productos || props.total === 0
  return noValido;
}

const GenerarPedido = (props) => {
  return (
    <button type="button" className="btn btn-warning mt-4" disabled={validadPedido(props)}>
      Generar Pedido
    </button>
  );
}

export default GenerarPedido;
