import { client, getRecord } from './identity.utils'
import { WALLET_NOT_FOUND } from '../errors/auth.errors'

/**
 * 
 * **Login using IDX and ethereum wallet**
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
 * Removes the authentication from local storage
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