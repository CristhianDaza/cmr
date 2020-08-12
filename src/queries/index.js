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

export const OBTENER_PRODUCTOS = gql `
  query obtenerProductos($limite: Int, $offset: Int, $stock: Boolean) {
    obtenerProductos(limite: $limite, offset: $offset, stock: $stock) {
      id
      referencia
      descripcion
      stock
      precio
    }
    totalProductos
  }
`;

export const OBTENER_PRODUCTO = gql `
query obtenerProducto($id: ID!) {
  obtenerProducto(id: $id) {
    referencia
    descripcion
    stock
    precio
  }
}`;

export const OBTENER_PEDIDOS = gql `
query obtnerPedidos($cliente: ID) {
  obtenerPedidos(cliente: $cliente) {
    id
    total
    fecha
    estado
    pedido {
      id
      cantidad
    }
  }
}`

export const TOP_CLIENTES = gql `
query topClientes {
  topClientes{
    total
    cliente{
      nombre
    }
  }
}
`

export const USUARIO_ACTUAL = gql `
  query obtenerUsuario {
    obtenerUsuario {
      usuario
    }
  }
`