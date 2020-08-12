import React from 'react';
import { Query } from 'react-apollo';
import { CLIENTE_QUERY } from '../../queries';

const DatosCliente = ({ id }) => {
  return (
    <>
      <h2 className="text-center mb-3">Cliente</h2>
      <Query query={CLIENTE_QUERY} variables={{ id }} pollInterval={500}>
        {({ loading, error, data, startPolling, stopPolling }) => {
          if(loading) return 'Cargando...'
          if(error) return `Error: ${error.message}`;
          const { nombre, apellido, telefono, cedula, ciudad, direccion, emails, tipo } = data.getCliente;
          return (
            <ul className="list-unstyled my-5">
              <li className="border font-weight-bold text-primary p-2">Cédula: <span className="font-weight-normal">{cedula}</span></li>
              <li className="border font-weight-bold text-primary p-2">Nombre: <span className="font-weight-normal">{nombre}</span></li>
              <li className="border font-weight-bold text-primary p-2">Apellido: <span className="font-weight-normal">{apellido}</span></li>
              <li className="border font-weight-bold text-primary p-2">Teléfono: <span className="font-weight-normal">{telefono}</span></li>
              <li className="border font-weight-bold text-primary p-2">E-mail: <span className="font-weight-normal">{emails.map(email => ` ${email.email}` )}</span></li>
              <li className="border font-weight-bold text-primary p-2">Ciudad: <span className="font-weight-normal">{ciudad}</span></li>
              <li className="border font-weight-bold text-primary p-2">Dirección: <span className="font-weight-normal">{direccion}</span></li>
              <li className="border font-weight-bold text-primary p-2">Tipo: <span className="font-weight-normal">{tipo}</span></li>
              
            </ul>
          )
        }}
      </Query>
    </>
  );
}

export default DatosCliente;
