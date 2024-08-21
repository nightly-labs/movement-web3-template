import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

let _provider: Aptos | undefined;
let _prevChainId: number | undefined;
const movementEndpoint = "https://aptos.testnet.suzuka.movementlabs.xyz/v1";
const aptosEndpoint = "https://fullnode.mainnet.aptoslabs.com/v1";
export const getMovement = (chainId: number) => {
  if (_provider && chainId === _prevChainId) return _provider;
  const conf = new AptosConfig({
    network: chainId === 1 ? Network.MAINNET : undefined,
    fullnode: chainId === 1 ? aptosEndpoint : movementEndpoint,
  });
  _prevChainId = chainId;
  _provider = new Aptos(conf);
  return _provider;
};
getMovement(27);
