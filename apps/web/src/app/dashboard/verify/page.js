"use client";

import { useState } from "react";
import { getAssets, addActivity } from "@/lib/storage";

export default function VerifyPage() {

const [result, setResult] = useState(null);

async function generateHash(file) {
const buffer = await file.arrayBuffer();
const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
const hashArray = Array.from(new Uint8Array(hashBuffer));
return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function handleVerify(e) {


const file = e.target.files[0];
if (!file) return;

const hash = await generateHash(file);

const assets = getAssets();
const found = assets.find(a => a.hash === hash);

if (found) {
  setResult({ status: "found", asset: found });
  addActivity(`Ownership verified for "${found.title}"`);
} else {
  setResult({ status: "not_found" });
  addActivity("Verification attempted for unknown file");
}


}

return ( <div className="max-w-2xl">

  <h1 className="text-3xl font-bold text-cyan-400 mb-6">
    Verify Ownership
  </h1>

  <div className="border-2 border-dashed border-gray-600 p-10 rounded-xl text-center">
    <input type="file" onChange={handleVerify} />
  </div>

  {result && result.status === "found" && (
    <div className="mt-6 bg-green-500/20 border border-green-500 p-5 rounded-lg">
      <p className="text-green-400 font-semibold">
        Ownership Verified!
      </p>
      <p className="text-gray-300 mt-2">
        Title: {result.asset.title}
      </p>
      <p className="text-gray-400">
        Registered on: {result.asset.createdAt}
      </p>
    </div>
  )}

  {result && result.status === "not_found" && (
    <div className="mt-6 bg-red-500/20 border border-red-500 p-5 rounded-lg text-red-400">
      No ownership record found.
    </div>
  )}

</div>


);
}
