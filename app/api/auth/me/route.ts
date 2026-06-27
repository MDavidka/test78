import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const sessionCookie = cookies().get("nivle_session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("nivlehost");

    // Retrieve user by ObjectId
    const user = await db.collection("users").findOne({ _id: new ObjectId(sessionCookie) });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
      },
      success: true,
    });
  } catch (error: any) {
    console.error("Session fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
