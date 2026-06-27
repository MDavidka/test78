import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const sessionCookie = cookies().get("nivle_session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("nivlehost");

    // Fetch servers bound to this userId
    const servers = await db
      .collection("servers")
      .find({ userId: sessionCookie })
      .sort({ createdAt: -1 })
      .toArray();

    // Map _id to id for client convenience
    const formattedServers = servers.map((srv) => ({
      id: srv._id.toString(),
      name: srv.name,
      gameId: srv.gameId,
      gameName: srv.gameName,
      ram: srv.ram,
      slots: srv.slots,
      location: srv.location,
      ip: srv.ip,
      status: srv.status,
    }));

    return NextResponse.json({ servers: formattedServers, success: true });
  } catch (error: any) {
    console.error("Fetch servers error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sessionCookie = cookies().get("nivle_session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, gameId, gameName, ram, slots, location } = await request.json();

    if (!name || !gameId || !gameName || !location) {
      return NextResponse.json({ error: "Missing required server details." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("nivlehost");

    // Create a new server node entry
    const newServer = {
      userId: sessionCookie,
      name,
      gameId,
      gameName,
      ram: ram || "4 GB LPDDR5",
      slots: slots || 100,
      location,
      ip: `${location.ip}:${Math.floor(Math.random() * 9000) + 25565}`,
      status: "offline",
      createdAt: new Date(),
    };

    const result = await db.collection("servers").insertOne(newServer);

    return NextResponse.json({
      server: {
        id: result.insertedId.toString(),
        ...newServer,
      },
      success: true,
    });
  } catch (error: any) {
    console.error("Create server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
