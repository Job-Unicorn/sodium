
import React, { useContext } from 'react'
import { AuthContext } from '@/store/contexts/AuthContext'
import {Link, Button, Box, Stack, Text, useToast } from '@chakra-ui/react'
import ToggleTheme from '@/components/general/navbar/ToggleTheme'
import { UserPopover } from '@/components/general/navbar/UserPopover'
import { WALLET_NOT_FOUND } from '@/utils/errors/auth.errors'
import { login } from '@/utils/authentication/auth.utils'



const MenuLinks = ({ isOpen }) => {

  const { authState, authDispatch } = useContext(AuthContext)
  const toast = useToast()
  
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={[2, 6]}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        py={[4, 4, 0, 0]}
      >
        {authState.isLoggedIn ? (
          <Link href="/jobs">Jobs</Link>
        ) : (
          <>
            <Link href="/talent">Hire Talent</Link>
            <Link href="/jobs">Get Hired </Link>
          </>
        )}
  
        <ToggleTheme />
        
        {authState.isLoggedIn ? (
          <>
            <UserPopover name={authState.user.name} />
          </>
        ) : (
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => {
              login()
                .then(({accountId, name}) => {
                  authDispatch({ 
                    type: 'LOGIN',
                    payload: {
                      user : {
                        accountId,
                        name
                      }
                    }
                  })
                })
                .catch((error) => {

                  if (error.message === WALLET_NOT_FOUND) {
                    toast({
                      title: 'Wallet not found',
                      description: 'Please create a wallet',
                      status: 'error',
                      duration: 5000,
                      isClosable: true
                    })
                  } else {
                    toast({
                      title: 'Error',
                      description: error.message,
                      status: 'error',
                      duration: 5000,
                      isClosable: true
                    })
                  }
                })
            }
            }
          >
            <Text>Sign In</Text>
          </Button>
        )}


      </Stack>
    </Box>
  )
}

export default MenuLinks