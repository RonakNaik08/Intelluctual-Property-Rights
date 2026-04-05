import { ethers } from "ethers";

export default async function TxPage({params}){

  const provider = new ethers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const tx = await provider.getTransaction(params.hash);
  const receipt = await provider.getTransactionReceipt(params.hash);

  return(

    <div className="p-10">

      <h1 className="text-3xl text-cyan-400">
        Transaction Explorer
      </h1>

      <div className="bg-gray-900 p-6 mt-6 rounded">

        <p>Hash: {tx.hash}</p>
        <p>From: {tx.from}</p>
        <p>To: {tx.to}</p>
        <p>Block: {receipt.blockNumber}</p>
        <p>Gas Used: {receipt.gasUsed.toString()}</p>

      </div>

    </div>

  );
}