# ShadowNet: Decentralized Confidential Vaults

ShadowNet is a commitment-based private vault primitive built originally on Starknet, and now massively expanded into a hybrid Web3 protocol utilizing the Protocol Labs Ecosystem (IPFS) for decentralized data availability. 

It enables confidential DeFi positions by storing cryptographic commitments instead of exposing collateral and debt publicly on-chain. As DeFi evolves toward MEV resistance, institutional participation, and privacy-preserving infrastructure, ShadowNet explores the foundational vault architecture required to support confidential borrowing systems.

---

## The Problem

Most lending protocols expose sensitive financial data:
- Collateral amounts  
- Debt positions  
- Liquidation thresholds  
- Borrower strategies  

This transparency enables:
- Wallet surveillance  
- Liquidation bot targeting  
- MEV exploitation  
- Institutional reluctance to participate  

Transparent vaults create systemic risk.

---

## The ShadowNet Approach

ShadowNet introduces a vault architecture where sensitive vault state remains private by default. Instead of storing balances on-chain, the protocol stores a cryptographic proof. 

### Phase 1: The Starknet Primitive (Redefine Hackathon)
Originally, ShadowNet developed the core Cairo smart contract to securely custody Starknet state commitments. Under this model, the contract stored a simple hash:
commitment = H(collateral, debt, nonce)

On-chain, Starknet only verified:
- Vault ID  
- Owner address  
- Commitment hash  

This was a massive first step, but it introduced a classic Zero-Knowledge Data Availability problem: Where does the private data go if it is hidden from the blockchain?

### Phase 2: The Data Availability Pivot (PL Genesis Hackathon)
To solve the data availability problem, we evolved ShadowNet into a full hybrid Web3 application. We integrated IPFS to act as the decentralized encrypted data layer, dynamically bridging IPFS data to Starknet logic.

1. Decentralized Storage: When a user creates a vault, the collateral amount, debt, and cryptographic nonces are securely encrypted on the client side and instantly pinned to the IPFS network via Pinata.
2. Deterministic Binding: We intercept the returned IPFS Content Identifier (CID). Instead of hashing arbitrary data, we hash the IPFS CID itself using Keccak256, mathematically reducing it into a Starknet Felt252 numerical representation.
3. On-Chain Settlement: The Starknet Cairo Smart Contract only stores that single deterministic hash. 

Result: A production-ready architecture where Protocol Labs handles Data Availability, and Starknet handles Cryptographic Verification.

---

## Architecture Breakdown

### Smart Contract (Cairo 1 - Starknet Sepolia)
The deployed vault primitive acts as the settlement layer.

Storage Model:
```rust
#[storage]
struct Storage {
    vault_owner: Map<felt252, felt252>,
    vault_commitment: Map<felt252, felt252>,
}
```

Key architectural properties:
- Uses Starknet-native Map storage abstraction.
- Vault indexing via felt252 identifiers.
- Ownership enforced via get_caller_address().
- No raw collateral or debt state persisted.
- Designed to minimize on-chain attack vectors.

### Data Layer (Protocol Labs IPFS)
- Utilizes Pinata API for high-availability IPFS pinning.
- CID generation acts as the structural foundation for the Starknet proof.
- Ensures user vault parameters cannot be arbitrarily lost if the client device goes offline.

### Frontend Application (React - Apple Minimalist UI)
The demo interface provides:
- Starknet wallet connection via ArgentX/Braavos.
- A seamless vault creation flow interacting with Pinata IPFS.
- Advanced monochromatic Apple Minimalist User Experience.
- Real-time cryptographic commitment display and verification.

---

## The Verifier Engine

To showcase the explicit link between Protocol Labs and Starknet, our application ships with a Live Cryptographic Verifier Engine.

During a vault inspection, observers can execute the engine to prove data integrity. The engine performs the following isolated operations:
1. Intercepts the IPFS CID currently pinned for the vault.
2. Executes the Keccak256 algorithm live in the browser.
3. Performs a modulo operation against the Starknet Prime to reduce the hash to a compatible Felt252 structure.
4. Queries the Starknet Sepolia blockchain to retrieve the immutable state commitment.
5. Performs a strict mathematical equality check.

If the data on IPFS was tampered with, the CID would change inherently due to IPFS content-addressing physics, and the resulting Starknet cross-check will immediately fail. This engine visually proves 100% data integrity with zero data leaks.

---

## Commitment Model Deep Dive

Instead of publishing: "User locked 1.5 BTC and borrowed 5000 USDC", ShadowNet stores the outcome of the function:
commitment = Modulo(Keccak256(IPFS_CID), STARKNET_PRIME)

Where the IPFS payload guarantees the preservation of the encrypted structure:
{
  "vaultId": "12345",
  "collateral": "1.5",
  "debt": "0",
  "nonce": "uuid-v4-string"
}

This enforces standard privacy-preserving infrastructure where the actual financial exposure is strictly separated from the public blockchain ledger.

---

## Prototype Scope and Limitations

This repository encapsulates the progress made across two distinct core hackathons.

### Implemented Mechanics
- Commitment-based vault storage array.
- Live Starknet Sepolia deployment.
- IPFS Pinata off-chain encrypted pinning.
- On-chain vault querying and verifications.
- The Dashboard Verifier Engine.
- Sleek monochromatic User Interface.

### Mocked / Future Work
- Actual Token bridging mechanisms.
- True synthetic asset minting (currently a visual prototype).
- Liquidation engine network.
- ZK SNARK/STARK external solvent verification.

---

## The ZK Upgrade Path

ShadowNet is deliberately structured to evolve into a fully private borrowing system utilizing genuine zero-knowledge proofs.

Input Layer: Private vault data (collateral, debt, nonce) secured on IPFS.
Proof Layer: Off-chain prover generates a solvency proof cryptographically guaranteeing the Vault is healthy.
Verification Layer: Starknet verifier contract mathematically validates the proof without exposing the input values.
Result Layer: The synthetic assets are allowed to circulate.

---

## Why Starknet?

ShadowNet relies on Starknet because:
- STARK proofs natively enable privacy-preserving verification architectures.
- Commitments upgrade naturally into ZK proofs using Cairo abstractions.
- Scalable execution environments support computationally heavy verification logic.
- It is the ideal settlement layer for confidential DeFi systems.

---

## Why Protocol Labs?

ShadowNet relies on Protocol Labs and IPFS because:
- Decentralized finance requires decentralized storage to achieve absolute fault tolerance.
- Content Addressing (CIDs) perfectly compliment deterministic hashing architectures.
- Pinata and Fleek provide world-class infrastructure to bring IPFS to consumer applications rapidly.

---

## Future Extensions

Because the foundation is highly modular, the team plans to expand ShadowNet towards:
- Integration of ZK solvency proof verification logic inside the Cairo contract.
- Confidential liquidation auctions preventing predatory MEV targeting.
- Private synthetic asset architectures targeting institutional traders.
- Specialized BTCFi and wrapped asset support paradigms.
- Cross-chain collateral deposits.

---

## Deployment Data

Network: Starknet Sepolia Testnet
Contract Address: 0x49e43ce869b6c4f9415b1d088a92acb048b87ede6370f9ddc9013604ea79ceb
Storage Protocol: IPFS (Pinata Node Configuration)

Built originally during the Starknet Redefine Hackathon.
Expanded significantly for the Protocol Labs Genesis Hackathon.

## Setup Instructions

To run the full stack locally:

1. Clone the repository.
2. Navigate to the frontend directory `cd frontend`.
3. Create an environment file `.env` and add your Pinata API keys.
4. Run `npm install` and `npm start`.

Validate the UI flow and interact with the Live Cryptographic Verifier Engine to witness the power of a true Hybrid Web3 integration.
