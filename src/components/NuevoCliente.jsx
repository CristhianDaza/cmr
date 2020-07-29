import React from 'react';

const NuevoCliente = () => {
  return (
    <>
      <h2 className="text-center">Nuevo Cliente</h2>
      <div className="row justify-content-center mt-4">
        <form className="col-md-8 m-3" >
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Nombre</label>
              <input type="text" className="form-control" placeholder="Nombre"/>
            </div>
            <div className="form-group col-md-6">
              <label>Apellido</label>
              <input type="text" className="form-control" placeholder="Apellido"/>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Cédula</label>
              <input type="number" className="form-control" placeholder="Cédula"/>
            </div>
            <div className="form-group col-md-6">
              <label>Teléfono</label>
              <input type="number" className="form-control" placeholder="Teléfono" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Ciudad</label>
              <input type="text" className="form-control" placeholder="Ciudad"/>
            </div>
            <div className="form-group col-md-6">
              <label>Dirección</label>
              <input type="text" className="form-control" placeholder="Dirección" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Tipo Cliente</label>  
              <select className="form-control">
                <option value="">Elegir...</option>
                <option value="BASICO">BÁSICO</option>
                <option value="PREMIUM">PREMIUM</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-success float-right">Guardar Cliente</button>
        </form>
      </div>
    </>
  );
}

export default NuevoCliente;
