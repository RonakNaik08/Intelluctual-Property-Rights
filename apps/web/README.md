# Intellectual Property Rights (IPR) DApp

A blockchain-based decentralized application that allows creators to register, verify, and prove ownership of intellectual property (IP) such as ideas, designs, or digital works.

The system records IP ownership on the blockchain using smart contracts, making records tamper-proof, transparent, and permanently verifiable.

---

## Problem

Creators often face:
- Idea theft
- No proof of ownership
- Expensive legal registration
- Delayed copyright verification

Traditional copyright systems are centralized and slow.

---

## Solution

This project provides a decentralized IP registry using Ethereum smart contracts.

Once an IP is registered:
- Ownership is immutable
- Timestamp is permanent
- Anyone can verify authenticity
- No authority required

---

## Features

- Register intellectual property on blockchain
- Unique ownership hash generation
- Timestamped proof of creation
- Public verification of IP ownership
- Web interface for registration
- REST API backend
- Smart contract storage

---

## Tech Stack

### Blockchain
- Solidity
- Hardhat
- Ethers.js

### Backend
- Node.js
- Express.js

### Frontend
- Next.js
- React
- TailwindCSS

---

## Project Architecture

Frontend (Next.js) → Backend API (Express) → Smart Contract (Ethereum)

The frontend sends requests to the backend.
The backend interacts with the deployed smart contract using ethers.js.
The blockchain permanently stores ownership data.

---

## Installation & Setup

### 1. Clone repository
