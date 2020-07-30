import React, { Component } from 'react';

class Paginador extends Component {
  state = { 
    paginador: {
      paginas: Math.ceil(Number(this.props.totalClientes) / this.props.limite)
    }
  }

  
  
  render() {
    const { actual } = this.props;
    const btnAnterior = (actual > 1) ? <button onClick={this.props.paginaAnterior} className="page-link" type="button">&laquo; Anterior</button> : '';
    const { paginas } = this.state.paginador;
    const btnSiguiente = (actual !== paginas) ? <button onClick={this.props.paginaSiguiente} className="page-link" type="button">Siguiente &raquo;</button> : '';

    return (
      <>
        <div className="mt-5 d-flex justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              { btnAnterior }
            </li>
            <li className="page-item">
              { btnSiguiente }
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Paginador;
