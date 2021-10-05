import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/store/contexts/AuthContext'
import { login } from '@/utils/authentication/auth.utils'
import { WALLET_NOT_FOUND } from '@/utils/errors/auth.errors'


const SignIn = ({...rest}) => {

  const toast = useToast()

  const { authDispatch } = useContext(AuthContext)

  return (
    <Link 
      {...rest}
      color={'blue.400'}
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
      }}
    >
     Sign In
    </Link>
  )
}
  
export default function SignUpForm() {

  const router = useRouter()

  const { authState } = useContext(AuthContext)

  useEffect(() => {
    if (authState.isLoggedIn) {
      router.replace('/jobs')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isLoggedIn])

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link href="/features" color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="first-name">
              <FormLabel>First Name</FormLabel>
              <Input 
                type="text"
                placeholder="John"
              />
            </FormControl>
            <FormControl id="last-name">
              <FormLabel>Last Name</FormLabel>
              <Input 
                type="text"
                placeholder="Doe"
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input 
                type="email"
                placeholder="johndoe@email.com"
              />
            </FormControl>
            <FormControl id="linkedin">
              <FormLabel>LinkedIn</FormLabel>
              <Input 
                type="url"
                placeholder="https://linkedin.com/in/username"
              />
            </FormControl>
            <FormControl id="resume">
              <FormLabel>Resume</FormLabel>
              <Input type="file" py="1" />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                mt={4}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                  Sign Up
              </Button>
            </Stack>
            
          </Stack>
        </Box>
        <Text textAlign="center">
          Already have an account? 
          <SignIn ml="2" />
        </Text>
      </Stack>
    </Flex>
  )
}