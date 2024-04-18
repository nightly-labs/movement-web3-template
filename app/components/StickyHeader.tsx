/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { toast } from 'sonner'
import { getAdapter } from '../misc/adapter'
import ActionStarryButton from './ActionStarryButton'
import StarryButton from './StarryButton'
import { AccountInfo, AptosSignMessageInput, UserResponseStatus } from '@aptos-labs/wallet-standard'
import { getAptos } from '../misc/aptos'

const StickyHeader: React.FC = () => {
  const [userAccount, setUserAccount] = React.useState<AccountInfo | undefined>()
  useEffect(() => {
    const init = async () => {
      const adapter = await getAdapter()
      if (await adapter.canEagerConnect()) {
        try {
          const response = await adapter.connect()
          if (response.status === UserResponseStatus.APPROVED) {
            setUserAccount(response.args)
          }
        } catch (error) {
          await adapter.disconnect().catch(() => {})
          console.log(error)
        }
      }
      // Events
      adapter.on('connect', (accInfo) => {
        setUserAccount(accInfo)
      })

      adapter.on('disconnect', () => {
        setUserAccount(undefined)
        console.log('adapter disconnected')
      })

      adapter.on('accountChange', (accInfo) => {
        setUserAccount(accInfo)
      })
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
            connected={userAccount?.address !== undefined}
            onConnect={async () => {
              const adapter = await getAdapter()
              try {
                const response = await adapter.connect()
                if (response.status === UserResponseStatus.APPROVED) {
                  setUserAccount(response.args)
                  toast.success('Wallet connected!')
                } else {
                  toast.error('User rejected connection')
                }
              } catch (error) {
                toast.error('Wallet connection failed!')
                // If error, disconnect ignore error
                await adapter.disconnect().catch(() => {})
              }
            }}
            onDisconnect={async () => {
              try {
                const adapter = await getAdapter()
                await adapter.disconnect()
                setUserAccount(undefined)
              } catch (error) {
                console.log(error)
              }
            }}
            publicKey={userAccount?.address.toString()}
          />
          {userAccount?.address && (
            <>
              <ActionStarryButton
                onClick={async () => {
                  const signTransaction = async () => {
                    const adapter = await getAdapter()
                    const aptos = getAptos()
                    const transaction = await aptos.transaction.build.simple({
                      sender: userAccount!.address.toString(),
                      data: {
                        function: '0x1::coin::transfer',
                        typeArguments: ['0x1::aptos_coin::AptosCoin'],
                        functionArguments: [
                          '0x7d6735f1d1b158ea340f252e0d30c4ab5596fc12bbf5267f43ac45989b9fd520',
                          100,
                        ],
                      },
                    })
                    const signedTx = await adapter.signAndSubmitTransaction({
                      rawTransaction: transaction.rawTransaction,
                    })
                    if (signedTx.status !== UserResponseStatus.APPROVED) {
                      throw new Error('Transaction rejected')
                    }
                  }
                  toast.promise(signTransaction, {
                    loading: 'Signing Transaction...',
                    success: (_) => {
                      return `Transaction signed!`
                    },
                    error: 'Operation has been rejected!',
                  })
                }}
                name='Sign and Submit'
              ></ActionStarryButton>
              <ActionStarryButton
                onClick={async () => {
                  const signTransaction = async () => {
                    const adapter = await getAdapter()
                    const aptos = getAptos()
                    const transaction = await aptos.transaction.build.simple({
                      sender: userAccount!.address.toString(),
                      data: {
                        function: '0x1::coin::transfer',
                        typeArguments: ['0x1::aptos_coin::AptosCoin'],
                        functionArguments: [
                          '0x7d6735f1d1b158ea340f252e0d30c4ab5596fc12bbf5267f43ac45989b9fd520',
                          100,
                        ],
                      },
                    })
                    const signedTx = await adapter.signTransaction({
                      rawTransaction: transaction.rawTransaction,
                    })
                    if (signedTx.status !== UserResponseStatus.APPROVED) {
                      throw new Error('Transaction rejected')
                    }
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
                    await adapter.signMessage({
                      message: 'I love Nightly',
                      address: true,
                      nonce: 'YOLO',
                    })
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
