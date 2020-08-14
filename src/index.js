import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RootSession } from './App';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: "https://bellaserver.herokuapp.com/graphql",
  // uri: "http://localhost:4000/graphql",
  // enviar token al servidor
  // fetchOptions: {
  //   mode: 'no-cors',
  //   credentials: 'include'
  // },
  request: operation => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({ networkError, graphQLErros }) => {
    console.log('graphQLErros', graphQLErros)
    console.log('networkError', networkError)
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootSession />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
