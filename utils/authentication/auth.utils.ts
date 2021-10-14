import ipfs from 'ipfs-http-client'
import { client, getRecord } from '@/utils/authentication/identity.utils'
import { WALLET_NOT_FOUND } from '@/utils/errors/auth.errors'
import axios from 'axios'
import { IPFS_INFURA_AUTH_TOKEN } from '@/config/ceramic.config'

/**
 * 
 * **Login using IDX and ethereum wallet**
 * 
 * - Connects to eth wallet like  metamask
 * - Gets user details from ceramic
 * - Saves user data in local storage
 * 
 * Potential errors:
 * - Wallet not found
 * 
 */

export const login = async () => {

  console.log('Logging in using IDX and ethereum wallet')

  if (window.ethereum) {
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    const ceramicClient = await client()
    const data = await (await getRecord()).record

    localStorage.setItem('authentication', JSON.stringify({ 
      isLoggedIn : true,
      name: data.name,
      accountId : ceramicClient.idx.id,
      data
    }))

    return {
      accountId : ceramicClient.idx.id,
      name : data.name
    }

  } else {
    throw new Error(WALLET_NOT_FOUND)
  }
  

}

/**
 * 
 * **Logout**
 * 
 * - Removes the authentication from local\
 * storage
 * - Reloads the page
 * 
 */

export const logout = async () => {

  localStorage.setItem('authentication', JSON.stringify({ 
    isLoggedIn : false,
    name : null,
    accountId : null,
    data : null 
  }))

  window.location.reload()

}

/**
 * 
 * **Creates the account for new users**
 * 
 * - It takes the name, email, linkedin url\
 * and the resume as a FileList
 * - Upload the resume to IPFS
 * - Sets them in the ceramic schema
 * 
 */

export const signUp = async (
  data : {
    name : string,
    email: string,
    linkedin : string ,
    resume : FileList
  }
) => {

  try {


    /**
     *  Get the ipfs auth token from the api
     */
    const ipfsAuthToken = (await axios.get('/api/get-ipfs-token').then(res => res.data) as string)

    // ------------------------------------------------------------

    const ipfsClient = ipfs.create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: ipfsAuthToken
      }
    })

    const added = await ipfsClient.add(data.resume[0])
    const url = `https://ipfs.infura.io/ipfs/${added.path}`

    const dataToStore = {
      name : data.name,
      email : data.email,
      linkedin : data.linkedin,
      resume : url
    }

    console.log('dataToStore', dataToStore)

    // ------------------------------------------------------------

    return {
      message : 'success',
      error : null
    }

  } catch (error) {
    console.log('error', error)
    return {
      message : 'failure',
      error : error.message
    }
  }

}