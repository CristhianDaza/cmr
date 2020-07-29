import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql `{
  getClientes {
    nombre
    apellido
  }
}`;