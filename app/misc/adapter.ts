import { NightlyConnectAptosAdapter as NCMovementAdapter } from '@nightlylabs/wallet-selector-aptos'

let _adapter: NCMovementAdapter | undefined
export const getAdapter = async (persisted = true) => {
  if (_adapter) return _adapter
  _adapter = await NCMovementAdapter.build(
    {
      appMetadata: {
        name: 'Movement Template',
        description: 'Movement Template',
        icon: 'https://docs.nightly.app/img/logo.png',
      },
    },
    persisted
  )
  return _adapter
}
