## ShadowNet

**ShadowNet** is a BTCFi vault primitive on Starknet that enables **BTC-backed borrowing** through **confidential commitment-based vaults**.

As Bitcoin liquidity expands into Starknet via bridges, wrappers, and BTCFi infrastructure, vault-based lending becomes inevitable — but today’s systems expose collateral, debt, and liquidation thresholds publicly.

ShadowNet introduces a new vault model where BTC-backed positions can exist **without revealing sensitive financial exposure on-chain**, forming the foundation for future **ZK-private borrowing** and synthetic BTC issuance.

---

## 🟠 The Problem (BTCFi Needs Privacy)

Most BTCFi lending protocols today expose:

- Collateral amounts  
- Debt positions  
- Liquidation thresholds  
- Borrower strategies  

This creates serious issues:

- Wallet surveillance  
- Liquidation bot targeting  
- MEV exploitation  
- Institutions avoiding BTCFi due to transparency risk  

Bitcoin-backed DeFi cannot scale if every vault becomes a public target.

---

## 💡 The ShadowNet Approach

ShadowNet explores a vault architecture where:

- BTC collateral is represented inside a vault system  
- Sensitive vault state remains **private by default**
- Only a cryptographic commitment is stored publicly on Starknet  
- Vault interactions reference commitments instead of balances  

This enables BTCFi borrowing infrastructure that is:

- more private  
- more resistant to liquidation games  
- institution-friendly  
- ZK-upgradable  

---

## 🔐 Commitment-Based Vault Model

Instead of storing:

> “User locked 2 BTC and borrowed 1.5 BTC”

ShadowNet stores only:

> `commitment = H(collateral, debt, nonce)`

On-chain, Starknet only sees:

- Vault ID  
- Owner  
- Commitment hash  

Not the vault’s real financial exposure.

---

## 🧱 Architecture

### Smart Contract (Cairo · Starknet)

- Deployed on **Starknet Sepolia Testnet**
- Stores:

  - `vault_id → owner`
  - `vault_id → commitment_hash`

- No collateral values stored on-chain  
- Minimal, auditable BTCFi vault primitive  

---

### Frontend (React + JavaScript)

The prototype frontend provides a demo-ready BTCFi flow:

- Starknet wallet connection (ArgentX supported)
- Vault creation UX
- Vault dashboard + on-chain querying
- Commitment display + verification
- Demo synthetic minting (sBTC)
- Local persistence for hackathon UX

---

## 🔁 Demo Flow

1. Connect Starknet wallet  
2. Lock BTC collateral (**mocked in prototype**)  
3. Create vault → commitment stored on-chain  
4. Load vault by ID → verify commitment exists  
5. Mint synthetic BTC asset (**mocked UX demo**)  

---

## ⚠️ Prototype Notes

This is a hackathon prototype focused on the vault privacy primitive:

- BTC bridge integration: **mocked**
- Synthetic minting logic: **mocked**
- ZK solvency proofs: **conceptual**
- Core shipped component: **commitment-based BTC vault layer**

---

## 🚀 Why This Matters for Bitcoin Track

ShadowNet is designed for the next wave of BTCFi on Starknet:

- BTC-backed lending requires vault infrastructure  
- Vault privacy prevents liquidation targeting  
- Commitment storage is the missing base layer  
- Starknet is the natural home for ZK-upgradable BTCFi  

ShadowNet delivers the foundation for:

- confidential BTC collateral vaults  
- private borrowing  
- future ZK-proof secured solvency  

---

## 🧩 Why Starknet?

ShadowNet is built on Starknet because:

- Starknet is ZK-native (STARK proofs)
- It supports scalable BTCFi execution
- Commitment-based vaults upgrade naturally into full ZK verification
- Future private borrowing can be verified without revealing balances

Starknet is the ideal settlement layer for confidential BTCFi.

---

## 🔐 ZK Upgrade Path (Next Step)

| Layer | Component | Role |
|------|----------|------|
| Input | Private Vault Data | `collateral`, `debt`, `nonce` |
| Proof | Off-chain Generation | Solvency proof creation |
| Verify | Starknet Verifier | On-chain validation |
| Result | Commitment Match | Privacy-preserving borrowing |

---

## 🧪 Local Development

### Frontend

```bash
npm install
npm run dev
