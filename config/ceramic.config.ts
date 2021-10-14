/**
 * 
 * **Ceramic Endpoint**
 * 
 * This is the endpoint that Ceramic will
 * use to communicate with your application.
 * 
 */

export const CERAMIC_ENDPOINT = 'https://ceramic-clay.3boxlabs.com'

/**
 * **Infura IPFS Endpoint**
 * 
 * For more information visit:
 * - https://ipfs.io/
 * - https://infura.io/docs/ipfs/
 * 
 */

export const IPFS_INFURA_ENDPOINT = process.env.IPFS_INFURA_ENDPOINT

/**
 * 
 * **IPFS Infura Project Id**
 * 
 */

export const IPFS_INFURA_ID = process.env.IPFS_INFURA_ID 

/**
 * 
 * **IPFS Infura Project Secret Key**
 * 
 */

export const IPFS_INFURA_SECRET  = process.env.IPFS_INFURA_SECRET  

/**
 * 
 * **IPFS Infura Project Bearer Auth Token**
 * 
 */

export const IPFS_INFURA_AUTH_TOKEN = 'Basic ' + Buffer.from(IPFS_INFURA_ID + ':' + IPFS_INFURA_SECRET).toString('base64')