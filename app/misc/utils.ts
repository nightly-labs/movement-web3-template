import { Network } from "@aptos-labs/ts-sdk";
import { AptosChangeNetworkInput } from "@aptos-labs/wallet-standard";

export interface INetwork extends AptosChangeNetworkInput {
  buttonName: string;
  uiQueue: number;
}

export const NETWORK_MAP: Record<string, INetwork> = {
  "1": {
    uiQueue: 1,
    chainId: 1,
    name: Network.MAINNET,
    buttonName: "Aptos Mainnet",
    url: "https://fullnode.mainnet.aptoslabs.com/v1",
  },
  "2": {
    uiQueue: 2,
    chainId: 2,
    name: Network.TESTNET,
    buttonName: "Aptos Testnet",
    url: "https://fullnode.testnet.aptoslabs.com/v1",
  },
  "158": {
    uiQueue: 3,
    chainId: 158,
    name: Network.DEVNET,
    buttonName: "Aptos Devnet",
    url: "https://fullnode.devnet.aptoslabs.com/v1",
  },
  "27": {
    uiQueue: 4,
    chainId: 27,
    name: Network.CUSTOM,
    buttonName: "Suzuka Testnet",
    url: "https://aptos.testnet.suzuka.movementlabs.xyz/v1",
  },
  "177": {
    uiQueue: 5,
    chainId: 177,
    name: Network.CUSTOM,
    buttonName: "Porto Testnet",
    url: "https://aptos.testnet.porto.movementlabs.xyz/v1",
  },
  "250": {
    uiQueue: 6,
    chainId: 250,
    name: Network.CUSTOM,
    buttonName: "Bardock Testnet",
    url: "https://aptos.testnet.bardock.movementlabs.xyz/v1",
  },
  "126": {
    uiQueue: 7,
    chainId: 126,
    name: Network.CUSTOM,
    buttonName: "Move Mainnet",
    url: "https://mainnet.movementnetwork.xyz/v1",
  },
  "254": {
    uiQueue: 8,
    chainId: 254,
    name: Network.CUSTOM,
    buttonName: "Cedra Devnet",
    url: "https://devnet.cedra.dev/v1",
  },
};

export const MOVEMENT_NETWORK = "Movement";
