import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
    <div className="container">
      <Link className="navbar-brand text-light font-weight-bold" to="/">CMR</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navegacion">
        <ul className="navbar-nav ml-auto text-right">
          <li className="nav-item active">
            <Link className="btn btn-success mr-2" to="/cliente/nuevo">Nuevo Cliente</Link>
            <Link className="btn btn-success" to="/productos/nuevo">Nuevo Producto</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;