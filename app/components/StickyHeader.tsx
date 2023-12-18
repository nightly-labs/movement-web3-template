/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { toast } from 'sonner'
import { getAdapter } from '../misc/adapter'
import ActionStarryButton from './ActionStarryButton'
import StarryButton from './StarryButton'
import { SignMessagePayload } from '@aptos-labs/wallet-adapter-core'

const StickyHeader: React.FC = () => {
  const [address, setAddress] = React.useState<string | undefined>()
  useEffect(() => {
    const init = async () => {
      const adapter = await getAdapter()
      if (await adapter.canEagerConnect()) {
        try {
          const accountInfo = await adapter.connect()
          setAddress(accountInfo.address.toString())
        } catch (error) {
          await adapter.disconnect().then(() => {})
          console.log(error)
        }
      }
    }
    init()
    // Try eagerly connect
  }, [])
  return (
    <header className='fixed top-0 left-0 w-full bg-opacity-50  p-6 z-10'>
      <div className='flex items-center justify-between'>
        <div>
          {/* <Image
            style={{ width: '200px', cursor: 'pointer' }}
            src={NightlyLogo}
            alt='logo'
            onClick={() => {
              // redirect to nightly.app
              window.location.href = 'https://nightly.app'
            }}
          /> */}
        </div>
        <div className='flex flex-col space-y-4'>
          <StarryButton
            connected={address !== undefined}
            onConnect={async () => {
              const adapter = await getAdapter()
              try {
                const accountInfo = await adapter.connect()
                setAddress(accountInfo.address.toString())
              } catch (error) {
                await adapter
                  .disconnect()
                  .then(() => {})
                  .catch(() => {})
                console.log(error)
              }
            }}
            onDisconnect={async () => {
              try {
                const adapter = await getAdapter()
                await adapter.disconnect()
                setAddress(undefined)
              } catch (error) {
                console.log(error)
              }
            }}
            publicKey={address}
          />
          {address && (
            <>
              <ActionStarryButton
                onClick={async () => {
                  const signTransaction = async () => {
                    const adapter = await getAdapter()
                    const tx = {
                      type: 'entry_function_payload',
                      arguments: [
                        '0x98e3d3223dfb548f0ca5b07e65ecb4d809430c035c27906436e394b5624dc2a7',
                        1000,
                      ],
                      function: '0x1::coin::transfer',
                      type_arguments: ['0x1::aptos_coin::AptosCoin'],
                    }
                    const signedTx = await adapter.signAndSubmitTransaction!(tx)
                    toast.success('Transaction send!', {
                      action: {
                        label: 'Show Transaction',
                        onClick: () => {
                          // Open url in a new tab
                          window.open(
                            `https://explorer.aptoslabs.com/txn/${signedTx.hash}/?network=devnet`,
                            '_blank'
                          )
                        },
                      },
                    })
                  }
                  toast.promise(signTransaction, {
                    loading: 'Signing Transaction...',
                    success: (_) => {
                      return `Transaction signed!`
                    },
                    error: 'Operation has been rejected!',
                  })
                }}
                name='Sign Transaction'
              ></ActionStarryButton>
              <ActionStarryButton
                onClick={async () => {
                  const signMessage = async () => {
                    const adapter = await getAdapter()
                    const msgToSign: SignMessagePayload = {
                      message: 'I love Nightly',
                      nonce: '1234',
                      address: true,
                    }
                    const signed = await adapter.signMessage(msgToSign)
                  }
                  toast.promise(signMessage, {
                    loading: 'Signing message...',
                    success: (_) => {
                      return `Message signed!`
                    },
                    error: 'Operation has been rejected!',
                  })
                }}
                name='Sign Message'
              ></ActionStarryButton>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default StickyHeader
