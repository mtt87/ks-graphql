import React from "react";
import { Flex, Image, Text, Box } from "rebass";
import Account from "./Account";

function User({ name, email, avatarUrl, accounts = [] }) {
  return (
    <Box p={3} bg="#dcedc8">
      <Flex alignItems="center" p={3}>
        <Image
          src={avatarUrl}
          mr={3}
          sx={{
            width: 100,
            height: 100,
            borderRadius: 9999
          }}
        />
        <Box>
          <Text mb={1} fontSize={5}>
            {name}
          </Text>
          <Text color="grey">{email}</Text>
        </Box>
      </Flex>
      {accounts.map(a => (
        <Account key={a.id} id={a.id} balance={a.balance} name={a.name} />
      ))}
    </Box>
  );
}

export default User;
