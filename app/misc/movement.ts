import { Aptos, AptosConfig } from '@aptos-labs/ts-sdk'

let _provider: Aptos | undefined
const endpoint = 'https://aptos.testnet.suzuka.movementlabs.xyz/v1'
export const getMovement = () => {
  if (_provider) return _provider
  const conf = new AptosConfig({
    fullnode: endpoint,
  })
  _provider = new Aptos(conf)
  return _provider
}
getMovement()
