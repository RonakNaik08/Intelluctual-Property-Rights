"use client";
import { ethers } from "ethers";
import { useState } from "react";

export default function WalletConnect() {

  const [address,setAddress] = useState("");

  const connect = async () => {
    if(!window.ethereum) return alert("Install MetaMask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts",[]);
    setAddress(accounts[0]);
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg">
      {address ? (
        <p className="text-green-400">Connected: {address}</p>
      ) : (
        <button
          onClick={connect}
          className="bg-cyan-500 px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
