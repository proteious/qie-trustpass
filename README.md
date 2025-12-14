🆔 QIE TrustPass

Decentralized Identity & On-Chain Reputation System

🚀 Overview

QIE TrustPass is a decentralized identity and reputation platform built on the QIE Blockchain. It enables users to create a wallet-linked digital identity and maintain an on-chain trust score that can be publicly verified without storing or exposing personal data.

The project focuses on privacy, transparency, and trustless verification, making it suitable for Web3 onboarding, DAO membership validation, and reputation-based access control.

🧩 Problem Statement

Web3 applications struggle with trust and identity management due to:

Centralized identity providers

Repeated KYC processes

Privacy risks and data breaches

Lack of interoperable reputation systems

There is no simple, standardized, on-chain mechanism to verify user credibility without sharing personal information.

💡 Solution

QIE TrustPass introduces a blockchain-native trust layer where:

Each wallet address represents a decentralized identity

Trust scores are stored and verified directly on-chain

No personal or sensitive data is ever stored

Verification is permissionless and trustless

🛠️ Architecture 1️⃣ Smart Contract Layer

Written in Solidity

Deployed on QIE Testnet

Handles:

Identity registration

Trust score storage

Trust score retrieval

2️⃣ Wallet Integration

MetaMask used for authentication and signing

Explicit user consent for all transactions

No backend servers involved

3️⃣ Frontend Application

Built using React and Ethers.js

Features:

Wallet connection & logout

Identity creation

Trust score verification

Read-only verification of other wallet addresses

Network mismatch detection

Mobile-responsive UI

✨ Key Features

🔐 Wallet-based Identity

📊 On-Chain Trust Score

🔍 Public Verification (Read-Only)

🛡 Privacy-First Design

🔄 Session Management & Logout

⚠️ Network Safety Checks

📱 Mobile Responsive UI

🔗 Smart Contract Details

Network: QIE Testnet

Contract Address:

0xCAE68262e8ed2Ade66C58e1B35feD82f65C10408

Explorer: https://testnet.qie.digital/address/0xCAE68262e8ed2Ade66C58e1B35feD82f65C10408

▶️ How It Works (Flow)

User connects wallet via MetaMask

User registers a decentralized identifier (DID)

Smart contract stores identity and assigns trust score

Trust score can be fetched and verified on-chain

Any wallet address can be verified without gas cost

🧪 On-Chain Interaction Demonstrated

Identity registration (write transaction)

Trust score retrieval (read-only)

Third-party wallet verification

Wallet-based authentication

Network-restricted execution

🧰 Tech Stack

Solidity

QIE Blockchain (Testnet)

React

Ethers.js

MetaMask

🖥️ Run Locally cd frontend npm install npm run dev

Open:

http://localhost:5173

🔐 Security & Privacy

No personal data stored

No centralized backend

Trust enforced via blockchain immutability

All write actions require wallet approval

Read-only verification for external users

📈 Future Scope

DAO membership verification

Reputation-based access control

Web3 onboarding without repeated KYC

Integration with DeFi, NFT, and governance platforms

Multi-level trust scoring mechanisms

🏆 Hackathon Submission

This project was built as part of the QIE Blockchain Hackathon 2025 under the Identity & Security theme.

📜 License

MIT License
