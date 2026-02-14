"use client";

import { useEffect, useState } from "react";

export default function AssetsPage() {
const [assets, setAssets] = useState([]);
const [preview, setPreview] = useState(null);

function loadAssets() {
  const stored = JSON.parse(localStorage.getItem("ipr_assets") || "[]");
  return stored;
}

useEffect(() => {
  async function fetchAssets() {
    const storedAssets = loadAssets();
    setAssets(storedAssets);
  }
  fetchAssets();
}, []);

function deleteAsset(id) {
const updated = assets.filter(a => a.id !== id);
localStorage.setItem("ipr_assets", JSON.stringify(updated));
setAssets(updated);
}

return ( <div> <h1 className="text-3xl font-bold text-cyan-400 mb-8">
My Registered Assets </h1>

```
  {assets.length === 0 ? (
    <p className="text-gray-400">No assets registered yet.</p>
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
            Registered: {asset.createdAt}
          </div>

          <div className="flex gap-3 mt-5">

            <button
              onClick={() => setPreview(asset)}
              className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded-md"
            >
              Preview
            </button>

            <button
              onClick={() => deleteAsset(asset.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>

          </div>
        </div>
      ))}

    </div>
  )}

  {/* Preview Modal */}
  {preview && (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-[#0b1222] p-6 rounded-xl border border-gray-700 w-[500px]">

        <h2 className="text-xl text-cyan-400 mb-4">
          {preview.title}
        </h2>

        <p className="text-gray-400 mb-4">
          {preview.description}
        </p>

        <div className="text-xs break-all text-gray-500 mb-6">
          {preview.hash}
        </div>

        <button
          onClick={() => setPreview(null)}
          className="bg-cyan-500 px-5 py-2 rounded-md text-black"
        >
          Close
        </button>

      </div>
    </div>
  )}

</div>


);
}
