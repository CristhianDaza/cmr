import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Clientes from './components/Clientes/Clientes'
import EditarCliente from './components/Clientes/EditarCliente'
import NuevoCliente from './components/Clientes/NuevoCliente'
import nuevoProducto from './components/Productos/NuevoProducto'

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
              <Route exact path="/" component={Clientes} />
              <Route exact path="/cliente/editar/:id" component={EditarCliente} />
              <Route exact path="/cliente/nuevo" component={NuevoCliente} />
              <Route exact path="/producto/nuevo" component={nuevoProducto} />
            </Switch>
          </div>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
