import { Account, RpcProvider } from "starknet";

const CONTRACT_ADDRESS = process.env.STARKNET_CONTRACT_ADDRESS || "0x49e43ce869b6c4f9415b1d088a92acb048b87ede6370f9ddc9013604ea79ceb";
const ACCOUNT_ADDRESS = process.env.STARKNET_ACCOUNT_ADDRESS;
let PRIVATE_KEY = process.env.STARKNET_PRIVATE_KEY;
const RPC_URL = process.env.STARKNET_RPC_URL || "https://starknet-sepolia.g.alchemy.com/v2/aSzNwLtr_R5h1CQLJhUuC";

if (!ACCOUNT_ADDRESS || !PRIVATE_KEY) {
  console.error("Error: STARKNET_ACCOUNT_ADDRESS and STARKNET_PRIVATE_KEY environment variables are required");
  process.exit(1);
}

async function test() {
  try {
    console.log("============================================");
    console.log("ShadowNet Contract Test");
    console.log("============================================");
    console.log(`Contract: ${CONTRACT_ADDRESS}`);
    console.log("Network: Starknet Sepolia");
    console.log("");

    // Connect to provider
    const provider = new RpcProvider({ nodeUrl: RPC_URL });

    // Create account
    const account = new Account({
      address: ACCOUNT_ADDRESS,
      provider: provider,
      signer: PRIVATE_KEY,
    });

    // Clear private key from memory after account creation
    PRIVATE_KEY = null;

    console.log("✓ Connected to Starknet Sepolia");
    console.log("");

    // Test 1: Create a vault
    console.log("Test 1: Creating vault...");
    console.log("  vault_id: 1");
    console.log("  commitment: 12345");
    console.log("");

    const createResult = await account.execute({
      contractAddress: CONTRACT_ADDRESS,
      entrypoint: "create_vault",
      calldata: ["1", "12345"],
    });

    console.log("✓ Create vault transaction sent!");
    console.log(`  Transaction Hash: ${createResult.transaction_hash}`);
    console.log("");

    // Wait for confirmation
    console.log("Waiting for transaction confirmation (this may take 1-2 minutes)...");
    await provider.waitForTransaction(createResult.transaction_hash, {
      retryInterval: 5000,
    });
    console.log("✓ Transaction confirmed!");
    console.log("");

    // Test 2: Read the vault
    console.log("Test 2: Reading vault...");
    console.log("  vault_id: 1");
    console.log("");

    const readResult = await provider.callContract({
      contractAddress: CONTRACT_ADDRESS,
      entrypoint: "get_vault",
      calldata: ["1"],
    });

    console.log("✓ Vault data retrieved:");
    console.log(`  Result: ${readResult.result}`);
    console.log("");

    if (readResult.result && readResult.result.length >= 2) {
      console.log("Parsed Data:");
      console.log(`  vault_id: ${readResult.result[0]}`);
      console.log(`  commitment: ${readResult.result[1]}`);
    }

    console.log("");
    console.log("============================================");
    console.log("✓ All Tests Passed!");
    console.log("============================================");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    if (error.response?.data?.error) {
      console.error("RPC Error:", error.response.data.error);
    }
    process.exit(1);
  } finally {
    // Ensure private key is cleared from memory
    PRIVATE_KEY = null;
  }
}

test();
