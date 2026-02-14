"use client";

import { useEffect, useState } from "react";
import { getAssets, deleteAssetById } from "@/lib/storage";

export default function AssetsPage() {

const [assets, setAssets] = useState([]);

useEffect(() => {
  async function fetchAssets() {
    const stored = await getAssets();
    setAssets(stored);
  }
  fetchAssets();
}, []);

function handleDelete(id) {
deleteAssetById(id);
loadAssets();
}

return ( <div>

```
  <h1 className="text-3xl font-bold text-cyan-400 mb-8">
    My Registered Assets
  </h1>

  {assets.length === 0 ? (
    <p className="text-gray-400">
      No assets uploaded yet. Go to Register IP.
    </p>
  ) : (

    <div className="grid md:grid-cols-2 gap-6">

      {assets.map(asset => (
        <div
          key={asset.id}
          className="bg-[#0b1222] border border-gray-700 rounded-xl p-6 shadow-lg"
        >

          <h2 className="text-xl font-semibold text-white">
            {asset.title}
          </h2>

          <p className="text-gray-400 mt-2">
            {asset.description || "No description"}
          </p>

          <div className="mt-4 text-sm text-gray-500">
            File: {asset.fileName}
          </div>

          <div className="text-xs text-gray-600 mt-2 break-all">
            Hash: {asset.hash}
          </div>

          <div className="text-xs text-gray-600 mt-1">
            Uploaded: {asset.createdAt}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 mt-5">

            <a
              href={asset.fileUrl}
              target="_blank"
              className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded-md"
            >
              View / Download
            </a>

            <button
              onClick={() => handleDelete(asset.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>

          </div>

        </div>
      ))}

    </div>
  )}

</div>


);
}
