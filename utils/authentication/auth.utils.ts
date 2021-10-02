import { client, getRecord } from './identity.utils'
import { WALLET_NOT_FOUND } from '../errors/auth.errors'

/**
 * ### Login using IDX and ethereum wallet
 */

export const login = async () => {

  console.log('Logging in using IDX and ethereum wallet')

  if (window.ethereum) {
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    const ceramicClient = await client()
    const data = await (await getRecord()).record

    console.log(data)

    return {
      accountId : ceramicClient.idx.id,
      name : data.name
    }
  } else {
    throw new Error(WALLET_NOT_FOUND)
  }
  

}


export const logout = async () => {

  console.log('Logged out using IDX and ethereum wallet')

}