"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAssets } from "@/lib/storage";

export default function CertificatePage() {

  const params = useParams();
  const { assetId } = params;

  const [asset, setAsset] = useState(null);

  useEffect(() => {

    const assets = getAssets();

    const found = assets.find(a => a.id.toString() === assetId);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAsset(found);

  }, [assetId]);

  if (!asset) {
    return (
      <div className="p-10 text-center text-gray-400">
        Certificate not found
      </div>
    );
  }

  return (

    <div className="flex justify-center items-center min-h-[80vh]">

      <div className="bg-[#0b1222] border border-gray-700 rounded-xl p-10 w-full max-w-3xl shadow-2xl">

        <h1 className="text-3xl text-cyan-400 font-bold text-center mb-6">
          Intellectual Property Certificate
        </h1>

        <p className="text-center text-gray-400 mb-8">
          This document certifies the blockchain ownership of the asset below.
        </p>

        <div className="space-y-4 text-sm">

          <Row label="Asset Title" value={asset.title} />

          <Row label="Description" value={asset.description || "—"} />

          <Row label="File Name" value={asset.fileName} />

          <Row label="Owner Wallet" value={asset.wallet} />

          <Row label="SHA256 Hash" value={asset.hash} />

          <Row label="Transaction Hash" value={asset.txHash || "Not published"} />

          <Row label="Registered On" value={asset.createdAt} />

        </div>

        <div className="text-center mt-10">

          <button
            onClick={() => window.print()}
            className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-2 rounded-lg"
          >
            Download Certificate
          </button>

        </div>

      </div>

    </div>

  );
}

/* ---------- Reusable Row ---------- */

function Row({ label, value }) {

  return (

    <div className="flex justify-between border-b border-gray-800 pb-2">

      <span className="text-gray-400">{label}</span>

      <span className="text-white break-all text-right">
        {value}
      </span>

    </div>

  );

}