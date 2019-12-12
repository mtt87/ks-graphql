import React from "react";
import App from "next/app";
import { ThemeProvider } from "emotion-theming";
import theme from "@rebass/preset";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";
import { persistCache } from "apollo-cache-persist";

import ApolloClient, { InMemoryCache } from "apollo-boost";

export default class DemoWebsite extends App {
  state = {
    client: null
  };
  async componentDidMount() {
    const cache = new InMemoryCache();

    await persistCache({
      cache,
      storage: window.localStorage
    });

    const client = new ApolloClient({
      uri: "http://localhost:3001/api/graphql",
      fetch,
      cache,
      resolvers: {
        Query: {
          accountsLastUpdated: () => new Date()
        }
      }
    });

    this.setState({ client });
  }
  render() {
    const { Component, pageProps } = this.props;
    if (!this.state.client) {
      return null;
    }
    return (
      <ApolloProvider client={this.state.client}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
