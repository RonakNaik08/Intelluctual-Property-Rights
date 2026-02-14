"use client";

import { useEffect, useState } from "react";

export default function NetworkIndicator() {
  const [status, setStatus] = useState("Checking...");
  const [good, setGood] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (!window.ethereum) {
        setStatus("No Wallet");
        return;
      }

      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        // Hardhat Localhost chain id
        if (chainId === "0x7a69") {
          setStatus("Hardhat");
          setGood(true);
        } else {
          setStatus("Wrong Network");
          setGood(false);
        }
      } catch {
        setStatus("Error");
      }
    };

    check();
  }, []);

  return (
    <div
      className={`px-3 py-1 rounded-full text-xs font-medium
        ${good ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"}`}
    >
      {status}
    </div>
  );
}
