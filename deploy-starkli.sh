#!/bin/bash

# Starkli Deployment Script for ShadowNet

set -e

. /home/codespace/.starkli/env

PRIVATE_KEY="${STARKNET_PRIVATE_KEY:?Error: STARKNET_PRIVATE_KEY not set}"
ACCOUNT_ADDRESS="${STARKNET_ACCOUNT_ADDRESS:?Error: STARKNET_ACCOUNT_ADDRESS not set}"
RPC_URL="${STARKNET_RPC_URL:-https://sepolia.starknet.io}"

echo "Starkli Deployment Script for ShadowNet"
echo "======================================="
echo "Account: $ACCOUNT_ADDRESS"
echo "Network: Starknet Sepolia"
echo "RPC: $RPC_URL"
echo ""

# Declare the contract
echo "Declaring contract class..."
DECLARE_RESULT=$(starkli declare target/dev/shadownet_ShadowNet.contract_class.json \
  --account-address "$ACCOUNT_ADDRESS" \
  --private-key "$PRIVATE_KEY" \
  --rpc "$RPC_URL" \
  2>&1)

CLASS_HASH=$(echo "$DECLARE_RESULT" | grep -oP 'Class hash: \K0x[a-fA-F0-9]+' || echo "")

if [ -z "$CLASS_HASH" ]; then
  echo "Declaration failed:"
  echo "$DECLARE_RESULT"
  exit 1
fi

echo "✓ Class declared: $CLASS_HASH"
echo ""

# Deploy the contract
echo "Deploying contract instance..."
DEPLOY_RESULT=$(starkli deploy "$CLASS_HASH" \
  --account-address "$ACCOUNT_ADDRESS" \
  --private-key "$PRIVATE_KEY" \
  --rpc "$RPC_URL" \
  2>&1)

CONTRACT_ADDRESS=$(echo "$DEPLOY_RESULT" | grep -oP 'Contract address: \K0x[a-fA-F0-9]+' || echo "")
TX_HASH=$(echo "$DEPLOY_RESULT" | grep -oP 'Transaction hash: \K0x[a-fA-F0-9]+' || echo "")

if [ -z "$CONTRACT_ADDRESS" ]; then
  echo "Deployment failed:"
  echo "$DEPLOY_RESULT"
  exit 1
fi

echo ""
echo "✓ Deployment successful!"
echo ""
echo "Deployment Details:"
echo "==================="
echo "Contract Address: $CONTRACT_ADDRESS"
echo "Transaction Hash: $TX_HASH"
echo "Network: Starknet Sepolia"
echo ""
echo "Verify on Starkscan: https://sepolia.starkscan.co/contract/$CONTRACT_ADDRESS"
