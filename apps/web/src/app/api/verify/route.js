import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req){

  const { hash } = await req.json();

  const asset = await db.userAsset.findFirst({
    where:{ fileHash:hash }
  });

  if(!asset){
    return NextResponse.json({exists:false});
  }

  return NextResponse.json({
    exists:true,
    wallet:asset.wallet,
    date:asset.createdAt,
    tx:asset.contractTx
  });
}