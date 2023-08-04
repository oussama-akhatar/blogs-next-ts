import { NextResponse } from "next/server";

export const GET = async (request: any) => {
  try {
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "no-store",
    });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse("Error", { status: 500 });
  }
};
