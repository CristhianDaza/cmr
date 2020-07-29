import gql from 'graphql-tag';
export const NUEVO_CLIENTE = gql`
mutation crearCliente($input: ClienteInput){
  crearCliente(input: $input) {
    id
    nombre
    apellido
  }
}`;

export const ACTUALIZAR_CLIENTE = gql `
  mutation actualizarCliente($input: ClienteInput) {
  actualizarCliente(input: $input){
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
}`;

export const ELIMINAR_CLIENTE = gql `
mutation eliminarCliente($id: ID!) {
  eliminarCliente(id: $id)
}`;