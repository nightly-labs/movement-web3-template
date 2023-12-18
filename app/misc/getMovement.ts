import { AptosClient as MovementClient } from 'aptos'

let _movement: MovementClient | undefined
export const getMovement = () => {
  if (_movement) return _movement
  _movement = new MovementClient('https://devnet.m1.movementlabs.xyz/v1/')
  return _movement
}
