"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";
import { ethers } from "ethers";
import abi from "../../abi/IPRRegistry.json";
import WalletConnect from "@/components/WalletConnect";
import toast from "react-hot-toast";

export default function UploadPage() {

  const [file, setFile] = useState(null);

  const register = async () => {

    if (!file) return toast.error("Please select a file");

    try {

      // 1️⃣ Generate SHA256 hash
      const buffer = await file.arrayBuffer();
      const hash = CryptoJS.SHA256(
        CryptoJS.lib.WordArray.create(buffer)
      ).toString();

      // 2️⃣ Connect wallet
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      // 3️⃣ Contract instance
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi.abi,
        signer
      );

      toast.loading("Waiting for blockchain confirmation...");

      const tx = await contract.registerIP(hash, "LOCAL_CID");
      await tx.wait();

      toast.dismiss();
      toast.success("Registered on Blockchain!");

      // 4️⃣ Save in database
      await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          wallet: walletAddress,
          fileName: file.name,
          hash: hash,
          cid: "LOCAL_CID",
          tx: tx.hash
        })
      });

      toast.success("Saved in database!");

    } catch (err) {
      console.error(err);
      toast.error("Transaction failed");
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl text-cyan-400 mb-6">
        Register Intellectual Property
      </h1>

      <WalletConnect />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mt-6"
      />

      <br />

      <button
        onClick={register}
        className="bg-green-600 px-5 py-2 mt-4 rounded"
      >
        Register Ownership
      </button>

    </div>
  );
}
