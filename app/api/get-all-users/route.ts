import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://602e7c2c4410730017c50b9d.mockapi.io/users");
  const data = await res.json();

  return NextResponse.json({ data });
}
