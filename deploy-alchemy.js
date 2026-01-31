import axios from "axios";
import fs from "fs";
import { Account, RpcProvider, shortString } from "starknet";

let PRIVATE_KEY = process.env.STARKNET_PRIVATE_KEY;
let ACCOUNT_ADDRESS = process.env.STARKNET_ACCOUNT_ADDRESS;
const RPC_URL = process.env.STARKNET_RPC_URL || "https://starknet-sepolia.g.alchemy.com/v2/aSzNwLtr_R5h1CQLJhUuC";

if (!PRIVATE_KEY || !ACCOUNT_ADDRESS) {
  console.error(
    "Error: Set STARKNET_PRIVATE_KEY and STARKNET_ACCOUNT_ADDRESS environment variables"
  );
  process.exit(1);
}

// Normalize address to lowercase and ensure 0x prefix
ACCOUNT_ADDRESS = ACCOUNT_ADDRESS.toLowerCase();
if (!ACCOUNT_ADDRESS.startsWith("0x")) {
  ACCOUNT_ADDRESS = "0x" + ACCOUNT_ADDRESS;
}

async function deploy() {
  try {
    console.log("Connecting to Starknet Sepolia via Alchemy...");
    console.log(`RPC URL: ${RPC_URL}`);
    
    const provider = new RpcProvider({ 
      nodeUrl: RPC_URL,
      headers: { "Content-Type": "application/json" }
    });

    // Verify connection
    const chainId = await provider.getChainId();
    console.log(`✓ Connected to Starknet chain: ${chainId}`);

    const account = new Account({
      address: ACCOUNT_ADDRESS,
      provider: provider,
      signer: PRIVATE_KEY,
    });
    console.log(`✓ Account initialized: ${ACCOUNT_ADDRESS}`);

    // Clear private key from memory after account creation
    PRIVATE_KEY = null;

    // Override the fetch method to add simulation_flags for Alchemy
    const originalFetchMethod = provider.fetch.bind(provider);
    provider.fetch = async function(method, params = {}) {
      if (method === "starknet_estimateFee") {
        // Make direct axios call to Alchemy with simulation_flags
        try {
          const response = await axios.post(RPC_URL, {
            jsonrpc: "2.0",
            id: 1,
            method,
            params: {
              ...params,
              simulation_flags: ["SKIP_VALIDATE"],
            },
          });

          if (response.data.error) {
            throw new Error(`RPC Error: ${response.data.error.message}`);
          }

          return response.data.result;
        } catch (error) {
          console.error(`Fee estimation failed:`, error.message);
          throw error;
        }
      }
      
      // For other methods, use the original fetch
      return originalFetchMethod(method, params);
    };
    const sierraContract = JSON.parse(
      fs.readFileSync(
        "./target/dev/shadownet_ShadowNet.contract_class.json",
        "utf8"
      )
    );

    const casmContract = JSON.parse(
      fs.readFileSync(
        "./target/dev/shadownet_ShadowNet.compiled_contract_class.json",
        "utf8"
      )
    );

    console.log("Declaring contract class...");
    const declareResponse = await account.declare({
      contract: sierraContract,
      casm: casmContract,
    });

    console.log("✓ Class declared");
    console.log(`  Class Hash: ${declareResponse.class_hash}`);
    console.log(`  Tx Hash: ${declareResponse.transaction_hash}`);

    console.log("\nWaiting for declaration to be included in a block...");
    await provider.waitForTransaction(declareResponse.transaction_hash, {
      retryInterval: 5000,
    });
    console.log("✓ Declaration confirmed");

    console.log("\nDeploying contract instance...");
    const deployResponse = await account.deploy({
      classHash: declareResponse.class_hash,
    });

    const contractAddress = deployResponse.contract_address;
    const transactionHash = deployResponse.transaction_hash;

    console.log("✓ Deployment transaction sent");
    console.log(`  Contract Address: ${contractAddress}`);
    console.log(`  Tx Hash: ${transactionHash}`);

    console.log("\nWaiting for deployment transaction to be included...");
    await provider.waitForTransaction(transactionHash, {
      retryInterval: 5000,
    });

    console.log("\n" + "=".repeat(50));
    console.log("✓ DEPLOYMENT SUCCESSFUL!");
    console.log("=".repeat(50));
    console.log(`Contract Address: ${contractAddress}`);
    console.log(`Transaction Hash: ${transactionHash}`);
    console.log(`Network: Starknet Sepolia Testnet`);
    console.log(`Block Explorer: https://sepolia.starkscan.co/contract/${contractAddress}`);
    console.log("=".repeat(50));
  } catch (error) {
    console.error("\n❌ Deployment failed:", error.message);
    console.error("Full error:", error);
    if (error.response?.data?.error) {
      console.error("RPC Error:", error.response.data.error);
    }
    process.exit(1);
  } finally {
    // Ensure private key is cleared from memory
    PRIVATE_KEY = null;
  }
}

deploy();
