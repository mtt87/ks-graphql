import React, { useState, useCallback, useEffect } from "react";
import Nav from "../components/Nav";
import User from "../components/User";
import { gql } from "apollo-boost";
import { Flex, Box, Text } from "rebass";
import { useLazyQuery } from "@apollo/react-hooks";
import UpdateAccount from "../components/UpdateAccount";
import Account from "../components/Account";

const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      avatarUrl
      accounts {
        id
        balance
        name
      }
    }
  }
`;

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [getUser, { loading, data, error }] = useLazyQuery(GET_USER);
  const login = userId => {
    setUserId(userId);
    setIsAuthenticated(true);
  };
  const logout = () => {
    setUserId(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (isAuthenticated && userId) {
      getUser({
        variables: {
          id: userId
        }
      });
    }
  }, [isAuthenticated, userId]);
  const renderContent = () => {
    if (!isAuthenticated) {
      return <Text textAlign="center">You need to login</Text>;
    }
    if (loading) {
      return <Text>Loading...</Text>;
    }
    if (error) {
      return <Text>Error</Text>;
    }
    if (!data) {
      return null;
    }
    return (
      <Flex justifyContent="space-between">
        <Box flex={1}>
          <User
            email={data.user.email}
            name={data.user.name}
            avatarUrl={data.user.avatarUrl}
          />
          {data.user.accounts.map(a => (
            <Account key={a.id} id={a.id} balance={a.balance} name={a.name} />
          ))}
        </Box>
        <Box>
          <UpdateAccount />
        </Box>
      </Flex>
    );
  };
  return (
    <div>
      <Nav
        userId={userId}
        login={login}
        logout={logout}
        isAuthenticated={isAuthenticated}
      />
      {renderContent()}
    </div>
  );
};

export default Home;
