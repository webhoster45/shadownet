# ShadowNet Deployment Guide

## Prerequisites

1. **Node.js** 18+ installed
2. **Starknet wallet** with testnet funds (ETH on Alpha Goerli)
   - Use [Starknet Faucet](https://faucet.goerli.starknet.io/) to get testnet ETH
3. **Private key and account address** from your wallet

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the contract:
```bash
scarb build
```

3. Set environment variables:
```bash
export STARKNET_PRIVATE_KEY="0x..." # Your wallet private key
export STARKNET_ACCOUNT_ADDRESS="0x..." # Your wallet address
```

## Deploy

Run:
```bash
node deploy.js
```

The script will:
- Connect to Starknet Alpha Goerli testnet
- Deploy the ShadowNet contract
- Print the contract address and transaction hash
- Wait for transaction confirmation

## Output Example

```
Connecting to Starknet testnet...
Loading compiled contract...
Deploying ShadowNet contract...

✓ Deployment successful!
Contract Address: 0x...
Transaction Hash: 0x...

Waiting for transaction confirmation...
✓ Transaction confirmed on-chain

Deployment Details:
Network: Starknet Alpha Goerli Testnet
Contract: ShadowNet
Address: 0x...
Tx Hash: 0x...
```

## Verify Deployment

Check the deployed contract on [Voyager Testnet Explorer](https://testnet.starkscan.co/).
