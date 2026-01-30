#!/bin/bash

set -e

PRIVATE_KEY="${STARKNET_PRIVATE_KEY:?Error: STARKNET_PRIVATE_KEY not set}"
ACCOUNT_ADDRESS="${STARKNET_ACCOUNT_ADDRESS:?Error: STARKNET_ACCOUNT_ADDRESS not set}"
RPC_URL="${STARKNET_RPC_URL:-https://starknet-sepolia.g.alchemy.com/v2/aSzNwLtr_R5h1CQLJhUuC}"

echo "Deploying ShadowNet Contract"
echo "============================"
echo "Account: $ACCOUNT_ADDRESS"
echo "RPC: $RPC_URL"
echo ""

echo "Step 1: Declaring contract class..."
CLASS_HASH=$(starkli declare ./target/dev/shadownet_ShadowNet.contract_class.json \
  --account-address "$ACCOUNT_ADDRESS" \
  --private-key "$PRIVATE_KEY" \
  --rpc "$RPC_URL" \
  --compiler-version 2.6.3 \
  2>&1 | grep -oP 'Class hash: \K0x[a-fA-F0-9]+' || true)

if [ -z "$CLASS_HASH" ]; then
  echo "❌ Declaration failed"
  exit 1
fi

echo "✓ Class declared: $CLASS_HASH"
echo ""

echo "Step 2: Deploying contract instance..."
CONTRACT_ADDRESS=$(starkli deploy "$CLASS_HASH" \
  --account-address "$ACCOUNT_ADDRESS" \
  --private-key "$PRIVATE_KEY" \
  --rpc "$RPC_URL" \
  2>&1 | grep -oP 'Contract address: \K0x[a-fA-F0-9]+' || true)

if [ -z "$CONTRACT_ADDRESS" ]; then
  echo "❌ Deployment failed"
  exit 1
fi

echo "✓ Contract deployed: $CONTRACT_ADDRESS"
echo ""

echo "=========================================="
echo "Deployment Successful!"
echo "=========================================="
echo "Contract Address: $CONTRACT_ADDRESS"
echo "Class Hash: $CLASS_HASH"
echo "Network: Starknet Sepolia Testnet"
