## ShadowNet

**ShadowNet** is a privacy-first DeFi primitive on Starknet that enables confidential BTC-backed vaults by storing **cryptographic commitments** instead of raw financial positions on-chain.

Traditional DeFi vaults publicly expose collateral, debt ratios, and liquidation thresholds. ShadowNet flips this model by committing vault state using hash-based commitments, forming the foundation for ZK-private borrowing and synthetic asset minting.

In this prototype, users can create and load vaults where only a commitment hash is stored on Starknet. The architecture is designed to integrate zero-knowledge proofs, allowing users to prove solvency and collateralization without revealing sensitive financial data.

ShadowNet targets the emerging BTCFi ecosystem on Starknet, offering a base layer for confidential borrowing, private collateral management, and future trustless ZK verification.

---

## 🎯 Problem

Most DeFi protocols expose:
- Collateral amounts  
- Debt positions  
- Liquidation thresholds  

This transparency enables:
- Wallet surveillance  
- Strategy leakage  
- MEV targeting  

ShadowNet explores a different model: **privacy-first vaults**.

---

## 💡 Solution

ShadowNet introduces a vault system where:
- Sensitive vault data is kept **off-chain**
- A **commitment hash** represents the vault’s private state
- Only the commitment is stored on Starknet
- Vault interactions reference commitments instead of balances

This preserves privacy while remaining verifiable and composable.

---
## Why Starknet?

ShadowNet is built on Starknet because privacy-focused DeFi requires scalability and cryptographic-native infrastructure. Starknet’s ZK-STARK foundation makes it the ideal environment for commitment-based vault systems today, and future upgrades into full zero-knowledge proofs tomorrow — without sacrificing performance or composability.
---

## 🧱 Architecture

### Smart Contract (Cairo · Starknet)

- Deployed on **Starknet Sepolia**
- Stores:
  - `vault_id → owner`
  - `vault_id → commitment_hash`
- No balances or collateral values stored on-chain
- Simple, auditable, privacy-safe storage

### Frontend (React + JavaScript)

- Wallet connection (ArgentX / Starknet wallets)
- Vault creation flow
- Vault dashboard & interaction
- Local persistence for demo UX
- Clear distinction between **live on-chain** and **mocked logic**

---

## 🔁 Demo Flow

1. Connect Starknet wallet
2. Lock BTC (mocked) and create a vault
3. Commitment hash stored on-chain
4. View and manage vault privately
5. Mint synthetic asset (mocked UX)

---

## ⚠️ Prototype Notes

- BTC bridge: **mocked**
- Synthetic minting: **mocked**
- ZK proofs: **conceptual**
- Focus: **privacy architecture + UX flow**

This is a **hackathon prototype**, not a production system.

---

### 🔐 ZK-Proof Integration (Next Step)
graph TD
    subgraph Private [Private Layer]
    A[Collateral] & B[Debt] & C[Nonce] --> D[ZK Proof Generator]
    end
    D -- "Off-chain Proof" --> E[Starknet Verifier]
    E --> F{Commitment Match?}
    F -- "Yes" --> G[✓ Verified]



## 🧪 Local Development

### Frontend

```bash
npm install
npm run dev




