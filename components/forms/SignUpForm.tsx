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
import { useForm } from 'react-hook-form'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/store/contexts/AuthContext'
import { login, signUp } from '@/utils/authentication/auth.utils'
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

  const { register, handleSubmit, formState : { errors } } = useForm()

  const { authState } = useContext(AuthContext)

  useEffect(() => {
    if (authState.isLoggedIn) {
      router.replace('/jobs')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isLoggedIn])


  // TODO: Add validation
  // TODO: Add error handling

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
            <form onSubmit={handleSubmit(signUp)}>
              <FormControl id="name">
                <FormLabel>Full Name</FormLabel>
                <Input 
                  type="text"
                  mb="4"
                  placeholder="John Doe"
                  {...register('name',{
                    required: true
                  
                  })}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input 
                  type="email"
                  mb="4"
                  placeholder="johndoe@email.com"
                  {...register('email',{
                    required: true
                  
                  })}
                />
              </FormControl>
              <FormControl id="linkedin">
                <FormLabel>LinkedIn</FormLabel>
                <Input 
                  type="url"
                  mb="4"
                  placeholder="https://linkedin.com/in/username"
                  {...register('linkedin',{
                    required: true
                  
                  })}
                />
              </FormControl>
              <FormControl id="resume">
                <FormLabel>Resume</FormLabel>
                <Input 
                  type="file" 
                  py="1"
                  mb="4"
                  {...register('resume', {
                    required: true
                  
                  } )}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  type="submit"
                  mt={4}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign Up
                </Button>
              </Stack>
            </form>
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