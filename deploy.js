import "./alchemy-rpc-wrapper.js";
import fs from "fs";
import { Account, Contract, RpcProvider } from "starknet";

const PRIVATE_KEY = process.env.STARKNET_PRIVATE_KEY;
const ACCOUNT_ADDRESS = process.env.STARKNET_ACCOUNT_ADDRESS;
const RPC_URL = process.env.STARKNET_RPC_URL || "https://starknet-sepolia.g.alchemy.com/v2/aSzNwLtr_R5h1CQLJhUuC";

if (!PRIVATE_KEY || !ACCOUNT_ADDRESS) {
  console.error(
    "Error: Set STARKNET_PRIVATE_KEY and STARKNET_ACCOUNT_ADDRESS environment variables"
  );
  process.exit(1);
}

async function deploy() {
  try {
    console.log("Connecting to Starknet testnet...");
    const provider = new RpcProvider({ nodeUrl: RPC_URL });

    const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY);

    console.log("Loading compiled contract...");
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

    console.log("Deploying ShadowNet contract...");
    
    // Add max fee with proper gas estimation
    const declareResponse = await account.declare({
      contract: sierraContract,
      casm: casmContract,
    });

    console.log("Waiting for declaration confirmation...");
    await provider.waitForTransaction(declareResponse.transaction_hash, {
      retryInterval: 5000,
    });

    console.log("Deploying contract instance...");
    const deployResponse = await account.deploy({
      classHash: declareResponse.class_hash,
    });

    const contractAddress = deployResponse.contract_address;
    const transactionHash = deployResponse.transaction_hash;

    console.log("\n✓ Deployment successful!");
    console.log(`Contract Address: ${contractAddress}`);
    console.log(`Transaction Hash: ${transactionHash}`);

    console.log("\nWaiting for transaction confirmation...");
    const receipt = await provider.waitForTransaction(transactionHash, {
      retryInterval: 5000,
    });

    console.log("✓ Transaction confirmed on-chain");

    console.log("\nDeployment Details:");
    console.log(`Network: Starknet Sepolia Testnet`);
    console.log(`Contract: ShadowNet`);
    console.log(`Address: ${contractAddress}`);
    console.log(`Tx Hash: ${transactionHash}`);
  } catch (error) {
    console.error("Deployment failed:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
}

deploy();
