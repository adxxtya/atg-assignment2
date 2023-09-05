import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log("selected id", id);

  const res = await fetch(
    `https://602e7c2c4410730017c50b9d.mockapi.io/users?id=${id}`
  );
  const data = await res.json();

  return NextResponse.json({ data });
}
