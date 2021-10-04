import { useColorModeValue, Box, Button, Divider, Flex, Heading, Image, Modal, ModalBody, ModalContent, ModalOverlay, Spacer, Tag, TagLabel, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { FaUserTie } from 'react-icons/fa'
import { IoIosDoneAll } from 'react-icons/io'
import { AiOutlineRise } from 'react-icons/ai'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { IJob } from '@/interfaces/Job'
import { AuthContext } from '@/store/contexts/AuthContext'
import { useRouter } from 'next/router'

const ApplyButton = ({jobId, companyId, ...rest }) => {

  const { authState } = React.useContext(AuthContext) 
  const router = useRouter()

  return (
    <Button 
      size="sm"
      w="fit-content"
      rounded="md"
      variant="outline" 
      colorScheme="blue" 
      borderRadius="none" 
      {...rest}
      onClick={() => {
        if (authState.isLoggedIn) {
          router.push(`/${authState.user.accountId.split(':')[2]}/chat/${companyId}/${jobId}`)
        } else {
          router.push('/sign-up')
        }
      }}
    >
      Apply
    </Button>
  )
}

const Job = ({job} : {job : IJob}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef()

  return (
    <Box borderColor={useColorModeValue('gray.300', 'whiteAlpha.300')} shadow="sm" borderWidth="thin" p="4" my="10" overflow="hidden" rounded="md">

      <Flex>

        <Image src={job.logo} alt="logo" objectFit="contain" w="10" />
        <Box ml="4">
          <Heading fontSize="2xl" >{job.company}</Heading>
          {/* company description */}
          <Text color={useColorModeValue('gray.600', 'whiteAlpha.600')} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, porro!</Text>
        </Box>
        <Spacer />
        {/* Modal Opener Button */}
        <Button onClick={onOpen} variant="ghost" _hover={{ backgroundColor: 'none' }} _active={{ backgroundColor: 'none'}}>
          <ChevronRightIcon w={6} h={6} />
        </Button>
      </Flex>
      {/* Company Employee Strength */}
      <Flex ml="14" mt="2" color={useColorModeValue('gray.500','whiteAlpha.500')} align="center">
        <FaUserTie /> <Text ml="2">Employee 1k-10k</Text>
      </Flex>
      {/* Labels of company */}
      <Flex ml="14" mt="2" color={useColorModeValue('gray.500','whiteAlpha.500')} align="center">
        <Tag size="sm" colorScheme="blue" borderRadius="full">
          <AiOutlineRise size="18px" />
          <TagLabel ml="1">High Growth</TagLabel>
        </Tag>
        <Tag size="sm" ml="3" colorScheme="green" borderRadius="full">
          <IoIosDoneAll size="20px" />
          <TagLabel>Verified</TagLabel>
        </Tag>
      </Flex>
      {/* Job Overview */}
      <Flex w="100%" mt="6" flexDir="column" p="6" borderWidth="thin" borderColor={useColorModeValue('gray.300','whiteAlpha.300')} rounded="md" >
        <Flex align="center">
          <Heading fontSize="lg" color={useColorModeValue('gray.700','whiteAlpha.800')}>{job.title}</Heading> <Spacer />
          <Text color="green.500" >{job.salary} Ethereum</Text>
          
          <ApplyButton  jobId={job.id} companyId={job.companyId} ml="6"/>

        </Flex>
      </Flex>

      {/* MODAL */}
      <Modal size="4xl" finalFocusRef={finalRef} scrollBehavior="inside" isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay />
        <ModalContent maxH="3xl" overflow="hidden" >
          {/* <ModalHeader></ModalHeader>
                    <ModalCloseButton /> */}
          <ModalBody p="6" bg={useColorModeValue('white', 'gray.800')} >
            <Flex>
              {/* Company logo in Modal */}
              <Image src={job.logo} alt="logo" objectFit="contain" w="10" />
              <Box ml="4">

                {/* Company Name in Modal */}
                <Heading fontSize="2xl" >{job.company}</Heading>
                {/* Company description in Modal */}
                <Text color={useColorModeValue('gray.600', 'whiteAlpha.600')} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, porro!</Text>
              </Box>
            </Flex>
            <Flex ml="14" mt="2" color={useColorModeValue('gray.500','whiteAlpha.500')} align="center">
              {/* Company employee strength in Modal */}
              <FaUserTie /> <Text ml="2">Employee 1k-10k</Text>
            </Flex>
            {/* Company Labels in Modal */}
            <Flex ml="14" mt="2" color={useColorModeValue('gray.500','whiteAlpha.500')} align="center">
              <Tag size="sm" colorScheme="blue" borderRadius="full">
                <AiOutlineRise size="18px" />
                <TagLabel ml="1">High Growth</TagLabel>
              </Tag>
              <Tag size="sm" ml="3" colorScheme="green" borderRadius="full">
                <IoIosDoneAll size="20px" />
                <TagLabel>Verified</TagLabel>
              </Tag>
            </Flex>
            <Flex w="100%" mt="6" flexDir="row" p="6" borderWidth="thin" borderColor={useColorModeValue('gray.300','whiteAlpha.300')} rounded="md" >

              {/* ------------------------------------------------------------------------------------------ */}

              <Flex w="60%" pr="6" flexDir="column">
                {/* Job Title in Modal */}
                <Heading fontSize="2xl" color={useColorModeValue('gray.700','whiteAlpha.800')} mb="2" >{job.title}</Heading>
                <Divider />
                {/* Job Description in Modal */}
                <Text mt="2" color={useColorModeValue('gray.500','whiteAlpha.600')} fontSize="sm">{job.description}</Text>

                <Spacer />

                <ApplyButton jobId={job.id} companyId={job.companyId} />
              </Flex>


              {/* ------------------------------------------------------------------------------------------ */}

              <Box w="40%" borderColor={useColorModeValue('gray.300','whiteAlpha.300')} borderWidth="thin" p="3" rounded="md" >

                <Box mb="3">
                  {/* Job type in Modal */}
                  <Text fontWeight="black" color={useColorModeValue('gray.700','whiteAlpha.800')} >Job Type</Text>
                  <Text>{job.type}</Text>
                </Box>
                <Box mb="3">
                  <Text fontWeight="black" color={useColorModeValue('gray.700','whiteAlpha.800')} mb="2" >Skills Required</Text>
                  {/* Job skills required / labels */}
                  < >

                    {job.skillsRequired.map((skill, index) => (
                      <Tag key={index}size="sm" mr="1" mb="2" px="2" py="1" colorScheme="blue" borderRadius="full">
                        <TagLabel>{skill}</TagLabel>
                      </Tag>
                    ))}
                    
                  </>
                </Box>
                <Box mb="3">
                  <Text fontWeight="black" >Experience</Text>
                  <Text>{job.experienceRequired}+ years</Text>
                </Box>


              </Box>


              {/* ------------------------------------------------------------------------------------------ */}

            </Flex>
           
          </ModalBody>

          {/* <ModalFooter></ModalFooter> */}
        </ModalContent>
      </Modal>

    </Box>
  )
}

export default Job
