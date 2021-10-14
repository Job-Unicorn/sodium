import { EthereumAuthProvider, SelfID, WebClient } from '@self.id/web'
import CeramicClient from '@ceramicnetwork/http-client'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { IDX } from '@ceramicstudio/idx'
import { ThreeIdConnect } from '@3id/connect'
import { DID } from 'dids'
import { CERAMIC_ENDPOINT } from '@/config/ceramic.config'
import { BASIC_PROFILE_NOT_FOUND, WALLET_NOT_FOUND } from '../errors/auth.errors'

const ceramicProvider =  CeramicClient
const threeIdProvider = ThreeIdResolver

async function client({
  endpoint = CERAMIC_ENDPOINT,
  resolvers = null,
  address = '',
  provider = null,
  ceramicClient = null
} = {}) {
  let ceramic
  let ethereum = window.ethereum

  if (!ethereum) return {
    error: 'No ethereum wallet detected'
  }

  if (!ceramicClient) {
    ceramic = new ceramicProvider(endpoint)
  } else {
    ceramic = ceramicClient
  }

  if (!resolvers) {
    resolvers = {
      ...threeIdProvider.getResolver(ceramic)
    }
  } else {
    resolvers = resolvers.reduce((acc, next) => {
      if (next.requiresCeramic) {
        let resolver = next.resolver.call(this, ceramic)
        acc = {
          ...acc,
          ...resolver
        }
      } else {
        acc = {
          ...acc,
          ...next.resolver
        }
      }
      return acc
    }, {})
  }

  if (!address) {
    const addresses = await ethereum.request({ method: 'eth_requestAccounts' })
    address = addresses[0]
  }

  const threeIdConnect = new ThreeIdConnect()

  if (!provider) {
    provider = new EthereumAuthProvider(ethereum, address)
  }

  await threeIdConnect.connect(provider)

  const did = new DID({
    provider: threeIdConnect.getDidProvider(),
    resolver: resolvers
  })

  ceramic.setDID(did) 
  await ceramic.did.authenticate()
  const idx = new IDX({ ceramic })

  return {
    ceramic, did, idx, error: null
  }
}

const networks = {
  ethereum: 'ethereum',
  bitcoin: 'bitcoin',
  cosmos: 'cosmos',
  kusama: 'kusama'
}


async function getRecord({
  endpoint = CERAMIC_ENDPOINT,
  network = 'ethereum',
  schema = 'basicProfile'
} = {}) {
  let ethereum = window.ethereum
  let record

  if (!ethereum) return {
    error: WALLET_NOT_FOUND
  }

  if (network === networks.ethereum) {
    const addresses = await ethereum.request({ method: 'eth_requestAccounts' })
    const address = addresses[0]
    
    // ----------------------------------------------------------------------------------------

    const authProvider = new EthereumAuthProvider(ethereum, address)
    const client = new WebClient({ ceramic: endpoint, connectNetwork: 'testnet-clay' })
    const did = await client.authenticate(authProvider)
    const self = new SelfID({ client, did })

    const data = await self.get(schema)

    // ----------------------------------------------------------------------------------------

    record = data

    if (!record) {
      return {
        error: BASIC_PROFILE_NOT_FOUND
      }
    }

  }
  return {
    record, error: null
  }
}

export {
  getRecord,
  client
}