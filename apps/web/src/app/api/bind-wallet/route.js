import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req){

  const {userId} = auth();
  const {wallet} = await req.json();

  const existing = await db.userWallet.findFirst({
    where:{userId}
  });

  if(existing){
    return NextResponse.json(existing);
  }

  const record = await db.userWallet.create({
    data:{userId,wallet}
  });

  return NextResponse.json(record);
}