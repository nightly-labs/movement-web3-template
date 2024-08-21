import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { networkMap } from "./utils";

let _provider: Aptos | undefined;
let _prevChainId: number | undefined;
export const getMovement = (chainId: number) => {
  if (_provider && chainId === _prevChainId) return _provider;
  const conf = new AptosConfig({
    network: networkMap[chainId].name,
    fullnode: networkMap[chainId].url,
  });
  _prevChainId = chainId;
  _provider = new Aptos(conf);
  return _provider;
};
getMovement(27);
