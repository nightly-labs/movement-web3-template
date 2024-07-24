import { NightlyConnectAptosAdapter } from "@nightlylabs/wallet-selector-aptos";

let _adapter: NightlyConnectAptosAdapter | undefined;
export const getAdapter = async (persisted = true) => {
  if (_adapter) return _adapter;
  _adapter = await NightlyConnectAptosAdapter.build(
    {
      appMetadata: {
        name: "Movement Template",
        description: "Movement Template",
        icon: "https://docs.nightly.app/img/logo.png",
      },
    },
    {},
    undefined,
    {
      networkDataOverride: {
        name: "Movement",
        icon: "https://registry.nightly.app/networks/movement.svg",
      },
    }
  );
  return _adapter;
};
