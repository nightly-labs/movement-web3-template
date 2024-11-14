import { Network } from "@aptos-labs/ts-sdk";
import { AptosChangeNetworkInput } from "@aptos-labs/wallet-standard";

export const networkMap: Record<number, AptosChangeNetworkInput> = {
  1: {
    chainId: 1,
    name: Network.MAINNET,
    url: "https://fullnode.mainnet.aptoslabs.com/v1",
  },
  2: {
    chainId: 2,
    name: Network.TESTNET,
    url: "https://fullnode.testnet.aptoslabs.com/v1",
  },
  158: {
    chainId: 158,
    name: Network.DEVNET,
    url: "https://fullnode.devnet.aptoslabs.com/v1",
  },
  27: {
    chainId: 27,
    name: Network.CUSTOM,
    url: "https://aptos.testnet.suzuka.movementlabs.xyz/v1",
  },
  177: {
    chainId: 177,
    name: Network.CUSTOM,
    url: "https://aptos.testnet.porto.movementlabs.xyz/v1",
  },
  250: {
    chainId: 250,
    name: Network.CUSTOM,
    url: "https://aptos.testnet.bardock.movementlabs.xyz/v1",
  },
};

export const MOVEMENT_NETWORK = "Movement";
