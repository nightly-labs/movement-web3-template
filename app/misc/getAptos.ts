import { AptosClient } from 'aptos'

let _aptos: AptosClient | undefined
export const getAptos = () => {
  if (_aptos) return _aptos
  _aptos = new AptosClient('https://fullnode.devnet.aptoslabs.com')
  return _aptos
}
