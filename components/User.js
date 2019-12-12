import React from 'react';
import { Flex, Image, Text, Box } from 'rebass';

function User({ name, email, avatarUrl }) {
  return (
    <Flex
      sx={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#bbb',
        borderRadius: 4,
      }}
      alignItems="center"
      p={3}
    >
      <Image
        src={avatarUrl}
        mr={3}
        sx={{
          width: 100,
          height: 100,
          borderRadius: 9999,
        }}
      />
      <Box>
        <Text mb={1} fontSize={5}>
          {name}
        </Text>
        <Text color="grey">{email}</Text>
      </Box>
    </Flex>
  );
}

export default User;
