import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {

  const { hash } = await req.json();

  const existing = await db.userAsset.findFirst({
    where: { fileHash: hash }
  });

  if (existing) {
    return NextResponse.json({
      exists: true,
      owner: existing.wallet,
      date: existing.createdAt
    });
  }

  return NextResponse.json({ exists: false });
}