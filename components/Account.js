import React from 'react';
import { Text, Box } from 'rebass';

export default function Account({ id, name, balance }) {
  return (
    <Box p={2}>
      <Text fontSize={3}>{id}</Text>
      <Text>Name: {name}</Text>
      <Text>Balance: {balance}</Text>
    </Box>
  );
}
