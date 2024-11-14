/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { getAdapter } from "../misc/adapter";
import ActionStarryButton from "./ActionStarryButton";
import StarryButton from "./StarryButton";
import {
  AccountInfo,
  NetworkInfo,
  UserResponseStatus,
} from "@aptos-labs/wallet-standard";
import { getMovement } from "../misc/movement";
import { Network } from "@aptos-labs/ts-sdk";
import { networkMap } from "../misc/utils";
import { NightlyConnectAptosAdapter } from "@nightlylabs/wallet-selector-aptos";
import ChangeNetworkButton from "./ChangeNetworkButton";

const MOVEMENT_CHAIN_IDS = [27, 177, 250];
const APTOS_CHAIN_IDS = [1, 2, 157];
const REQUESTED_NETWORK = networkMap[27];

const StickyHeader: React.FC = () => {
  const [userAccount, setUserAccount] = React.useState<AccountInfo>();

  const changeNetworkBeforeAction = useCallback(
    async (network: NetworkInfo, adapter: NightlyConnectAptosAdapter) => {
      if (!MOVEMENT_CHAIN_IDS.includes(network.chainId)) {
        const changeNetworkResponse = await adapter.changeNetwork(
          REQUESTED_NETWORK
        );
        if (
          changeNetworkResponse &&
          changeNetworkResponse.status === UserResponseStatus.APPROVED
        ) {
          toast.success("Network changed!");
        } else {
          toast.error("User rejected network change");
          throw new Error("Couldn't change network");
        }
      }
    },
    []
  );

  useEffect(() => {
    const init = async () => {
      const adapter = await getAdapter();
      if (await adapter.canEagerConnect()) {
        try {
          const response = await adapter.connect();
          if (response.status === UserResponseStatus.APPROVED) {
            setUserAccount(response.args);
            const network = await adapter.network();
          }
        } catch (error) {
          await adapter.disconnect().catch(() => {});
          console.log(error);
        }
      }
      // Events
      adapter.on("connect", (accInfo) => {
        if (accInfo && "address" in accInfo) {
          setUserAccount(accInfo);
        }
      });

      adapter.on("disconnect", () => {
        setUserAccount(undefined);
        console.log("adapter disconnected");
      });

      adapter.on("accountChange", (accInfo) => {
        if (accInfo && "address" in accInfo) {
          setUserAccount(accInfo);
        }
      });
    };
    init();
    // Try eagerly connect
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-opacity-50  p-6 z-10">
      <div className="flex items-center justify-between">
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
        <div className="flex flex-col space-y-4">
          <StarryButton
            connected={userAccount?.address !== undefined}
            onConnect={async () => {
              const adapter = await getAdapter();
              try {
                const response = await adapter.connect(
                  undefined,
                  REQUESTED_NETWORK
                );
                if (response.status === UserResponseStatus.APPROVED) {
                  setUserAccount(response.args);
                  const network = await adapter.network();

                  toast.success("Wallet connected!");
                } else {
                  toast.error("User rejected connection");
                  return;
                }
              } catch (error) {
                toast.error("Wallet connection failed!");
                // If error, disconnect ignore error
                await adapter.disconnect().catch(() => {});
                return;
              }
              try {
                // Check chainId
                const chainId = await adapter.network();
                await changeNetworkBeforeAction(chainId, adapter);
              } catch (error) {
                console.log(error);
              }
            }}
            onDisconnect={async () => {
              try {
                console.log("start");
                const adapter = await getAdapter();
                console.log(adapter);
                await adapter.disconnect();
                console.log("done");
                setUserAccount(undefined);
              } catch (error) {
                console.log(error);
              }
            }}
            publicKey={userAccount?.address.toString()}
          />
          {userAccount?.address && (
            <>
              <ActionStarryButton
                onClick={async () => {
                  const signingToast = toast.info("Signing Transaction...");
                  const adapter = await getAdapter();
                  try {
                    // we have to change the network to movement if we are on aptos
                    let network = await adapter.network();
                    // we have to do it here because the flow on mobile is different
                    await changeNetworkBeforeAction(network, adapter);
                    network = await adapter.network();
                    const aptos = getMovement(network.chainId);
                    const transaction = await aptos.transaction.build.simple({
                      sender: userAccount!.address.toString(),
                      data: {
                        function: "0x1::coin::transfer",
                        typeArguments: ["0x1::aptos_coin::AptosCoin"],
                        functionArguments: [
                          "0xd61ba4b804e961f81e362968f1daf580889346b7cfff0e06f0e0106094b60b5d",
                          1_000_000,
                        ],
                      },
                    });
                    const signedTx = await adapter.signAndSubmitTransaction(
                      transaction
                    );

                    toast.dismiss(signingToast);

                    if (signedTx.status !== UserResponseStatus.APPROVED) {
                      throw new Error("Transaction rejected");
                    }
                    toast.success("Transaction signed and submitted!", {
                      action: {
                        label: "View on Explorer",
                        onClick: () => {
                          window.open(
                            `https://explorer.movementlabs.xyz/txn/${signedTx.args.hash}?network=testnet`,
                            "_blank"
                          );
                        },
                      },
                    });
                  } catch (error) {
                    toast.error("Transaction rejected");
                    toast.dismiss(signingToast);
                    return;
                  }
                }}
                name="Sign and Submit"
              ></ActionStarryButton>
              {/* <ActionStarryButton
                onClick={async () => {
                  const signTransaction = async () => {
                    const adapter = await getAdapter();
                    const network = await adapter.network();

                    const aptos = getMovement(network.chainId);

                    const transaction = await aptos.transaction.build.simple({
                      sender: userAccount!.address.toString(),
                      data: {
                        function: "0x1::coin::transfer",
                        typeArguments: ["0x1::aptos_coin::AptosCoin"],
                        functionArguments: [
                          "0x99881b6cdf90c9edb04e6b5912c236630b55587161dedc1fc05d53f72eec07e8",
                          100,
                        ],
                      },
                    });
                    const signedTx = await adapter.signTransaction(transaction);
                    if (signedTx.status !== UserResponseStatus.APPROVED) {
                      throw new Error("Transaction rejected");
                    }
                  };
                  toast.promise(signTransaction, {
                    loading: "Signing Transaction...",
                    success: (_) => {
                      return `Transaction signed!`;
                    },
                    error: "Operation has been rejected!",
                  });
                }}
                name="Sign Transaction"
              ></ActionStarryButton> */}

              <ActionStarryButton
                onClick={async () => {
                  const signMessage = async () => {
                    const adapter = await getAdapter();
                    let network = await adapter.network();
                    await changeNetworkBeforeAction(network, adapter);
                    await adapter.signMessage({
                      message: "I love Nightly",
                      address: true,
                      nonce: "YOLO",
                    });
                  };
                  toast.promise(signMessage, {
                    loading: "Signing message...",
                    success: (_) => {
                      return `Message signed!`;
                    },
                    error: "Operation has been rejected!",
                  });
                }}
                name="Sign Message"
              ></ActionStarryButton>

              <ChangeNetworkButton
                onClick={async (chainId: number) => {
                  try {
                    const adapter = await getAdapter();
                    const network = await adapter.network();

                    if (network.chainId === chainId) {
                      return;
                    }

                    const changeNetworkResponse = await adapter.changeNetwork(
                      networkMap[chainId]
                    );

                    if (
                      changeNetworkResponse &&
                      changeNetworkResponse.status ===
                        UserResponseStatus.APPROVED
                    ) {
                      const changedNetwork = await adapter.network();
                      toast.success(
                        `Changed network to ${changedNetwork.name}!`
                      );
                    }
                  } catch (error) {
                    toast.error("Couldn't change network");
                    console.log(error);
                  }
                }}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
