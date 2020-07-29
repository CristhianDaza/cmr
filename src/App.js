import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

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
      <Header />
    </ApolloProvider>
  );
}

export default App;
