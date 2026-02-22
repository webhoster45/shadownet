# ShadowNet

**ShadowNet** is a commitment-based private vault primitive built on Starknet.

It enables confidential DeFi positions by storing cryptographic commitments instead of exposing collateral and debt publicly on-chain.

As DeFi evolves toward MEV resistance, institutional participation, and privacy-preserving infrastructure, ShadowNet explores the foundational vault architecture required to support confidential borrowing systems.

---

## 🔐 The Problem

Most lending protocols expose sensitive financial data:

- Collateral amounts  
- Debt positions  
- Liquidation thresholds  
- Borrower strategies  

This transparency enables:

- wallet surveillance  
- liquidation bot targeting  
- MEV exploitation  
- institutional reluctance to participate  

Transparent vaults create systemic risk.

---

## 💡 The ShadowNet Approach

ShadowNet introduces a vault architecture where sensitive vault state remains private by default.

Instead of storing balances on-chain, the protocol stores:

commitment = H(collateral, debt, nonce)



On-chain, Starknet sees only:

- Vault ID  
- Owner address  
- Commitment hash  

Not the vault’s real financial exposure.

This enables privacy-preserving DeFi infrastructure.

---

## 🧱 Architecture

### Smart Contract (Cairo · Starknet Sepolia)

**Deployed Vault Primitive**

Stores:

- `vault_id → owner`
- `vault_id → commitment hash`

Does **not** store collateral or debt values.

A minimal, auditable privacy vault foundation.

---

### Frontend (React + JavaScript)

The demo interface provides:

- Starknet wallet connection  
- vault creation flow  
- vault dashboard & querying  
- commitment display & verification  
- synthetic borrowing UX demo  
- local persistence for hackathon UX  

---

## 🔁 Demo Flow

1. Connect Starknet wallet  
2. Enter collateral amount *(mocked demo input)*  
3. Create vault → commitment stored on-chain  
4. Load vault → verify commitment exists  
5. Mint synthetic asset *(prototype UX demo)*  

---

## 🔐 Commitment Model

Instead of publishing:

> User locked collateral and borrowed assets

ShadowNet stores:

commitment = H(collateral, debt, nonce)


This allows vaults to exist without revealing financial exposure.

---

## ⚠️ Prototype Scope & Limitations

This project is a hackathon prototype focused on the privacy vault primitive.

### ✅ Implemented

- commitment-based vault storage  
- Starknet deployment  
- on-chain vault querying  
- privacy-preserving architecture  
- demo vault dashboard  

### 🧪 Mocked / Future Work

- asset bridging  
- synthetic minting logic  
- liquidation engine  
- ZK solvency verification  

---

## 🔐 ZK Upgrade Path

ShadowNet is designed to evolve into a fully private borrowing system.

| Layer | Component | Role |
|------|-----------|------|
| Input | Private vault data | collateral, debt, nonce |
| Proof | Off-chain prover | solvency proof generation |
| Verify | Starknet verifier | validate without revealing balances |
| Result | Commitment match | privacy-preserving borrowing |

---

## 🚀 Why Starknet?

ShadowNet is built on Starknet because:

- STARK proofs enable privacy-preserving verification  
- commitments upgrade naturally into ZK proofs  
- scalable execution supports advanced verification logic  
- ideal settlement layer for confidential DeFi systems  

---

## 🌐 Future Extensions

- ZK solvency proof verification  
- confidential liquidations  
- private synthetic assets  
- institutional private vault tooling  
- cross-chain collateral integrations  
- BTCFi and wrapped asset support  

---

## 📜 Smart Contract (Sepolia)

Contract Address= 0x49e43ce869b6c4f9415b1d088a92acb048b87ede6370f9ddc9013604ea79ceb


---

**Vision**

ShadowNet delivers the foundational primitive required for private borrowing systems.

By replacing public vault balances with cryptographic commitments, it establishes a path toward:

confidential DeFi positions

MEV-resistant lending

privacy-preserving solvency proofs

institution-ready on-chain finance

# **⚙️ How It Works (Cairo 1 – Starknet v0.13+)**

# 

ShadowNet implements a commitment-based vault primitive using a minimal, composable contract architecture optimized for Starknet’s validity rollup model.

The system follows a Commit–Store–Reference pattern:

**1️⃣ Commit (Off-Chain State Construction)**

Vault financial state (collateral, debt, nonce, metadata) is computed off-chain.

Instead of publishing raw position data, the client generates a cryptographic commitment:

commitment = H(hidden_state)

Where hidden_state may include:

collateral amount

debt amount

vault nonce

optional metadata

This ensures:

No sensitive financial state is exposed on-chain

The vault can be referenced deterministically

Future ZK proofs can validate solvency against stored commitments

---

2️⃣ Store (Cairo Contract – Starknet)

The Starknet contract stores only:

**Storage Model**

`#[storage]`

`struct Storage {`

`vault_owner: Map<felt252, felt252>,`

`vault_commitment: Map<felt252, felt252>,`

`}`

Key architectural properties:

Uses Starknet-native Map storage abstraction

Vault indexing via felt252 identifiers

Ownership enforced via get_caller_address()

No raw collateral or debt state persisted

This design minimizes on-chain attack surface while maintaining public verifiability.

**3️⃣ Reference (On-Chain Query + Off-Chain Proof Layer)**

The get_vault entrypoint allows:

Ownership verification

Commitment retrieval

Off-chain state reconciliation

**Future iterations can integrate:**

Pedersen-based commitment schemes

Poseidon hash optimization

Cairo-based verifier contracts

ZK solvency proofs referencing stored commitments

The current architecture is intentionally modular and ZK-ready without embedding premature proof logic.

## **Technical Stack**

**Language**

**Cairo 1 (Starknet-native contract model)**

`#[starknet::contract] module structure`

`Explicit #[storage] layout`

`#[external(v0)] entrypoints`

`ContractState mutability model (ref vs @)`

Network:

Starknet Sepolia Testnet

Deployed contract with live storage interaction

**Storage Layer**

`starknet::storage::Map`

Felt252-based vault indexing

Deterministic state writes

Cryptographic Design

Commitment abstraction (hash-ready architecture)

Compatible with Stark-friendly hash primitives (Pedersen / Poseidon)

Designed for future Cairo verifier integration

Frontend Integration

Starknet.js RPC execution

Account abstraction interaction

Provider-based read calls (no gas for views)

## **🧱 Architectural Intent**

ShadowNet is intentionally minimal.

It does not yet implement:

Liquidation engines

Bridging logic

ZK proof verification

Instead, it establishes:

> A Starknet-native commitment storage layer designed for extensible confidential DeFi systems.

PLEASE CHECK OUT THE INTEGRETION.MD

**Built during Starknet redefine hackathon: contract + UI + deployment**


