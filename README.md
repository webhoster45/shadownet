# ShadowNet

**ShadowNet** is a privacy-first DeFi prototype built on **Starknet** that demonstrates how users can create and manage collateralized vaults **without exposing sensitive financial data on-chain**.

Instead of storing balances, debt, or liquidation parameters, ShadowNet records a single **cryptographic commitment hash** representing a vault’s private state. This allows vaults to exist and be interacted with while preserving user privacy.

This project is intentionally minimal and demo-focused for hackathon evaluation.

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


## 🧪 Local Development

### Frontend

```bash
npm install
npm run dev
