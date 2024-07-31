// Integration Instructions: https://docs.tenderly.co/node/integrations-smart-contract-frameworks/hardhat
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as tenderly from "@tenderly/hardhat-tenderly";
import * as dotenv from 'dotenv';

dotenv.config();
tenderly.setup({ automaticVerifications: true });

export const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "tenderly",
  networks: {
    tenderly: {
      url: "https://polygon-amoy.gateway.tenderly.co/3WXw9y4A9DeGB3xGeSadsM",
      chainId: 80002,
    },
  },
  tenderly: {
    username: "nabialek-ariane",
    project: "tenderly-ariane",
  },
};
