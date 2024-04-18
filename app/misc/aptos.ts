import { Aptos, AptosConfig, AptosSettings } from '@aptos-labs/ts-sdk'

let _provider: Aptos | undefined
const endpoint = 'https://aptos.devnet.m1.movementlabs.xyz'
export const getAptos = () => {
  if (_provider) return _provider
  const conf = new AptosConfig({
    fullnode: endpoint,
    faucet: 'https://faucet.movementlabs.xyz',
  })
  _provider = new Aptos(conf) // DEVNET
  const a = async () => {
    console.log('faucet')
    const acc = await getAptos().account.getAccountResources({
      accountAddress: '0x975c0bad4ee36fcb48fe447647834b9c09ef44349ff593e90dd816dc5a3eccdc',
    })
    console.log(acc)
    const resp = await getAptos().faucet.fundAccount({
      accountAddress: '0x975c0bad4ee36fcb48fe447647834b9c09ef44349ff593e90dd816dc5a3eccdc',
      amount: 10000,
    })
    console.log(resp)
  }
  a()

  return _provider
}
getAptos()
