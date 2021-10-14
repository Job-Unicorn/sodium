/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { IPFS_INFURA_AUTH_TOKEN } from '@/config/ceramic.config'


export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.send(IPFS_INFURA_AUTH_TOKEN)
}