import React, { useState } from 'react';
import { Flex, Box, Text, Button } from 'rebass';
import { Input, Label } from '@rebass/forms';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const UPDATE_ACCOUNT = gql`
  mutation updateAccount($id: ID!, $input: AccountInput!) {
    updateAccount(id: $id, input: $input) {
      id
      name
      balance
    }
  }
`;

export default function UpdateAccount() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [updateAccount] = useMutation(UPDATE_ACCOUNT, {
    variables: {
      id,
      input: {
        name,
        balance: parseFloat(balance),
      },
    },
  });
  return (
    <Flex px={3} flexDirection="column">
      <Text mb={3} variant="heading">
        Update account
      </Text>
      <Box mb={3}>
        <Label>Id</Label>
        <Input value={id} onChange={e => setId(e.target.value)} />
      </Box>
      <Box mb={3}>
        <Label>Name</Label>
        <Input value={name} onChange={e => setName(e.target.value)} />
      </Box>
      <Box mb={4}>
        <Label>Balance</Label>
        <Input value={balance} onChange={e => setBalance(e.target.value)} />
      </Box>
      <Button onClick={() => updateAccount()}>Update account</Button>
    </Flex>
  );
}
