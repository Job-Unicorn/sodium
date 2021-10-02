import React from 'react'
import { useColorModeValue, Box, Flex, Spacer, Text } from '@chakra-ui/react'


const PersonalChat = ({ chat }) => {
  return (
    <Flex>
      <Spacer w="full" />
      <Box bg={useColorModeValue('blue.50', 'whiteAlpha.100')} p="4" mb="4" w="96" borderColor={useColorModeValue('gray.300', 'whiteAlpha.300')} shadow="sm" borderWidth="thin" rounded="lg" >
        <Flex flexDir="column">
          <Text>{chat.message}</Text>
          <Flex>
            <Spacer />
            <Text fontSize="xs" color="gray" >{(chat.time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

export default PersonalChat
