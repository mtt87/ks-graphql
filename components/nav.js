import React, { useEffect, useState } from "react";
import { Flex, Button, Box, Text } from "rebass";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import moment from "moment";
import useInterval from "@use-it/interval";

const LIST_ACCOUNTS = gql`
  query listAccounts {
    accountsLastUpdated @client
    accounts {
      id
      name
      balance
    }
  }
`;

const Nav = ({ login, logout, isAuthenticated = false, userId }) => {
  const [lastUpdated, setLastUpdated] = useState(null);
  const [listAccounts, { loading, data, error }] = useLazyQuery(LIST_ACCOUNTS, {
    fetchPolicy: "cache-and-network",
    onCompleted: data =>
      setLastUpdated(moment(data.accountsLastUpdated).fromNow())
  });
  useEffect(() => {
    if (isAuthenticated && userId) {
      listAccounts({
        context: {
          headers: {
            "user-id": userId
          }
        }
      });
    }
  }, [isAuthenticated, userId]);
  useInterval(() => {
    if (data) {
      setLastUpdated(moment(data.accountsLastUpdated).fromNow());
    }
  }, 5000);
  const renderBalance = () => {
    if (!isAuthenticated || loading || !data) {
      return null;
    }
    const totalBalance = data.accounts.reduce((acc, val) => {
      return (acc += val.balance);
    }, 0);
    return (
      <Flex>
        <Text mr={4}>Total balance: {totalBalance}</Text>
        <Text color="grey">
          Last updated:{" "}
          {lastUpdated || moment(data.accountsLastUpdated).fromNow()}
        </Text>
      </Flex>
    );
  };
  return (
    <nav>
      <Flex flexDirection="row" my={3} alignItems="center">
        {renderBalance()}
        <Box mx="auto" />
        {isAuthenticated ? (
          <Button variant="outline" onClick={() => logout()}>
            Logout
          </Button>
        ) : (
          <>
            <Button variant="outline" mr={2} onClick={() => login("user_1")}>
              Login as user 1
            </Button>
            <Button variant="outline" onClick={() => login("user_2")}>
              Login as user 2
            </Button>
          </>
        )}
      </Flex>
    </nav>
  );
};

export default Nav;
