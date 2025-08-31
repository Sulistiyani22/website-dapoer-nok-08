import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logout berhasil" });
  res.cookies.set("token_dapoernok08", "", { maxAge: 0, path: "/" });
  return res;
}
