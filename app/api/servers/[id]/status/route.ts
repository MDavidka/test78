import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionCookie = cookies().get("nivle_session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await request.json();
    const serverId = params.id;

    if (!status) {
      return NextResponse.json({ error: "Status is required." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("nivlehost");

    // Update the server status in MongoDB, ensuring it belongs to this user
    const result = await db.collection("servers").updateOne(
      { _id: new ObjectId(serverId), userId: sessionCookie },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Server not found or unauthorized." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Status updated to ${status}` });
  } catch (error: any) {
    console.error("Update server status error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
