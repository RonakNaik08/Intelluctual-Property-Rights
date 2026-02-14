import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req){

  const { userId } = auth();

  const body = await req.json();

  const record = await db.userAsset.create({
    data:{
      userId,
      wallet: body.wallet,
      fileName: body.fileName,
      fileHash: body.hash,
      ipfsCID: body.cid,
      contractTx: body.tx
    }
  });

  return NextResponse.json(record);
}
