"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import abi from "@/abi/IPRRegistry.json";
import { addAsset, addActivity, addNotification } from "@/lib/storage";

export default function RegisterIP() {

// ---------------- STATES ----------------
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [file, setFile] = useState(null);
const [hash, setHash] = useState(null);
const [wallet, setWallet] = useState(null);
const [loading, setLoading] = useState(false);
const [publishing, setPublishing] = useState(false);
const [uploaded, setUploaded] = useState(false);

// ---------------- CONNECT WALLET ----------------
async function connectWallet() {


if (!window.ethereum) {
  return toast.error("Install MetaMask");
}

try {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  setWallet(address);
  toast.success("Wallet connected");

  addActivity("Wallet connected");
  addNotification("MetaMask connected");

} catch (err) {
  console.error(err);
  toast.error("Wallet connection failed");
}


}

// ---------------- FILE SELECT ----------------
function handleFileChange(e) {
const selected = e.target.files[0];
setFile(selected);
setUploaded(false);
}

// ---------------- UPLOAD (LOCAL STORAGE) ----------------
async function handleUpload() {


if (!title) return toast.error("Enter title");
if (!file) return toast.error("Choose a file");

try {

  setLoading(true);

  // Upload file to backend
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!data.success) throw new Error();

  // Generate SHA256 hash (ownership proof)
  const buffer = await file.arrayBuffer();
  const generatedHash = CryptoJS.SHA256(
    CryptoJS.lib.WordArray.create(buffer)
  ).toString();

  setHash(generatedHash);

  // Save locally
  const newAsset = {
    id: Date.now(),
    title,
    description,
    fileName: file.name,
    fileUrl: data.url,
    hash: generatedHash,
    wallet: wallet || "Not Published",
    txHash: null,
    createdAt: new Date().toLocaleString(),
  };

  addAsset(newAsset);
  addActivity(`Uploaded "${title}"`);
  addNotification(`File "${file.name}" uploaded`);

  toast.success("File uploaded successfully!");
  setUploaded(true);

} catch (err) {
  console.error(err);
  toast.error("Upload failed");
}

setLoading(false);


}

// ---------------- PUBLISH TO BLOCKCHAIN ----------------
async function publishToBlockchain() {


if (!uploaded) {
  return toast.error("Upload file first");
}

if (!wallet) {
  return toast.error("Connect wallet first");
}

try {

  setPublishing(true);

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi.abi,
    signer
  );

  toast.loading("Confirm transaction in MetaMask...");

  const tx = await contract.registerIP(hash, "LOCAL_CID");
  await tx.wait();

  toast.dismiss();
  toast.success("Published on blockchain!");

  addActivity(`Asset "${title}" published on-chain`);
  addNotification(`Blockchain tx: ${tx.hash.slice(0, 10)}...`);

} catch (err) {
  console.error(err);
  toast.error("Blockchain transaction failed");
}

setPublishing(false);


}

// ---------------- UI ----------------
return ( <div className="bg-[#0b1222] border border-gray-700 rounded-xl p-8 shadow-xl space-y-6">


  {/* Wallet */}
  <div className="text-center">
    {!wallet ? (
      <button
        onClick={connectWallet}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
      >
        Connect MetaMask
      </button>
    ) : (
      <div className="text-green-400 text-sm">
        Wallet: {wallet.slice(0,6)}...{wallet.slice(-4)}
      </div>
    )}
  </div>

  {/* Title */}
  <div>
    <label className="block text-sm text-gray-400 mb-2">Asset Title</label>
    <input
      type="text"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      className="w-full bg-[#050816] border border-gray-600 rounded-lg px-4 py-3 text-white"
    />
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm text-gray-400 mb-2">Description</label>
    <textarea
      rows="4"
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      className="w-full bg-[#050816] border border-gray-600 rounded-lg px-4 py-3 text-white"
    />
  </div>

  {/* File */}
  <div className="border-2 border-dashed border-gray-600 rounded-xl p-10 text-center">
    <input type="file" onChange={handleFileChange} />

    {file && (
      <p className="mt-3 text-gray-400">
        Selected: <span className="text-white">{file.name}</span>
      </p>
    )}
  </div>

  {/* Upload */}
  <div className="text-center">
    <button
      onClick={handleUpload}
      disabled={loading}
      className="bg-cyan-500 hover:bg-cyan-600 text-black px-8 py-3 rounded-lg"
    >
      {loading ? "Uploading..." : "Register & Save File"}
    </button>
  </div>

  {/* Publish */}
  <div className="text-center">
    <button
      onClick={publishToBlockchain}
      disabled={publishing}
      className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg"
    >
      {publishing ? "Waiting for confirmation..." : "Publish Proof to Blockchain"}
    </button>
  </div>

</div>


);
}
