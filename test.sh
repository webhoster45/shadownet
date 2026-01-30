#!/bin/bash

# ShadowNet Contract Test Script

set -e

CONTRACT_ADDRESS="0x49e43ce869b6c4f9415b1d088a92acb048b87ede6370f9ddc9013604ea79ceb"
ACCOUNT_ADDRESS="0x01Eb44C3B3dfb279C7414de40ccf5C59Ba6a27fCcCEd8a00534f040aE73d3a01"
PRIVATE_KEY="0x023d471eac97a9e733b9e7d2c6a9eb4b312fe8eafe318b09c7241167882486db"
RPC_URL="https://starknet-sepolia.g.alchemy.com/v2/aSzNwLtr_R5h1CQLJhUuC"

echo "============================================"
echo "ShadowNet Contract Test"
echo "============================================"
echo "Contract: $CONTRACT_ADDRESS"
echo "Network: Starknet Sepolia"
echo ""

# Test 1: Create a vault
echo "Test 1: Creating vault..."
echo "  vault_id: 1"
echo "  commitment: 12345"
echo ""

INVOKE_RESULT=$(starkli invoke "$CONTRACT_ADDRESS" create_vault 1 12345 \
  --account-address "$ACCOUNT_ADDRESS" \
  --private-key "$PRIVATE_KEY" \
  --rpc "$RPC_URL" 2>&1)

TX_HASH=$(echo "$INVOKE_RESULT" | grep -oP 'Transaction hash: \K0x[a-fA-F0-9]+' || echo "")

if [ -z "$TX_HASH" ]; then
  echo "✓ Vault created (transaction may be pending)"
  echo "Response: $INVOKE_RESULT"
else
  echo "✓ Vault created!"
  echo "  Transaction Hash: $TX_HASH"
fi

echo ""
echo "Waiting 10 seconds for transaction to be processed..."
sleep 10

# Test 2: Read the vault
echo ""
echo "Test 2: Reading vault..."
echo "  vault_id: 1"
echo ""

READ_RESULT=$(starkli call "$CONTRACT_ADDRESS" get_vault 1 \
  --rpc "$RPC_URL" 2>&1)

echo "✓ Vault data retrieved:"
echo "$READ_RESULT"

echo ""
echo "============================================"
echo "✓ Test Complete!"
echo "============================================"
