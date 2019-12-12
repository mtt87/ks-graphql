import React from "react";
import { Text, Box } from "rebass";

export default function Account({ id, name, balance }) {
  return (
    <Box bg="#c5e1a5" p={2}>
      <Text fontSize={3}>{id}</Text>
      <Text>Name: {name}</Text>
      <Text>Balance: {balance}</Text>
    </Box>
  );
}
