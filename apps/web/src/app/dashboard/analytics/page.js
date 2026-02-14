"use client";

import { useEffect, useState } from "react";
import { getAssets, getActivity } from "@/lib/storage";

export default function AnalyticsPage() {

  const [assets, setAssets] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const assetsData = await getAssets();
        const activityData = await getActivity();

        setAssets(assetsData || []);
        setActivity(activityData || []);
      } catch (err) {
        console.error("Analytics load failed:", err);
        setAssets([]);
        setActivity([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /* ---------- Derived Metrics ---------- */

  const lastUpload =
    assets.length > 0
      ? new Date(assets[assets.length - 1].createdAt).toLocaleString()
      : "No uploads";

  const uploads = activity.filter(a => a.type === "upload").length;
  const verifications = activity.filter(a => a.type === "verify").length;
  const blockchainTx = activity.filter(a => a.type === "blockchain").length;

  if (loading)
    return <p className="text-gray-400">Loading analytics...</p>;

  return (
    <div>

      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        Registry Analytics
      </h1>

      {/* ---------- Top Stats ---------- */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <StatCard title="Registered Assets" value={assets.length} color="cyan" />
        <StatCard title="Total Activities" value={activity.length} color="purple" />
        <StatCard title="Blockchain Transactions" value={blockchainTx} color="green" />
        <StatCard title="Last Upload" value={lastUpload} small />

      </div>

      {/* ---------- Activity Breakdown ---------- */}
      <div className="bg-[#0b1222] p-6 rounded-xl border border-gray-700 mb-10">
        <h2 className="text-xl text-cyan-400 mb-6">Activity Breakdown</h2>

        <Bar label="Uploads" value={uploads} max={activity.length} color="yellow" />
        <Bar label="Verifications" value={verifications} max={activity.length} color="purple" />
        <Bar label="Blockchain Writes" value={blockchainTx} max={activity.length} color="green" />
      </div>

      {/* ---------- Recent Activity ---------- */}
      <div className="bg-[#0b1222] p-6 rounded-xl border border-gray-700">
        <h2 className="text-xl text-cyan-400 mb-6">Recent Activity</h2>

        {activity.slice(0,5).map((log) => (
          <div key={log.id} className="flex justify-between border-b border-gray-800 py-3">

            <div className="text-gray-200">
              {log.text}
            </div>

            <div className="text-xs text-gray-500">
              {formatTime(log.time)}
            </div>

          </div>
        ))}

        {activity.length === 0 && (
          <p className="text-gray-400">No recent activity.</p>
        )}
      </div>

    </div>
  );
}

/* ---------- Components ---------- */

function StatCard({ title, value, color="cyan", small=false }) {

  const colors = {
    cyan:"text-cyan-400",
    purple:"text-purple-400",
    green:"text-green-400",
  };

  return (
    <div className="bg-[#0b1222] p-6 rounded-xl border border-gray-700">

      <h2 className="text-gray-400 mb-2">{title}</h2>

      <p className={`${small ? "text-sm" : "text-3xl font-bold"} ${colors[color]}`}>
        {value}
      </p>

    </div>
  );
}

function Bar({ label, value, max, color }) {

  const percent = max ? Math.round((value / max) * 100) : 0;


  const colors = {
    yellow:"bg-yellow-500",
    purple:"bg-purple-500",
    green:"bg-green-500",
  };

  return (
    <div className="mb-5">

      <div className="flex justify-between text-sm text-gray-400 mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="w-full bg-gray-800 h-2 rounded">
        <div
          className={`h-2 rounded ${colors[color]}`}
          style={{ width: `${percent}%` }}
        />
      </div>

    </div>
  );
}

function formatTime(time){
  try{
    return new Date(time).toLocaleString();
  }catch{
    return time;
  }
}
