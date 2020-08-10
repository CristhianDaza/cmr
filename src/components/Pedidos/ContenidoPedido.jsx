import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Resumen from './Resumen';
import GenerarPedido from './GenerarPedido';

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? '#272727'
        : isFocused
        ? '#737373'
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? 'black'
        : 'black',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? '#272727' : '#272727'),
      },
    };
  },
  multiValue: styles => {
    return {
      ...styles,
      backgroundColor: '#737373',
    };
  },
  multiValueLabel: styles => ({
    ...styles,
    color: 'white',
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: 'black',
    ':hover': {
      backgroundColor: 'rgb(48, 48, 48)',
      color: 'black',
    },
  }),
  input: styles => ({
    ...styles,
    color: 'black',
    ':hover': {
      backgroundColor: 'red',
      color: 'blue',
    },
  }),
};

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
    return (
      <>
        <h2 className="text-center mb-5">Seleccionar Productos</h2>
        <Select
          options={this.props.productos}
          isMulti={true}
          components={makeAnimated()}
          placeholder={'Seleccionar Productos'}
          styles={colourStyles}
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
          Total: <span className="font-weight-normal">${this.state.total}</span>
        </p>
        <GenerarPedido
          productos={this.state.productos}
          total={this.state.total}
          idCliente={this.props.id}
        />
      </>
    );
  }
}

export default ContenidoPedido;
