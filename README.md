# Tenderly

This document aims to provide an overview of Tenderly platform features,
its limitations, and its usage, particularly in the context of working
with the Hedera network. Tenderly does not support networks that are
not integrated within its ecosystem, so all examples are based on the
networks that are already included.

## What is the Tenderly:

Tenderly is Full-Stack Web3 platform, designed to improve
upon development, on-chain deployment, debugging process, while simultaneously
providing multi-chain node RPC, integrated development environments and
any necessary infrastructure.

## Main Features:
### 1. Virtual TestNets/DevNets:
Simulated blockchain networks, designed to replicate real networks.
#### Usages:
- Local node replacement - code, test, and debug all components of dapps: smart contracts, dapp UI, backend, and indexing/data layer.
- Continuous integration infrastructure - allowing frequent integration of all dapp components and running automated tests.
- Staging infrastructure - that serves for purposes of manual testing, demoing, community testing, and contract auditing.
- Collaborative development infrastructure - allowing to develop dapps in iterations with minimal interference.
### Prerequisites:
#### 1. Hardhat or Foundry (hardhat is easier to configure whereas foundry is modern and gives more flexibility)
#### 2. Metamask client
#### 3. Setup Tenderly account:
- Create account on the Tenderly Platform
- Create Virtual TestNet with the network of your choice (recommended is custom chain ID)
- Add the network to the wallet
- Use Faucet in main menu to get some funds
#### 4. Setup of Tenderly Project (for the hardhat):
- create and get to project directory
- `npm init -y` - initialize node project
- `npm install --save-dev hardhat` - install hardhat dependency (make sure that hardhat is of version <= 2.22.0 - scripts directory should be present)
- `npx hardhat init` - initialize hardhat project
- `npm install --save-dev @tenderly/hardhat-tenderly` - install tenderly dependency
- Add this lines on the beginning of the `hardhat.cofig.ts` file
```Typescript
import * as tdly from "@tenderly/hardhat-tenderly";
tdly.setup();
```
also copy and paste `HardhatUserConfig` from Tenderly platform main menu: Integrate
- Login using tenderly CLI: `tenderly login`, generate Authorization Token in the Tenderly platform and paste it when prompted
- You may now use `npx hardhat run scripts/deploy.ts --network <your-network>` to deploy contract on <your-network> testNet, it will be visible
  under Contracts -> Virtual Contracts
### 2. Web3 Actions:
Automated serverless backend for the dapps - serve as programmable hooks for relevant on/off chain events.
#### Usages:
- active monitoring and automate code responses to specific events
- combined with alerts, enable to create alert-response patterns for relevant on-chain changes
- allow to connect smart-contracts with off chain infrastructure: APIs, frontends and other services
- may improve UX by gathering and sharing important information through notifications
#### Web3 Action Setup:
By documentation there are two main setup routes:
1. **Tenderly Portal**: In the Project menu go to the Web3 Actions and follow up the steps: you select trigger type,
   javascript/typescript method that will be executed during the action, trigger, additional info like name and description
   for the action, lastly you select one of the networks on which action will be executed and execution type: sequential or
   parallel, sequential action trigger is done if order of triggering should be preserved or if there are bandwidth limitations
2. **CLI**:
- initialize the action: `tenderly actions init` (select your project when prompted)
- you may modify `example.ts` in `/actions` directory, this will be logic that will be triggered upon action trigger
- 'tenderly.yaml' file specifies in what conditions action will be triggered:
```yaml
account_id: ''
project_slug: ''
actions:
  username/project-slug:
    runtime: v1
    sources: actions
    specs:
      block-number-printer:
        description: Example Web3 Action that logs block number once it is mined.
        function: example:blockHelloWorldFn
        trigger:
          type: block
          block:
            network:
              - 1
            blocks: 10
```
under project_slug you write down name of the project, under account_id, your account name
- deploy action with: `tenderly actions deploy
### 3. Alerts:
Alerts listen for events on the blockchain and sends real-time notifictations to desired destination when event occurs.
#### Types of triggers:
- Successful Transaction - Notifies you when a successful transaction happens.
- Failed Transaction - Send a notification when a transition fails.
- Function Call - Fires when a specific function is called from a contract.
- Event Emitted - Triggers when a specific event is emitted from a contract.
- Event Parameter - Alerts you when an event parameter has a particular value. You can use this Alert trigger to monitor when a particular address is approved to transfer tokens on behalf of the owner.
- ERC20 Token Transfer - Triggers when an ERC20 transfer event is emitted from a contract, allowing you to track when you or someone moves tokens.
- Allowlisted Callers - Notifies you whenever an address from this list calls your contracts.
- Blocklisted Callers - Notifies you when an address that is not on this list calls your smart contract.
- Balance Change - Triggers when the network's native currency balance of an address matches conditions.
- Transaction Value - Notifies you when a transaction value matches set conditions. This alert is useful in situations when a transaction with more than a certain amount of ETH calls a contract.
- State Change - Fires when a state variable in a contract changes.
- View Function - Alerts you when a view function's return value matches certain criteria, passes a threshold, or changes by a certain percentage.
#### Types of targets:
Define addresses that may trigger the alarm
- Address - only this address can trigger the alarm
- Network - all addresses deployed on the network may trigger the alarm
- Project - every address in the Tenderly project may trigger the alarm
- Tag - every address with the selected tag may trigger the alarm
#### Alert Setup:
Alerts are possible to set up only from the Tenderly platform menu, and can be accessed under Monitoring - Alerts in main project menu, setting up alert involves following steps:
- Set the [trigger type](#types-of-triggers)
- Choose target
- Chose parameters: they depend on the target and trigger type
- Destination: What will be the outcome of the alert, you may select more than one destination
    - email
    - slack
    - telegram
    - discord
    - tenderly web3 action (note: possible to set up from the web3 action sub menu)
    - webhook
### 4. Gas profiler:
Provides insight into smart contract methods gas usage
- granular gas usage breakdown and analyze how each function call spends gas.
- identifies gas-intensive lines of code.
#### How to use:
- add contract to the watched contracts, or transaction to watched transactions
- select transaction of interest
- from the transaction view you may select "Gas Profiler" from the menu on the upper part of main display.
- from the Gas Profiler menu you may choose to see any section of smart-contract stack trace, see the code in the debugger, how much
  gas was used on particular function call and also re-simulate the transaction (with changes to the source code)

### Drawbacks, issues:
- chain id during TestNet creation: default one doesn't work
- there is no information how to setup alerts with web3 actions
- Alerts: Allowlist Callers and Blocklisted Callers have swapped alert description
- Gas profiler: there is a note that code may be optimized but there is no description how to do it (how to modify contract from the gas profiler or debugger sub menu) in the documentation.