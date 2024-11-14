import React, { useState } from "react";
import "./StarryButton.css";
import { AptosChangeNetworkInput } from "@aptos-labs/wallet-standard";
import { networkMap } from "../misc/utils";
export interface ChangeNetworkButtonProps {
  onClick: (chainId: number) => Promise<void>;
}

interface INetwork {
  name: string;
  chainId: number;
  url: string;
}

const NETWORKS: INetwork[] = [
  {
    chainId: 1,
    name: "Aptos Mainnet",
    url: "https://fullnode.mainnet.aptoslabs.com/v1",
  },
  {
    chainId: 2,
    name: "Aptos Testnet",
    url: "https://fullnode.testnet.aptoslabs.com/v1",
  },
  {
    chainId: 158,
    name: "Aptos Devnet",
    url: "https://fullnode.devnet.aptoslabs.com/v1",
  },
  {
    chainId: 27,
    name: "Suzuka Testnet",
    url: "https://aptos.testnet.suzuka.movementlabs.xyz/v1",
  },
  {
    chainId: 177,
    name: "Porto Testnet",
    url: "https://aptos.testnet.porto.movementlabs.xyz/v1",
  },
  {
    chainId: 250,
    name: "Bardock Testnet",
    url: "https://aptos.testnet.bardock.movementlabs.xyz/v1",
  },
];

const ChangeNetworkButton: React.FC<ChangeNetworkButtonProps> = ({
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSelector = () => setIsOpen(!isOpen);
  const handleNetworkSelect = (network: INetwork) => {
    setIsOpen(false);
    onClick(network.chainId);
  };
  return (
    <>
      <div className="relative">
        <button
          onClick={toggleSelector}
          className="relative overflow-hidden bg-black text-white w-[180px] h-[50px] rounded-lg glow-effect hover:scale-105 transition-transform duration-250 flex items-center justify-center"
        >
          <span className="z-10 flex items-center">
            Change network
            <span className="ml-2 inline-block w-4 h-4">
              {isOpen ? (
                <svg
                  className="w-full h-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-full h-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </span>
          </span>
          <div className="absolute inset-0 bg-black stars-bg animate-move-stars z-0"></div>
        </button>

        {isOpen && (
          <div className="absolute mt-1 w-[180px] bg-black border border-gray-700 rounded-lg shadow-lg z-20">
            {NETWORKS.map((network) => (
              <div
                key={network.name}
                className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-white relative z-10"
                onClick={() => handleNetworkSelect(network)}
              >
                {network.name}
              </div>
            ))}
            <div className="absolute inset-0 bg-black stars-bg animate-move-stars z-0"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChangeNetworkButton;
