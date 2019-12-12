import React from 'react';
import { Flex, Button, Box, Text } from 'rebass';

const Nav = ({ login, logout, isAuthenticated = false, totalBalance }) => {
  return (
    <nav>
      <Flex flexDirection="row" my={3} alignItems="center">
        {isAuthenticated && <Text>Total balance: {totalBalance}</Text>}
        <Box mx="auto" />
        {isAuthenticated ? (
          <Button variant="outline" onClick={() => logout()}>
            Logout
          </Button>
        ) : (
          <>
            <Button variant="outline" mr={2} onClick={() => login('user_1')}>
              Login as user 1
            </Button>
            <Button variant="outline" onClick={() => login('user_2')}>
              Login as user 2
            </Button>
          </>
        )}
      </Flex>
    </nav>
  );
};

export default Nav;
