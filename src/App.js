import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Clientes from './components/Clientes/Clientes'
import EditarCliente from './components/Clientes/EditarCliente'
import NuevoCliente from './components/Clientes/NuevoCliente'
import NuevoProducto from './components/Productos/NuevoProducto'
import Productos from './components/Productos/Productos'
import EditarProducto from './components/Productos/EditarProducto'
import NuevoPedido from './components/Pedidos/NuevoPedido'
import PedidosCliente from './components/Pedidos/PedidosCliente';

// Components
import Header from './components/Layout/Header'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({ networkError, graphQLErros }) => {
    console.log('graphQLErros', graphQLErros)
    console.log('networkError', networkError)
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/clientes" component={Clientes} />
              <Route exact path="/clientes/editar/:id" component={EditarCliente} />
              <Route exact path="/clientes/nuevo" component={NuevoCliente} />
              <Route exact path="/productos/nuevo" component={NuevoProducto} />
              <Route exact path="/productos" component={Productos} />
              <Route exact path="/productos/editar/:id" component={EditarProducto} />
              <Route exact path="/pedidos/:id" component={PedidosCliente} />
              <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
            </Switch>
          </div>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
