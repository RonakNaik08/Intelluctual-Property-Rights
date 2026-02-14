"use client";

import { useEffect, useState } from "react";
import { getActivity } from "@/lib/storage";

export default function ActivityPage() {

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const activityLogs = await getActivity();
        setLogs(activityLogs || []);
      } catch (err) {
        console.error("Activity fetch failed:", err);
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-cyan-400 mb-8">
          Activity Ledger
        </h1>
        <p className="text-gray-400">Loading activity...</p>
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        Blockchain Activity Ledger
      </h1>

      {logs.length === 0 ? (
        <p className="text-gray-400">No blockchain activity recorded yet.</p>
      ) : (

        /* ---------- Timeline ---------- */
        <div className="relative border-l border-cyan-700/40 ml-5">

          {logs.map((log) => (
            <div key={log.id} className="mb-10 ml-6">

              {/* DOT */}
              <span
                className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full ${getColor(log.type)}`}
              >
                {getIcon(log.type)}
              </span>

              {/* CARD */}
              <div className="bg-[#0b1222] border border-gray-800 rounded-xl p-5 shadow-lg">

                <h3 className="text-cyan-400 text-lg font-semibold">
                  {log.text}
                </h3>

                {log.tx && (
                  <p className="text-xs text-purple-400 mt-2 break-all">
                    TX: {log.tx}
                  </p>
                )}

                <p className="text-xs text-gray-500 mt-3">
                  {formatTime(log.time)}
                </p>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Helpers ---------- */

function formatTime(time){
  try{
    return new Date(time).toLocaleString();
  }catch{
    return time;
  }
}

function getColor(type){
  switch(type){
    case "wallet": return "bg-blue-500";
    case "upload": return "bg-yellow-500";
    case "blockchain": return "bg-green-500";
    case "verify": return "bg-purple-500";
    default: return "bg-gray-500";
  }
}

function getIcon(type){
  switch(type){
    case "wallet": return "🔑";
    case "upload": return "📁";
    case "blockchain": return "⛓";
    case "verify": return "✔";
    default: return "•";
  }
}
