import React, { useContext } from 'react'
import { AuthContext } from '@/store/contexts/AuthContext'
import { logout } from '@/utils/authentication/auth.utils'
import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Text } from '@chakra-ui/layout'
import { 
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/popover'

export const UserPopover = ({ name }) => {
  const { authDispatch } = useContext(AuthContext)
  return (
  
    <Popover >
      <PopoverTrigger>
        <Avatar size="sm" src={`https://avatars.dicebear.com/api/big-ears-neutral/${name}.svg`} >
            
        </Avatar>
      </PopoverTrigger>
      <PopoverContent w="2xs" minH="2xs" shadow="md" p="2">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{name}</PopoverHeader>
        <PopoverBody >
          <Button
            size="md"
            color="white"
            border="none"
            borderRadius="none"
            bg="blue.400"
            mt="4"
            onClick={() => {
              logout().then(() => {authDispatch({ type: 'LOGOUT' })})
              window.location.reload()
            }}
          >
            <Text>Sign Out</Text>
          </Button>
  
        </PopoverBody>
      </PopoverContent>
    </Popover>
  
  )
}
  