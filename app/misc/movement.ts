import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { NETWORK_MAP } from "./utils";

let _provider: Aptos | undefined;
let _prevChainId: number | undefined;
export const getMovement = (chainId: number) => {
  if (_provider && chainId === _prevChainId) return _provider;
  const conf = new AptosConfig({
    network: NETWORK_MAP[chainId].name,
    fullnode: NETWORK_MAP[chainId].url,
  });
  _prevChainId = chainId;
  _provider = new Aptos(conf);
  return _provider;
};
getMovement(27);
