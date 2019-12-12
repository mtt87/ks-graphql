import React, { useEffect } from "react";
import { Flex, Button, Box, Text } from "rebass";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const LIST_ACCOUNTS = gql`
  query listAccounts {
    accounts {
      id
      name
      balance
    }
  }
`;

const Nav = ({ login, logout, isAuthenticated = false, userId }) => {
  const [listAccounts, { loading, data, error }] = useLazyQuery(LIST_ACCOUNTS);
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
  const renderBalance = () => {
    if (!isAuthenticated || loading || error || !data) {
      return null;
    }
    const totalBalance = data.accounts.reduce((acc, val) => {
      return (acc += val.balance);
    }, 0);
    return <Text>Total balance: {totalBalance}</Text>;
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
