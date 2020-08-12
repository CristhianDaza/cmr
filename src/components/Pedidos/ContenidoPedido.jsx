import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Resumen from './Resumen';
import GenerarPedido from './GenerarPedido';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function addCommas(nStr) {
  // eslint-disable-next-line no-param-reassign
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

class ContenidoPedido extends Component {
  state = {
    productos: [],
    total: 0
  }
  
  seleccionarProducto = productos => {
    this.setState({
      productos
    })
    if(this.state.productos === null || this.state.productos === '' || this.state.productos === undefined) {
      this.setState({
        productos: []
      })
    }
  }

  actualizarTotal = () => {
    const productos = this.state.productos;
      
    if(productos.length === 0) {
      this.setState({
        total: 0
      })
      return;
    }

    let nuevoTotal = 0;

    productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio)) 
    
    this.setState({
      total: nuevoTotal
    })
  }

  actualizarCantidad = (cantidad, index) => {
    const productos = this.state.productos;

    productos[index].cantidad = Number(cantidad)

    this.setState({
      productos
    }, () => {
      this.actualizarTotal()
    })
  }

  eliminarProducto = (id) => {
    const productos = this.state.productos;
    const productosRestantes = productos.filter(producto => producto.id !== id);
    this.setState({
      productos: productosRestantes
    }, () => {
      this.actualizarTotal()
    })
  }

  render() {
    const mensaje = (this.state.total < 0)
                    ? Swal.fire(
                      '¡Error!',
                      'Las cantidades no pueden ser negativas.',
                      'error'
                      )
                    : ''
    return (
      <>
        <h2 className="text-center mb-5">Seleccionar Productos</h2>
        <Select
          options={this.props.productos}
          isMulti={true}
          components={makeAnimated()}
          placeholder={'Seleccionar Productos'}
          noOptionsMessage={e=>{return 'No hay más productos'}}
          getOptionValue={(options) => options.id}
          getOptionLabel={(options) => options.descripcion}
          onChange={this.seleccionarProducto}
          value={this.state.productos}
        />
        <Resumen
          productos={this.state.productos}
          actualizarCantidad={this.actualizarCantidad}
          eliminarProducto={this.eliminarProducto}
        />
        <p className="font-weight-bold float-right mt-4">
          Total: <span className="font-weight-normal">${addCommas(this.state.total)}</span>
        </p>
        <GenerarPedido
          productos={this.state.productos}
          total={this.state.total}
          idCliente={this.props.id}
        />
        <Link to="/clientes">
          <button type="button" className="btn btn-danger mt-4 ml-2">
            Cancelar
          </button>
        </Link>
      </>
    );
  }
}

export default ContenidoPedido;
