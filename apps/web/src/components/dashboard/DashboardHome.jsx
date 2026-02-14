import Link from "next/link";

export default function DashboardHome() {
  return (
    <div>

      <h1 className="text-3xl font-semibold text-cyan-400 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Register */}
        <Link href="/dashboard/register">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-cyan-400 transition cursor-pointer">
            <h2 className="text-xl text-cyan-400 mb-2">Register New IP</h2>
            <p className="text-gray-400">
              Upload your file and permanently store ownership proof on blockchain.
            </p>
          </div>
        </Link>

        {/* My Assets */}
        <Link href="/dashboard/assets">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-cyan-400 transition cursor-pointer">
            <h2 className="text-xl text-cyan-400 mb-2">My Registered Assets</h2>
            <p className="text-gray-400">
              View your registered intellectual properties and transaction records.
            </p>
          </div>
        </Link>

        {/* Verify */}
        <Link href="/dashboard/verify">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-cyan-400 transition cursor-pointer">
            <h2 className="text-xl text-cyan-400 mb-2">Verify Ownership</h2>
            <p className="text-gray-400">
              Check who owns a file by comparing its cryptographic fingerprint.
            </p>
          </div>
        </Link>

      </div>

    </div>
  );
}
