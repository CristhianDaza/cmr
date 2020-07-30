import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql `
  query getClientes($limite: Int, $offset: Int){
    getClientes(limite: $limite, offset: $offset) {
      id
      nombre
      apellido
    }
    totalClientes
  }
`;

export const CLIENTE_QUERY = gql `
  query ConsultarCliente($id: ID) {
    getCliente(id: $id){
      id
      nombre
      apellido
      telefono
      cedula
      ciudad
      direccion
      tipo
      emails {
        email
      }
    }
  }
`;