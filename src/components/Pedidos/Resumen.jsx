import React from 'react';
import Producto from './Producto'

const Resumen = (props) => {
  let productos = props.productos
  if(productos === null || productos === '' || productos === undefined) {
    productos = []
  }
  if(productos.length === 0) return null
  return (
    <>
      <h2 className="text-center my-5">Resumen y Cantidades</h2>
      <table className="table">
        <thead className="bg-success text-white">
          <tr className="font-wight-bold">
            <th>REFERENCIA</th>
            <th>DESCRIPCIÓN</th>
            <th>PRECIO</th>
            <th>CANTIDAD</th>
            <th>ELIMNAR</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <Producto
              key={producto.id}
              id={producto.id}
              producto={producto}
              index={index}
              actualizarCantidad={props.actualizarCantidad}
              eliminarProducto={props.eliminarProducto}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Resumen;
