import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Clientes from './components/Clientes/Clientes'
import EditarCliente from './components/Clientes/EditarCliente'
import NuevoCliente from './components/Clientes/NuevoCliente'
import NuevoProducto from './components/Productos/NuevoProducto'
import Productos from './components/Productos/Productos'
import EditarProducto from './components/Productos/EditarProducto'
import NuevoPedido from './components/Pedidos/NuevoPedido'
import PedidosCliente from './components/Pedidos/PedidosCliente';
import Panel from './components/Panel/Panel';

// Components
import Header from './components/Layout/Header'
import Registro from './components/Auth/Registro';
import Login from './components/Auth/Login';
import Session from './components/Session';

const App = ({refetch, session}) => {
  const { obtenerUsuario } = session;
  const mensaje = (obtenerUsuario) ? `Bienvenid@: ${obtenerUsuario.usuario}` : <Redirect to="/login" />
  return (
    <Router>
      <>
        <Header session={session} />
        <div className="container">
          <p className="text-right">{ mensaje }</p>
          <Switch>
            <Route exact path="/clientes" component={Clientes} />
            <Route exact path="/clientes/editar/:id" component={EditarCliente} />
            <Route exact path="/clientes/nuevo" component={NuevoCliente} />
            <Route exact path="/productos/nuevo" component={NuevoProducto} />
            <Route exact path="/productos" component={Productos} />
            <Route exact path="/productos/editar/:id" component={EditarProducto} />
            <Route exact path="/pedidos/:id" component={PedidosCliente} />
            <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
            <Route exact path="/panel" component={Panel} />
            <Route exact path="/registro" component={Registro} />
            <Route exact path="/login"render={() => <Login refetch={refetch} />} />
          </Switch>
        </div>
      </>
    </Router>
  );
}

const RootSession = Session(App);

export { RootSession }
