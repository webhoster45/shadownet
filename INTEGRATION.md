# ShadowNet Contract Integration Guide

## Contract Details

**Contract Address (Starknet Sepolia Testnet):**
```
0x49e43ce869b6c4f9415b1d088a92acb048b87ede6370f9ddc9013604ea79ceb
```

**Network:** Starknet Sepolia Testnet

**Block Explorer:** https://sepolia.starkscan.co/contract/0x49e43ce869b6c4f9415b1d088a92acb048b87ede6370f9ddc9013604ea79ceb

## Contract ABI

See `contract-abi.json` for the complete ABI.

## Available Functions

### 1. Create Vault
```javascript
create_vault(vault_id: felt252, commitment: felt252) -> ()
```
Creates a new vault with a commitment.

**Parameters:**
- `vault_id` - Unique identifier for the vault
- `commitment` - Commitment value to store

**Example:**
```javascript
const response = await account.execute({
  contractAddress: "0x49e43ce869b6c4f9415b1d088a92acb048b87ede6370f9ddc9013604ea79ceb",
  entrypoint: "create_vault",
  calldata: ["1", "12345"],
});
```

### 2. Get Vault
```javascript
get_vault(vault_id: felt252) -> (vault_id: felt252, commitment: felt252)
```
Reads vault data. This is a view function (read-only, no gas cost).

**Parameters:**
- `vault_id` - ID of the vault to retrieve

**Example:**
```javascript
const result = await provider.callContract({
  contractAddress: "0x49e43ce869b6c4f9415b1d088a92acb048b87ede6370f9ddc9013604ea79ceb",
  entrypoint: "get_vault",
  calldata: ["1"],
});
```

## Installation

```bash
npm install starknet
```

## Usage Example

```javascript
import { Account, RpcProvider } from "starknet";

const CONTRACT_ADDRESS = "0x49e43ce869b6c4f9415b1d088a92acb048b87ede6370f9ddc9013604ea79ceb";
const RPC_URL = "https://starknet-sepolia.g.alchemy.com/v2/YOUR_API_KEY";

const provider = new RpcProvider({ nodeUrl: RPC_URL });
const account = new Account({
  address: userAccountAddress,
  provider: provider,
  signer: userPrivateKey, // or use web3 wallet
});

// Create vault
const createTx = await account.execute({
  contractAddress: CONTRACT_ADDRESS,
  entrypoint: "create_vault",
  calldata: ["1", "12345"],
});

// Read vault
const vaultData = await provider.callContract({
  contractAddress: CONTRACT_ADDRESS,
  entrypoint: "get_vault",
  calldata: ["1"],
});
```

## Testing

See `test-contract.js` for a working example.

Run tests:
```bash
STARKNET_ACCOUNT_ADDRESS="0x..." \
STARKNET_PRIVATE_KEY="0x..." \
node test-contract.js
```

## Resources

- [Starknet.js Documentation](https://www.starknetjs.com/)
- [Cairo Documentation](https://docs.starkware.co/starknet-docs)
- [Starknet Sepolia Testnet](https://sepolia.starkscan.co/)
