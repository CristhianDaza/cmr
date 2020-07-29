import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Clientes from './components/Clientes'

// Components
import Header from './components/Header'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
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
              <Route path="/" component={Clientes} />
            </Switch>
          </div>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
